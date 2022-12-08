import { gql } from "@apollo/client";

export const GET_GLOSSARY_TERM = gql`
query getGlossaryTerm ($term: String!, $locale: Locale) {
  GetGlossaryTerm(term: $term, locale: $locale) {
    definition
    category
    term
    providerId
  }
}
`;