import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Alert from 'alertify.js'

import { getAll, update } from '../../utils/api'

import { Loading } from './../../components'

import Search from './search'
import ListBooks from './list-books'

class Books extends PureComponent {
  constructor(){
    super()

    this.state = {
      isFetching: false,
      books: [],
      isLoading: false
    }
  }

  componentDidMount(){
    this.loadBooks()
  }

  startLoading = () => {
    this.setState({
      isLoading: true
    })
  }

  hideLoading = () => {
    this.setState({
      isLoading: false
    })
  }

  loadBooks = () => {
    this.startLoading()

    getAll()
      .then((data) => {
      this.setState({
        books: data
      })
    }).then(this.hideLoading)
  }

  _updateShelfBook = (book, shelf) => {
    this.startLoading()

    update(book, shelf)
      .then(this.loadBooks)
      .then(() => Alert.success(`O livro <strong>${book.title}</strong> foi adicionado a <strong>${shelf}</strong>`))
  }

  render() {
    const { books, isLoading } = this.state

    return (
      <div className="app">
        <Loading show={isLoading} />
        <Router>
          <Switch>
            <Route exact path='/' render={() => (
              <ListBooks
                books={books}
                isFetching={isLoading}
                updateShelfBook={this._updateShelfBook}
              />
            )} />
            <Route path="/pesquisa" render={() => (
              <Search myBooks={books} updateShelfBook={this._updateShelfBook} />
              )} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Books
