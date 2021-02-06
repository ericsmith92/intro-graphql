const { ApolloServer, gql } = require('apollo-server');

//define our types + fields on those types
//we have a Query type with a field of hello

/*
relationship between our typeDefs and CRUD
-in type 'Query' we put everything that's queriable or that you want to read 'R'
-in type 'Mutation' we are refering to Creating 'C', Updating 'U', Delete 'D'
*/
const typeDefs = gql`
    type Query{
        hello: String!
    }

    type User{
        id: ID!
        username: String!

    }

    type Error {
        field: String!
        message: String!
    }

    type RegisterResponse{
        errors: [Error]
        user: User
    }

    type Mutation{
        register(username: String!, password: String!, age: Int): RegisterResponse!
    }
`;

//provide functions (resolvers) for each FIELD on each TYPE
//on Query type, we have a function called hello, refering to field, returning hello world
const resolvers = {
    Query:{
        hello: () => 'Hello World'
    },
    Mutation:{
        register: () => ({
            errors: [
                {
                    field: 'username',
                    message: 'bad'
                },
                {
                    field: 'username2',
                    message: 'also bad'
                }
            ],
            user:{
                id: 1,
                username: 'Bob'
            }
        })
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
