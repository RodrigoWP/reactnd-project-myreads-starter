import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { getAll, update, search } from '../../utils/api'
import Search from './search'
import ListBooks from './list-books'

const CURRENTLY_READING = 'currentlyReading'
const WANT_TO_READ = 'wantToRead'
const READ = 'read'

class Books extends Component {
  constructor(){
    super()

    this.state = {
      isFetching: false,
      currentlyReading: [],
      wantToRead: [],
      read: [],
      books: []
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

  updateShelfBook = (book, shelf) => {
    this.toggleLoading()

    update(book, shelf)
      .then(this.loadBooks)
      .then(this.toggleLoading)
  }

  _handleSearch = (value) => {
    clearTimeout(this.searchTmo)

    this.searchTmo = setTimeout(() => this.searchBooks(value), 1000)
  }

  processData = (data) => {
    this.setState({
      books: !!data && !data.error ? data : []
    })
  }

  searchBooks = (searchValue) => {
    this.toggleLoading()

    search(searchValue)
      .then((data) => this.processData(data))
      .then(this.toggleLoading)
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path='/' render={() => (
              <ListBooks
                {...this.state}
                handleMoveBook={this.updateShelfBook}
              />
            )} />
            <Route path="/pesquisa" render={() => (
              <Search
                {...this.state}
                handleMoveBook={this.updateShelfBook}
                handleSearch={this._handleSearch}
              />
            )} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Books
