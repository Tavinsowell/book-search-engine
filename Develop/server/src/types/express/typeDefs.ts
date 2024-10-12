const typeDefs =`
type Profile {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    }
type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    }
type Auth {
    token: ID!
    profile: Profile
    }
type Query {
    profile: Profile
    book(bookId: ID!): Book
    }
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String], description: String, title: String, image: String, link: String): Profile
    deleteBook(bookId: ID!): Profile
    }

    `;
export default typeDefs;
