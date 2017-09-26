import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { getAll, update } from '../../utils/api'

import Search from './search'
import ListBooks from './list-books'

const CURRENTLY_READING = 'currentlyReading'
const WANT_TO_READ = 'wantToRead'
const READ = 'read'

class Books extends PureComponent {
  constructor(){
    super()

    this.state = {
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

  _updateShelfBook = (book, shelf) => {
    this.toggleLoading()

    update(book, shelf)
      .then(this.loadBooks)
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
                updateShelfBook={this._updateShelfBook}
              />
            )} />
            <Route path="/pesquisa" render={() => (
              <Search updateShelfBook={this._updateShelfBook} />
              )} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Books
