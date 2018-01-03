import React from 'react';
import Params from './Params';
import PropTypes from 'prop-types';

class Book extends React.Component {

	constructor() {
		super();
		this.state = {
			isModalOpen: false
		};
	}

	toggleModal () {
		this.setState({
			isModalOpen : this.state.isModalOpen ? false : true
		});
	}

	render() {
		const book = this.props.book;
		return (
			<div className="column is-3-desktop is-one-third-tablet is-half-mobile" key={'book-'+book.isbn}>
				<div className="card">
					<div className="card-image">
						<figure className="image" onClick={this.toggleModal.bind(this)}>
							<img src={book.cover} alt={book.title} />
						</figure>
					</div>
					<div className="card-content">
						<h3 className="title is-6 has-text-centered">{book.title}</h3>
					</div>
					<footer className="card-footer">

						<div className="card-footer-item has-text-centered">{book.price + Params.unit}</div>
						<a className="card-footer-item" onClick={() => this.props.addToCart(book)} >
							<span className="icon"><i className="fa fa-cart-plus fa-2x"></i></span>
						</a>
					</footer>
				</div>
				<div className={this.state.isModalOpen ? 'modal is-active' : 'modal'}>
					<div className="modal-background" onClick={this.toggleModal.bind(this)}></div>
					<button className="modal-close is-large" aria-label="close" onClick={this.toggleModal.bind(this)}></button>
					<div className="modal-card">
						<section className="modal-card-body">
							<div className="content">
								<h2 className="title is-3">
									{book.title} 
								</h2>
								{book.synopsis.map((item,i) => <p key={i}>{item}</p>)}
							</div>
						</section>
						<footer className="modal-card-foot">
							<button className="button is-info is-pulled-right" onClick={() => this.props.addToCart(book)}>
								<span className="icon">
									<i className="fa fa-shopping-cart"></i>
								</span>
								<span>Ajouter au panier - <strong>{book.price + Params.unit}</strong></span>
							</button>
						</footer>
					</div>
				</div>
			</div>
		);
	}
}

Book.propTypes = {
	book: PropTypes.object,
	addToCart: PropTypes.func
};

export default Book;