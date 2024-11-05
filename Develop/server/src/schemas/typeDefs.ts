const typeDefs =`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    }
type Book {
    authors: [String]
    description: String
    bookId: String
    title: String
    image: String
    link: String
    }
input BookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    }

type Auth {
    token: ID!
    user: User
    }
    
type Query {
    user: User
    book(bookId: ID!): Book
    me: User
    
    }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
    }

    `;
export default typeDefs;



// const typeDefs =`
// type User {
//     _id: ID
//     username: String
//     email: String
//     bookCount: Int
//     savedBooks: [Book]
//     }
// type Book {
//     bookId: ID
//     authors: [String]
//     description: String
//     title: String
//     image: String
//     link: String
//     }
//   input UserInput {
//     username: String!
//     email: String!
//     password: String!
//   }

// type Auth {
//     token: ID!
//     profile: Profile
//     }
// type Query {
//     profile: Profile
//     book(bookId: ID!): Book
//     }
// type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(input: UserInput!): Auth
//     saveBook(bookId: ID!, authors: [String], description: String, title: String, image: String, link: String): Profile
//     deleteBook(bookId: ID!): Profile
//     }

//     `;
// export default typeDefs;
