import React  from 'react'
import Book from './Book'
import PropTypes from'prop-types'




function BookList (props)
{



    
        const {books} = props
        const category = books.filter(book=>(book.shelf===props.filter))
        return(
           
                <ol className="books-grid">
                    {category.map(book=>(
                        <li key={book.id}><Book book={book} changeShelf={props.changeShelf}/></li>
                        
                    ))}
                </ol>
          
        )


    
}

BookList.propTypes={
    books:PropTypes.array ,
    filter:PropTypes.string,
    changeShelf:PropTypes.func

}
export default BookList