import React from 'react'
import PropTypes from 'prop-types'

import { Book } from '../../../components'

const Bookshelve = ({ title, books, updateShelfBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book, index) => (
          <li key={index}>
            <Book book={book} updateShelfBook={updateShelfBook}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
)

Bookshelve.propTypes = {
  title: PropTypes.string.isRequired,
  updateShelfBook: PropTypes.func.isRequired,
  books: PropTypes.array
}

export default Bookshelve
