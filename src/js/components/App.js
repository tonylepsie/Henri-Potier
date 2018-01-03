import React, { Component } from 'react';
import Params from './Params';
import Shop from './Shop';
import { BrowserRouter, Switch,  Route } from 'react-router-dom';

class App extends Component {

  constructor () {
    super();
    this.state = {
      isLoading: true,
      books: [],
      cart: [],
			isbnChain : '',
			bestPrice: 0
    };
  }

  componentWillMount() {
    let books = [];
    fetch(Params.endPoint)
    .then(blob => blob.json())
    .then(data => this.registerBooks(data))
    .catch(error => console.log(error));
  }

	componentDidMount () {
		let localStorageRef = localStorage.getItem('cart');

		if(localStorageRef) {
			const cartArray = JSON.parse(localStorageRef);
			const isbnChain = this.getIsbnChain(cartArray);

      this.setState({
				cart: cartArray,
				isbnChain
      });
		}
		
		
	}

  componentWillUpdate (nextProps, nextState) {
		localStorage.setItem('cart', JSON.stringify(nextState.cart));
	}

  registerBooks (data) {
    this.state.books = data;
    this.state.isLoading = false;
    this.setState({ 
      books : this.state.books,
      isLoading: this.state.isLoading
		});
		
  }

  getIsbnChain(cartArray) {

		let isbnArray = [];
		cartArray.forEach((item) => {
			for ( let i = 0 ; i < item.qty; i++ ) {
				isbnArray.push(item.isbn);
			}
		});

		return isbnArray.join();
  }

  addToCart = (book) => {
    let cartArray = [...this.state.cart];

    // search existing item in cart
    if (cartArray.filter(item => item.isbn === book.isbn).length > 0) {
      //update qty
      cartArray[cartArray.findIndex(item => item.isbn === book.isbn)].qty ++;
    }
    else {
      // add cart item
      cartArray.push({
        isbn: book.isbn,
				qty: 1,
				price: book.price
      });
    }

		const isbnChain = this.getIsbnChain(cartArray);
    this.setState({
			cart: cartArray,
			isbnChain
		});
		
  }

	deleteFromCart = (isbn) => {
		let cartArray = [...this.state.cart];
		let key = cartArray.findIndex( item => {
			return isbn === item.isbn;
		});
		
		if(confirm('Êtes-vous sur de supprimer cet article de votre panier ?')) {
			cartArray.splice(key, 1);
			const isbnChain = this.getIsbnChain(cartArray);

			this.setState({
				cart: cartArray,
				isbnChain
      });
		}
	}

  render() {
    return (
			<Shop books={this.state.books} addToCart={this.addToCart} isbnChain={this.state.isbnChain} deleteFromCart={this.deleteFromCart} cart={this.state.cart} isLoading={this.state.isLoading} />
    )
  }
}

export default App;
