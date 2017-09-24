import React from 'react'
import PropTypes from 'prop-types'

import Book from './book'

const Bookshelve = ({ title, books, handleMoveBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book, index) => (
          <li key={index}>
            <Book book={book} handleUpdate={handleMoveBook}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
)

Bookshelve.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array
}

export default Bookshelve
