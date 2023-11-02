import React from 'react';
import { getAuthorQuery,addBookMutation,getBookQuery } from '../queries/queries';
import { graphql} from 'react-apollo';
import {compose} from 'recompose'
import './Hi.css';

class AddBook extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            genre:'',
            authorID:''
        };
    }
    displayAuthors() {
        const { getAuthorQuery } = this.props;
        const data = getAuthorQuery;
      
        if (data && data.loading) {
          return <option disabled>Loading author</option>;
        } else {
          const authors = data && data.authors ? data.authors : [];
          return authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ));
        }
      }
      
      submitForm(e) {
        e.preventDefault();
        this.props
          .addBookMutation({
            variables: {
              name: this.state.name,
              genre: this.state.genre,
              authorid: this.state.authorID,
            },
          })
          .then((response) => {
            // Handle success if needed
            console.log(response);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      }
      
    render(){
      return (
       <form id='add-book' onSubmit={this.submitForm.bind(this)} className='hi'>
        <div className='field'>
            <label>Book name:</label>
            <input type='text' onChange={(e)=>{
                this.setState({name:e.target.value})
            }}></input>
        </div>

        <div className='field'>
        <label>Genre:</label>
        <input type='text' onChange={(e)=>{
                this.setState({genre:e.target.value})
            }} placeholder='insert'></input>
        </div>
        <div className='field'>
        <label>Author:</label>
        <input type='text' onChange={(e)=>{
                this.setState({authorID:e.target.value})
            }}></input>
            <select>
                <option>select author</option>
             {this.displayAuthors()}   
            </select>
        </div>
        <button>+</button>
       </form>
      )
    }
  }
export default compose(
    graphql(getAuthorQuery,{name:"getAuthorQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook)