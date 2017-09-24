import React, { Component } from 'react'

import { getAll, update } from '../../utils/api'
import Search from './search'
import ListBooks from './list-books'
import { Loading } from './../../components'

const CURRENTLY_READING = 'currentlyReading'
const WANT_TO_READ = 'wantToRead'
const READ = 'read'

class Books extends Component {
  constructor(){
    super()

    this.state = {
      showSearchPage: false,
      isFetching: false,
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount(){
    this.loadBooks()
  }

  toggleLoading = () => {
    this.setState({
      isFetching: !this.state.isFetching
    })
  }

  loadBooks = () => {
    this.toggleLoading()

    getAll()
      .then((data) => {
      this.setState({
        currentlyReading: data.filter(book => book.shelf === CURRENTLY_READING),
        wantToRead: data.filter(book => book.shelf === WANT_TO_READ),
        read: data.filter(book => book.shelf === READ)
      })
    }).then(this.toggleLoading)
  }

  closeSearch = () => {
    this.setState({ showSearchPage: false })
  }

  updateShelfBook = (book, shelf) => {
    this.toggleLoading()

    update(book, shelf)
      .then(this.loadBooks)
      .then(this.toggleLoading)
  }

  render() {
    const { showSearchPage, isFetching } = this.state

    return (
      <div className="app">
        <Loading show={isFetching} />

        {showSearchPage ? (
          <Search handleClose={this.closeSearch} />
        ) : (
          <ListBooks
            {...this.state}
            handleMoveBook={this.updateShelfBook}
          />
        )}
      </div>
    )
  }
}

export default Books
