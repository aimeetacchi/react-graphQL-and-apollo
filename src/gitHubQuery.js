import { gql } from "@apollo/client";

export const MyProfile = gql`
  query MyProfileQuery($login: String!, $repositoriesLimit: Int!) {
    user(login: $login) {
      avatarUrl
      bio
      createdAt
      email
      location
      login
      name
      twitterUsername
      websiteUrl
      url
      repositories(
        first: $repositoriesLimit
        orderBy: { field: UPDATED_AT, direction: DESC }
        privacy: PUBLIC
      ) {
        edges {
          node {
            description
            id
            name
            updatedAt
            url
            createdAt
          }
        }
      }
      pinnedItems(first: 6) {
        edges {
          node {
            ... on Repository {
              id
              description
              url
              name
            }
          }
        }
      }
    }
  }
`;