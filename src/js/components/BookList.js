import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookList extends React.Component{

	renderBook(book) {
		return (
			<Book book={book} key={book.isbn} addToCart={this.props.addToCart} />
		);
	}

	render() {
		if(!this.props.isLoading) {
			return (
				<section className="section">
					<div className="container">
						<div className="columns is-multiline is-mobile is-centered">
							{this.props.books.map(this.renderBook.bind(this))}
						</div>
					</div>
				</section>
			);
		}
		else return null;
	}
}

BookList.propTypes = {
	books: PropTypes.array,
	cart: PropTypes.object,
	isLoading: PropTypes.bool,
	addToCart: PropTypes.func
};


export default BookList;
