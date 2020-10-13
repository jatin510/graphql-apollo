const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const uuid = require("uuid");
dotenv.config();
const { connection } = require("./database/util/index.js");
const PORT = process.env.PORT || 3000;

const { tasks, users } = require("./constants");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
// setup env variables

const app = express();

// db connectivity
connection();

// body parser middleware
app.use(express.json());
app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

app.use("/", (req, res, next) => {
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT : ${PORT}`);
  console.log(`Graphql endpoint ${apolloServer.graphqlPath}`);
});
