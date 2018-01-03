import React from 'react';
import Header from './Header';
import BookList from './BookList';
import Cart from './Cart';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class Shop extends React.Component{

	render() {
		return (
			<div>
				<Route path="/" exact component={(routeProps) => 
					<div>
						<Header books={this.props.books} cart={this.props.cart} routeProps={routeProps} />
						<SearchBar books={this.props.books} />
						<BookList books={this.props.books} addToCart={this.props.addToCart} routeProps={routeProps} />
					</div>
				} />
				<Route path="/cart" exact component={(routeProps) => 
					<div>
						<Header books={this.props.books} cart={this.props.cart} routeProps={routeProps} />
						<Cart books={this.props.books} isbnChain={this.props.isbnChain} routeProps={routeProps} cart={this.props.cart} deleteFromCart={this.props.deleteFromCart} isLoading={this.props.isLoading} />
					</div>
				} />
				<Route path="/book/:isbn"  component={(routeProps) => 
					<div>
						<Header books={this.props.books} cart={this.props.cart} routeProps={routeProps} />
						<SearchBar books={this.props.books} />
						<SearchResult books={this.props.books} addToCart={this.props.addToCart} routeProps={routeProps} isLoading={this.props.isLoading}  />
					</div>
				} />
			</div>
		);
	}
}

Shop.propTypes = {
	books: PropTypes.array,
	cart: PropTypes.array,
	isLoading: PropTypes.bool,
	isbnChain: PropTypes.string,
	deleteFromCart: PropTypes.func,
	addToCart: PropTypes.func
};

export default Shop;