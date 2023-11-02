import React  from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selected:null
    }
  }
  displayBooks() {
    const { data } = this.props;
  
    if (data.loading) {
      return <div>Loading books...</div>;
    }
  
    if (!data || !data.books) {
      return <div>No books available.</div>;
    }
  
    return data.books.map((book) => (
      <li key={book.id} onClick={() => this.setState({ selected: book.id })}>
        {book.name}
      </li>
    ));
  }
  
  render(){
    return (
      <div>
        <ul id="book-list">  {this.displayBooks()}</ul>
         <BookDetails bookid={this.state.selected}></BookDetails>
      </div>
    )
  }
}
export default graphql (getBookQuery)(BookList);