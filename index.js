const { ApolloServer, gql } = require("apollo-server");

const port = process.env.PORT || 8009;

const books = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    ISBN: "035-4237",
  },
  {
    title: "50 Shades Freed",
    author: "E.L. James",
    ISBN: "074-45237",
  },

  {
    title: "Champagne Poetry",
    author: "Fred Johnson",
    ISBN: "045-7864",
  },

  {
    title: "Girls want girls",
    author: "E.C> Drake",
    ISBN: "667-5667",
  },

  {
    title: "You Only Live Twice",
    author: "Z.N. James",
    ISBN: "074-45237",
  },
];

//Creating a Schema

const schemas = gql`
  type Book {
    title: String!
    author: String!
    ISBN: String
  }

  type Query {
    books: [Book]
    book(title: String!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!, ISBN: String): Book
  }
`;

//Creating the Resolvers
const booksResolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find((book) => book.title === args.title),
  },

  Mutation: {
    createBook: (parent, args) => {
      const { title, author, ISBN } = args;
      const book = { title, author, ISBN };
      books.push(book);
      return book;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers: booksResolvers,
  playground: true,
  introspection: true,
});

server
  .listen(port)
  .then(({ url }) => {
    console.log(`Server ready at ${url} and ready to be used`);
  })
  .catch((err) => console.log(err));
