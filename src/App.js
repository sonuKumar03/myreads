import React from "react";
import BookSelf from "./BookSelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBar from "./SearchBar";
class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    query:"",
    load:true
  };
  setView = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(
          {
            ...this.state,
            books: [...books],
          },()=>{ this.setState({load:false}) }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.setView();
  }
  componentWillMount() {
  }
  handleMove = (e, id) => {
    const {value } = e.target;
    console.log(value,id)
    BooksAPI.update({ id }, value)
      .then((book) => {
        this.setView();
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  render() {
    const load = this.state.load;
    let wantToRead,currentlyReading,read;
    if(!load){
    const books = this.state.books;
     wantToRead = books.filter(({ shelf }) => shelf.localeCompare("wantToRead") === 0);
     currentlyReading = books.filter(({ shelf }) => shelf.localeCompare("currentlyReading") === 0);
     read = books.filter(({ shelf }) => shelf.localeCompare("read") === 0);
    }
    return (
      <div className="app">
        {(this.state.showSearchPage)?<SearchBar handleMove={this.handleMove} setShow={e=>{ this.setState({showSearchPage:false}) }}/>
        :(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {(!load)?
                <div>
                  <BookSelf reading="currently reading" books={currentlyReading} handleMove={this.handleMove} />
                  <BookSelf reading="want to read" books={wantToRead} handleMove={this.handleMove} />
                  <BookSelf reading="read" books={read} handleMove={this.handleMove} />
                </div>:null
              }
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
