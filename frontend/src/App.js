
import Booklist from './Component/BookList';
import AddBook from './Component/AddBook';
import ApolloClient from 'apollo-boost';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import BookDetails from './Component/BookDetails';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends React.Component {
render(){
  return (
<ApolloProvider client={client}>
  <div className='main'>
    <Booklist/>
    <AddBook></AddBook>
    <BookDetails></BookDetails>
  </div>

  </ApolloProvider>
  )
}
}

export default App;
