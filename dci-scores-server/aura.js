const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

// (You may need to replace your connection details, username and password)
const AURA_ENDPOINT = "neo4j+s://a255b80c.databases.neo4j.io";
const USERNAME = "neo4j";
const PASSWORD = "8E8PkaNNnDsUNI7UUNDLc4FHuSjZqnzm67_N3TVHBYQ";

// Create Neo4j driver instance
const driver = neo4j.driver(
  AURA_ENDPOINT,
  neo4j.auth.basic(USERNAME, PASSWORD)
);

const typeDefs = gql`
  type Person {
    name: String
    knows: [Person!]! @relationship(type: "KNOWS", direction: OUT)
    friendCount: Int
      @cypher(statement: "RETURN SIZE((this)-[:KNOWS]->(:Person))")
  }
`;

// Create instance that contains executable GraphQL schema from GraphQL type definitions
const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver,
});

// Generate GraphQL schema
neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
    schema,
    context: { driverConfig: { database: "neo4j" } },
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  });
});
