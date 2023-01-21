import { gql } from "@apollo/client";

export const ADD_STAR_MUTATION = gql`
   mutation AddStarMutation($input: AddStarInput!) {
    addStar (input: $input) {
      clientMutationId
      starrable {
        stargazerCount
      }
    } 
   }
   
`;