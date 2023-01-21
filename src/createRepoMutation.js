import { gql } from "@apollo/client";
/**
 * Mutation to create a new repo in github
 */
export const CREATE_NEW_REPO = gql`
  mutation CreateRepository($input: CreateRepositoryInput!) {
    createRepository(input: $input) {
      repository {
        name
        createdAt
      }
    }
  }
`;