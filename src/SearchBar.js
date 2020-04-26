import * as BooksAPI from  './BooksAPI'

import React, { Component } from 'react'
import Book  from  './Book'
export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state={
      query:'android',
      books:[],
      load:true
    }
  }
  handleSearch=(e)=>{
      BooksAPI.search(this.state.query).then((books)=>{
        this.setState({
          books:[...books]
        },()=>{ this.setState({load:false}) })
      }).catch((err)=>{ console.log(err);  })
    }
  render() {
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={e=>this.props.setShow()}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input value={this.state.query} type="text" placeholder="Search by title or author" onChange={e=>this.setState({query:e.target.value})} />
        </div>
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {(!this.state.load)?this.state.books.map((book)=>(<Book book={book} key={book.id} handleMove={this.props.handleMove}/>) ) :null }
        </ol>
      </div>
   </div>
    )
  }
}



// export const SearchBar =({setShow})=>{

//   return (
//     <div className="search-books">
//       <div className="search-books-bar">
//         <button className="close-search" onClick={e=>setShow()}>
//           Close
//         </button>
//         <div className="search-books-input-wrapper">
//           <input ref={(node) => (query = node)} type="text" placeholder="Search by title or author" />
//         </div>
//         <button className="search-button" onClick={(e) => _handleSearch(e)}>
//           Search
//         </button>
//       </div>
//       <div className="search-books-results">
//         <ol className="books-grid" />
//       </div>
//     </div>
//   );
// }