import { gql } from "@apollo/client";

export const github = gql`
{
  user(login: "aimeetacchi") {
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
      first: 20
      orderBy: {field: UPDATED_AT, direction: DESC}
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
    following(first: 20) {
      nodes {
        login
        name
      }
    }
  }
}
`