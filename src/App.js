import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'





class BooksApp extends React.Component {
  state = {
  
    
    books:[],
  
  }



  componentDidMount()
  {
    BooksAPI.getAll()
    .then ((books)=>{
      this.setState(()=>({books}))
     /*
     console.log(books)
      const filteredBooks = books.filter(book=>(book.title.toLowerCase().includes('r')))
      console.log(filteredBooks)
   */

    
    })
  }
  changeShelf = (e, book) => {
    const books = this.state.books;
    const shelf = e.target.value;
    book.shelf = e.target.value;
    this.setState({
      books
    });

    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        books: state.books
          .filter(b => b.id !== book.id)
          .concat([book])
      }));
    });
  };

  

  render() {
    return (
      
      <div className="app">

        <Route path = '/search' render ={()=>(
          <Search books={this.state.books} changeShelf={this.changeShelf}/>
        )}/>
      
        
          <Route exact path  ='/' render={()=>(

          
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                  <BookList books={this.state.books} filter={"currentlyReading"} changeShelf={this.changeShelf}/>

                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">


                  <BookList books={this.state.books} filter={"wantToRead"}changeShelf={this.changeShelf}/>

                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">


                  <BookList books={this.state.books} filter={"read"}changeShelf={this.changeShelf}/>

                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
              to='/search'>Add a book</Link>
            </div>
          </div>
          )} />
        
      </div>
    )
  }
}

export default BooksApp
