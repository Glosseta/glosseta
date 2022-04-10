import { gql } from "@apollo/client";
import { termRequest } from "../../../types/term-request";
import { githubApolloClient } from '../apollo/apollo-client';

const fetchRepoInfo = async () => {
    const FIND_REPO_ID = gql`
        query findRepoID {
        repository(owner: "narbs91", name: "glosseta"){
            id
        }
        }
    `;

    try {
        const { data } = await githubApolloClient.query({
            query: FIND_REPO_ID,
        });

        return {
            props: {
                response: data.repository.id
            }
        };
    } catch (error) {
        console.log(`[Error communicating with github graphql api for fetching repo info] error=${error}`);

        return {
            props: {
                response: "error"
            }
        }
    }
}

const createIssue = async (repoId: string, title: string, body: string, issueTemplate: string) => {
    try {
        const CREATE_DEFINITION_INTAKE_ISSUE = gql`
            mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String, $issueTemplate: String) {
            createIssue(input: {repositoryId: $repositoryId, title: $title, body: $body, issueTemplate: $issueTemplate}) {
                issue {
                    number
                }
            }
            }
        `;

        const { data } = await githubApolloClient.mutate({
            mutation: CREATE_DEFINITION_INTAKE_ISSUE,
            variables: {
                "repositoryId": repoId,
                "title": title,
                "body": body,
                "issueTemplate": issueTemplate
            }
        });

        return {
            props: {
                response: data.createIssue.issue.number
            }
        };
    } catch (error) {
        console.log(`[Error communicating with github graphql api for creating issue] error=${error}`);

        return {
            props: {
                response: "error"
            }
        }
    }
}

export const createDefinitionIntakeIssue = async (request: termRequest) => {
    const title = `[Definition Request]: ${request.term}`;
    const body = `<h2>Context</h2><div><p>${request.context}}</p></div><h2>Term</h2><div><p>${request.term}</p></div><h2>Definition</h2><div><p>${request.definition}</p></div><h2>Category</h2><div><p>${request.category}</p></div>`;

    const repoId = await fetchRepoInfo() as any;
    const { response } = repoId.props

    const data = await createIssue(response, title, body, "Definition intake request");

    return data.props.response;
}