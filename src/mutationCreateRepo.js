import { gql } from "@apollo/client";
  /**
 * Mutation to create a new repo in github
 */
export const CREATE_NEW_REPO = gql`
   mutation CreateRepositoryInput(
     $name: String!
     $ownerId: String!
     $description: String!
     $visibility: String!
   ) {
       createRepository (input: {
       name: $name
       ownerId: $ownerId
       description: $description
       visibility: $visibility
     }) {
           repository {
               name
               createdAt
           }

       }
   }
   
`