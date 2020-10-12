const express = require('express')
const {ApolloServer,gql} = require('apollo-server-express')
const cors = require('cors')
const dotenv = require('dotenv')
const uuid = require('uuid')
dotenv.config()

const PORT = process.env.PORT || 3000

const { tasks ,users} = require('./constants')
const resolvers= require('./resolvers')
// setup env variables


const app = express()

// body parser middleware
app.use(express.json())
app.use(cors())

const typeDefs = gql`
    type Query {
        greetings : [String!]
        tasks : [Task!]
        task(id : ID!) : Task
        users : [User!]
        user(id  : ID!) : User
    }

    input createTaskInput{
        name : String !
        completed : Boolean!
        userId : ID!
    }

    type Mutation {
        createTask(input : createTaskInput) : Task
    }

    type User {
        id : ID!
        name : String!
        email : String!
        tasks : [Task!]
    }

    type Task {
        id : ID!
        name : String!
        completed : Boolean!
        user : User!
    }
`;


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})
apolloServer.applyMiddleware({app,path : '/graphql'})

app.use('/',(req,res,next)=>{
    res.send({message : 'Hello'})

})


app.listen(PORT, ()=>{
    console.log(`Server listening on PORT : ${PORT}`)
    console.log(`Graphql endpoint ${apolloServer.graphqlPath}`)
})