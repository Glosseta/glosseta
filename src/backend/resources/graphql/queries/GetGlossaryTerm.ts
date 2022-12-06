import { gql } from "@apollo/client";

export const GET_GLOSSARY_TERM = gql`
query getGlossaryTerm ($name: String!) {
  GetGlossaryTerm(name: $name) {
    definition
    category
    name
  }
}
`;