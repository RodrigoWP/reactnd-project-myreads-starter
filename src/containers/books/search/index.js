import React from 'react'
import { withRouter } from 'react-router-dom'

import Book from '../../../components/book'
import { Loading } from './../../../components'

const Search = ({ history, books = [], isFetching, handleSearch, handleMoveBook }) => (
    <div className="search-books">
      <Loading show={isFetching} />

      <div className="search-books-bar">
            <a className="close-search" onClick={history.goBack}>Close</a>
            <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
        <div className="search-books-results">
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

Search.defaultProps = {
  books: []
}

export default withRouter(Search)
