import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { search } from '../../../utils/api'

import { Loading, Book } from './../../../components'

class Search extends Component {
  constructor(){
    super()

    this.state = {
      books: [],
      isFetching: false
    }
  }

  showLoading = () => {
    this.setState({
      isFetching: true
    })
  }

  hideLoading = () => {
    this.setState({
      isFetching: false
    })
  }

  onSearch = (e) => {
    const { value } = e.target

    clearTimeout(this.searchTmo)

    this.searchTmo = setTimeout(() => this.searchBooks(value), 1000)
  }

  processData = (data) => {
    let newData = []

    if(!!data && !data.error){
      const { myBooks } = this.props

      newData = data.map(book => {
        const newBook = myBooks.find(shelfBook => shelfBook.title === book.title)

        return newBook || book
      })
    }

    this.setState({
      books: newData
    })
  }

  searchBooks = (value) => {
    this.showLoading()

    search(value)
      .then((data) => this.processData(data))
      .then(this.hideLoading)
  }

  clearData = () => {
    this.setState({
      books: []
    })
  }

  goToHomePage = () => {
    const { history } = this.props

    history.replace('/')

    this.clearData()
  }

  render(){
    const { updateShelfBook } = this.props
    const { books, isFetching } = this.state

    return (
      <div className="search-books">
        <Loading show={isFetching} />

        <div className="search-books-bar">
          <a className="close-search" onClick={this.goToHomePage}>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book, index) => {
              return (
                <li key={index}>
                  <Book book={book} updateShelfBook={updateShelfBook}/>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  myBooks: PropTypes.array,
  updateShelfBook: PropTypes.func.isRequired
}

Search.defaultProps = {
  myBooks: []
}

export default withRouter(Search)
