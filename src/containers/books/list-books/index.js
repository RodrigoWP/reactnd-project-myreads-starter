import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Bookshelve from './bookshelve'
import { Loading } from './../../../components'

const ListBooks = ({ isFetching, currentlyReading, wantToRead, read, handleMoveBook }) => (
  <div className="list-books">
    <Loading show={isFetching} />

    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <Bookshelve title="Currently reading" books={currentlyReading} handleMoveBook={handleMoveBook} />
        <Bookshelve title="Want to read" books={wantToRead} handleMoveBook={handleMoveBook} />
        <Bookshelve title="Read" books={read} handleMoveBook={handleMoveBook} />
      </div>
    </div>
    <div className="open-search">
      <Link to="/pesquisa">Add a book</Link>
    </div>
  </div>
)

ListBooks.propTypes = {
  currentlyReading : PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired
}

export default ListBooks
