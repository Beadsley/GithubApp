import { gql } from '@apollo/client';

export const LANGUAGES = gql`
  query findLanguagesByUsername($username: String!) {
    languageStatistics(username: $username) {
      name
      projects
      languages {
        mostused {
          name
          sum
          fraction
          label
        }
        additional {
          name
          sum
          fraction
          label
        }
        total
      }
    }
  }
`;
