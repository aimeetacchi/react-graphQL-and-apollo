import React from 'react'

import { useMutation, useQuery } from "@apollo/client";
import { github } from '../../queryGitHub';
import { CREATE_NEW_REPO } from '../../mutationCreateRepo'
import { UPDATE_STATUS } from '../../mutationUpdateStatus';

const newRepodata = {
  name: 'MyNewRepoUsingGitHubGraphQL',
  description: 'just a repo created with github graphQL',
  ownerId: process.env.REACT_APP_GITHUB_OWNER_ID,
  visibility: 'PRIVATE'
}

const newStatusData = {
  clientMutationId: process.env.REACT_APP_GITHUB_OWNER_ID,
  emoji: ':rocket:',
  message: 'this is from my react app'
}

const Home = () => {
  const { loading, error, data} = useQuery(github);
  // MUTATION to Create a new Repo ---
  const [createRepo, /*{loading, error, data}*/ ] = useMutation(CREATE_NEW_REPO, {
    variables: newRepodata,
    onCompleted: (data) => {
      console.log(data)
    }
  });
  // MUTATION TO UPDATE GITHUB STATUS --- 
  const [updateGitHubStatus /*{loading, error, data}}*/ ] = useMutation(UPDATE_STATUS, {
    variables: newStatusData,
    onCompleted: (data) => {
      console.log(data)
    }
  })

  if(loading) return <p>Loading...</p>
  if( error) return <p>Error, something went wrong...</p>

  console.log('Data', data)
  const { edges } = data.user.pinnedItems



  return (
    <div className="home container">
        <h1>GitHub GraphQL API and Apollo Client</h1>

        <div style={{textAlign: 'center'}}>
          <h2>Pinned GitHub Repos</h2>
          <div className="row pinned">
          {edges.map((item, i) => (
            <div key={i}>
              {item.node.name && (<h3>{item.node.name}</h3>)}
              {item.node.description && (<p>{item.node.description}</p>)}
              <a rel="noreferrer" target="_blank" href={item.node.url}>Link to Repo</a>
            </div>
          ))}
          </div>

          <button style={{margin: 20, padding: 20, backgroundColor: 'navy', color: 'white'}} onClick={createRepo}>Create new repo</button>
          <button style={{margin: 20, padding: 20, backgroundColor: 'navy', color: 'white'}}  onClick={updateGitHubStatus}>Update GitHub Status</button>
        </div>
    </div>
  )
}

export default Home
