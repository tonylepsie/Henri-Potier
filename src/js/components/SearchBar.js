import React from 'react';
import reactStringReplace from 'react-string-replace';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {

	constructor() {
		super();
		this.state = {
			searchQuery: '',
			results: []
		};
	}

	findMatches(searchQuery, books) {
		return books.filter(book => {

			const regex = new RegExp(searchQuery, 'gi');
			return book.title.match(regex);
		});
	}

	renderResults(book) {
		const searchQuery = this.state.searchQuery;
		let bookTitle = reactStringReplace(book.title, searchQuery, (match, i) => (
			<mark key={i}>{match}</mark>
		));

		return(
			<div className="result" key={book.isbn} >
				<Link to={`/book/${book.isbn}`} >
					{bookTitle}
				</Link>
			</div>
		);
	}

	searchBook() {
		let searchQuery = this.searchQuery.value;

		if (searchQuery.length > 1) {
			let matchArray = this.findMatches(searchQuery, this.props.books);
			this.setState({
				results: matchArray,
				searchQuery : searchQuery
			});
		}
		else {
			this.setState({
				results: [],
				searchQuery: ''
			});
		}
	}

	render() {
		return(
			<div className="search-bar">
				<div className="column is-half-desktop is-offset-one-quarter">
					<div className="field">
						<div className="control has-icons-left">
							<input className="input" type="text" placeholder="Rechercher" ref={el => this.searchQuery = el} onChange={this.searchBook.bind(this)} />
							<span className="icon is-small is-left">
								<i className="fa fa-search"></i>
							</span>
						</div>
						<div className="search-results">
							{this.state.results.map(this.renderResults, this)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SearchBar.propTypes = {
	books: PropTypes.array
};

export default SearchBar;