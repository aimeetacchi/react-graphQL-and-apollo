import { gql } from "@apollo/client";
  /**
 * Mutation to create a new repo in github
 */
export const UPDATE_STATUS = gql`
   mutation ChangeUserStatusInput(
     $message: String!
     $clientMutationId: String!
     $emoji: String!
   ) {
    changeUserStatus (input: { message: $message, clientMutationId: $clientMutationId, emoji: $emoji }) {
        status {
          createdAt
          id
          message
          emoji
        }
      }
   }
   
`