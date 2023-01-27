import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { MyProfile } from "../../gitHubQuery";
import { CREATE_NEW_REPO } from "../../createRepoMutation";
import { ADD_STAR_MUTATION } from "../../addStarMutation";

// const newRepodata = {
//   name: "MyNewRepoUsingGitHubGraphQL",
//   description: "just a repo created with github graphQL",
//   ownerId: process.env.REACT_APP_GITHUB_OWNER_ID,
//   visibility: "PRIVATE",
// };

// const newStatusData = {
//   clientMutationId: process.env.REACT_APP_GITHUB_OWNER_ID,
//   emoji: ":rocket:",
//   message: "this is from my react app",
// };

const useMyProfileQuery = (username, limit) => {
  return useQuery(MyProfile, {
    variables: { login: username, repositoriesLimit: limit },
  });
};

const Home = () => {
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");

  const { loading, error, data } = useMyProfileQuery("aimeetacchi", 40);

  // MUTATION to Create a new Repo ---
  const [createAwesomeRepo] = useMutation(CREATE_NEW_REPO);
  // MUTATION TO UPDATE GITHUB STATUS ---
  // const [updateGitHubStatus] = useMutation(UPDATE_STATUS, {
  //   variables: newStatusData,
  //   // onCompleted: (data) => {
  //   //   console.log(data);
  //   // },
  // });

  const [starRepo] = useMutation(ADD_STAR_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error, something went wrong...</p>;

  const handleCreateRepo = async (e) => {
    
    e.preventDefault()
    const response = await createAwesomeRepo({
      variables: { input: { 
        name: repoName,
        description: repoDescription,
        ownerId: process.env.REACT_APP_GITHUB_OWNER_ID,
        visibility: "PRIVATE",
      } },
      refetchQueries: { include: [MyProfile] },
    });

    // // clear form
    setRepoName("");
    setRepoDescription("");
    console.log("response", response);
  };

  const handleStarRepo = async (repoId) => {
    try {
      const response = await starRepo({
        variables: {
          input: {
            starrableId: repoId,
          },
        },
      });

      console.log("star repo response", response);
    } catch (error) {
      console.log("star repo error", error);
    }
  };

  const { edges } = data.user.pinnedItems;
  console.log("data", data);
  return (
    <div className="home container">
      <div style={{ textAlign: "center" }}>
        <h1>GitHub GraphQL API and Apollo Client</h1>
        <p>
          Using React, GitHub GraphQL APi and Apollo Client - Mutations and
          queries to get and post data to my Github.
        </p>
        
        <div className="githubCreateRepoContainer">
        <form onSubmit={handleCreateRepo}>

            <div className="formgroup">
              <label htmlFor="reponame">Create a new repo</label>
              <input
                id="reponame"
                type="text"
                required
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
            </div>

            <div className="formgroup">
              <label htmlFor="repodescription">Add a description for your new repo</label>
              <input
                id="repodescription"
                type="text"
                required
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
                />
            </div>

            <button
              type="submit"
              style={{
                margin: 20,
                padding: 20,
                backgroundColor: "navy",
                color: "white",
              }}
              
            >
              Create new repo
            </button>
          </form>
        </div>

        {/* <div className="updateStatusContainer">
          <button
              style={{
                margin: 20,
                padding: 20,
                backgroundColor: "navy",
                color: "white",
              }}
              onClick={updateGitHubStatus}
            >
              Update GitHub Status
            </button>
        </div> */}
      </div>
            
      <div style={{ textAlign: "center" }}>
        <h2>GitHub User</h2>
        <img
          style={{ maxWidth: 150 }}
          src={data.user.avatarUrl}
          alt="github avatar"
        />
        <p>
          {data.user.name} - {data.user.url}
        </p>
        <p>
          {data.user.bio} - {data.user.location}
        </p>
        <a href={data.user.websiteUrl} rel="noreferrer" target="_blank">
          {data.user.websiteUrl}
        </a>

        <h2>Pinned GitHub Repos</h2>
        <div className="row pinned">
          {edges.map((item, i) => (
            <div key={i}>
              {item.node.name && <h3>{item.node.name}</h3>}
              {item.node.description && <p>{item.node.description}</p>}
              <a rel="noreferrer" target="_blank" href={item.node.url}>
                Link to Repo
              </a>
            </div>
          ))}
        </div>

        <h2>GitHub Repos</h2>
        <div className="row repos">
          {data.user.repositories.edges.map((item, i) => (
            <div key={i}>
              {item.node.name && (
                <h3>
                  {item.node.name}{" "}
                  <span onClick={() => handleStarRepo(item.node.id)}>⭐</span>
                </h3>
              )}
              {item.node.description && <p>{item.node.description}</p>}
              <a rel="noreferrer" target="_blank" href={item.node.url}>
                Link to Repo
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
