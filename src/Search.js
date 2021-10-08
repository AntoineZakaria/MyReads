import React ,{Component} from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from'prop-types'
import { search } from './BooksAPI'



class Search extends Component
{
  static propTypes={
    books:PropTypes.array ,
    changeShelf:PropTypes.func
  }
    state= {
        query:'',
        filteredBooks:[]
    }

    updateQuery = (value) => {
      this.setState(()=>({query:value.trim()}))

      if(value==='')
      {
        const filteredBooks=[];
        this.setState(()=>({filteredBooks}))

      }
      
      else
      {
     
      search(value).then ((filteredBooksAPI)=>{
        if(filteredBooksAPI.length)
        {
          const filteredBooks=filteredBooksAPI.map(book=>{
            book.shelf= this.adjust(book)
            return book

            
          })

      
          this.setState(()=>({filteredBooks}))
         

      
        }
        else
        {
          const filteredBooks=[];
          this.setState(()=>({filteredBooks}))

        }
    })
  }
  }

  adjust =(book)=>{

   const myBook = this.props.books.filter(mybook=>book.id===mybook.id)

   if(myBook.length)
   {
     return myBook[0].shelf

   }
   else
   return 'none'

    
  }
  


    render(){
      const {query}=this.state ;
      const {filteredBooks} = this.state ;
      
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text"
                placeholder="Search by title or author"
                onChange={(event)=>(this.updateQuery(event.target.value))}/>

              </div>
            </div>
           
            <div className="search-books-results">
            <ol className="books-grid">
                    {filteredBooks.map(book=>(
                        <li key={book.id}><Book book={book}  changeShelf={this.props.changeShelf}/></li>
                        
                    ))}
                </ol>
            </div>
          
          </div>
            
        )
    }
    


}


export default Search