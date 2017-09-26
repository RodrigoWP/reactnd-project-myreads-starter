import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Bookshelve from './bookshelve'
import { Loading } from './../../../components'

const shelf = [
  {
    title: 'Currently reading',
    key: 'currentlyReading'
  },
  {
    title: 'Want to read',
    key: 'wantToRead'
  },
  {
    title: 'Read',
    key: 'read'
  }
]

const ListBooks = ({ isFetching, books, updateShelfBook }) => (
  <div className="list-books">
    <Loading show={isFetching} />

    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      {shelf.map(item => (
        <Bookshelve
          key={item.key}
          title={item.title}
          books={books.filter(book => book.shelf === item.key)}
          updateShelfBook={updateShelfBook}
        />
      ))}
    </div>
    <div className="open-search">
      <Link to="/pesquisa">Add a book</Link>
    </div>
  </div>
)

ListBooks.propTypes = {
  books: PropTypes.array.isRequired
}

export default ListBooks
