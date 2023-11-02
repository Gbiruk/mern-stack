const graphql= require('graphql');
const _=require('lodash');
const Book= require('../model/books');
const Author=require('../model/author');
const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLSchema,GraphQLInt,GraphQLList,GraphQLNonNull}=graphql;
const BookType= new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
               // return _.find(author, parent.authorid);
               return Author.findById(parent.authorid);
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        // Add the 'age' field if it exists in your schema
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorid: parent.id });
            },
        },
    }),
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }, // This should be inside the args property
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorID: { type: new GraphQLNonNull(GraphQLID) }, // Use "authorID" instead of "authorid"
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID,
                });
                return book.save();
            },
        },
    }
});

const RootQuery= new GraphQLObjectType({
    name:'rootquery',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
            //return _.find(books,{id:args.id});
            return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
          //  return _.find(authors,{id:args.id});
          return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args) {
               // return books;
               return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,ags){
               // return authors;
               return Author.find({});
            }
        }
    }
})
module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})