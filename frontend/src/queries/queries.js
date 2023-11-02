import {gql} from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'react-apollo';
const getBooksQuery = gql`
{
  books{
    name
    id
  }
}
`
const getAuthorQuery = gql`
{
  author{
    name
    id
  }
}
`
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorID: $authorid) {
      name
      id
    }
  }
`;


const getBookQuery= gql`
query($id:ID){
    book(id:$id){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}`
export { getBooksQuery, getAuthorQuery, addBookMutation, getBookQuery };