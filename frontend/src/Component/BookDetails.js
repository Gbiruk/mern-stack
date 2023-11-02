// Import necessary modules and components
import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

// Your component definition
class BookDetails extends React.Component {
  render() {
    // Access data provided by graphql HOC through props
    const { book } = this.props.data;

    if (!book) {
      return <div>No book selected...</div>;
    }

    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// Use graphql HOC to bind getBookQuery to the component
export default graphql(getBookQuery, {
  options: (props) => ({
    variables: {
      id: props.bookId, // Assuming you have a prop named bookId
    },
  }),
})(BookDetails);
