import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchResult extends React.Component{

	render() {
		let books = this.props.books;
		let isbn = this.props.routeProps.match.params.isbn;
		let book = books[books.findIndex( book => {
			return book.isbn === isbn;
		})];

		if(!this.props.isLoading) {
			return (
				<section className="section">
					<div className="container">
						<div className="columns is-multiline is-mobile is-centered">
							<Book book={book} addToCart={this.props.addToCart} />
						</div>
					</div>
				</section>
			);
		}
		else return null;
	}
}

SearchResult.propTypes = {
	books: PropTypes.array,
	isLoading: PropTypes.bool,
	addToCart: PropTypes.func,
	routeProps: PropTypes.object
};

export default SearchResult;