import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: String
    username: String
    email: String
    password: String
    name: String
  }

  type Query {
    searchUsers(username: String): [User]
  }

  type Mutation {
    createUsername(username: String): CreateUsernameResponse
    createUser(
      username: String
      email: String
      password: String
      name: String
    ): createUserResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
  type createUserResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
