import React from 'react';
import Params from './Params';
import Order from './Order';
import PropTypes from 'prop-types';

class Cart extends React.Component{

	constructor(props) {
		super(props);
	}

	renderCartItem(item) {
		let books = this.props.books;
		let book = books[books.findIndex( book => {
			return book.isbn === item.isbn;
		})];

		return(
			<tr key={item.isbn}>
				<td>
					<figure className="media-left is-pulled-left">
						<p className="image">
							<img src={book.cover} />
						</p>
					</figure>
					<h3>{book.title}</h3>
					<button className="button is-dark is-small is-outlined" onClick={() => this.props.deleteFromCart(item.isbn)} >
						<span>Supprimer du panier</span>
						<span className="icon is-small">
							<i className="fa fa-times"></i>
						</span>
					</button>
				</td>
				<td>
					<span>{item.qty}</span>
				</td>
				<td>
					<span>{(item.qty * book.price) + Params.unit}</span>
				</td>
			</tr>
		);
	}

	render() {
		let isLoading = this.props.isLoading;
		if(!isLoading) {
			if(this.props.cart.length === 0 ) return <div className="cart container"><h2 className="title is-6">Votre panier est vide !</h2></div>;
			return (
				<div className="cart container">
					<table className="table">
						<thead>
							<tr>
								<th>
									<h2 className="title is-6">Votre panier</h2>
								</th>
								<th>Quantité</th>
								<th>Prix</th>
							</tr>
						</thead>
						<tbody>
							{this.props.cart.map(item => this.renderCartItem(item))}
						</tbody>
						<Order cart={this.props.cart} isbnChain={this.props.isbnChain} isLoading={this.props.isLoading} />	
					</table>

					<button className="button is-pulled-right is-success">
						<span className="icon"><i className="fa fa-arrow-right"></i></span>
						<span>Procéder au paiement</span>
					</button>

				</div>
			);
		}
		else return null;
	}
}

Cart.propTypes = {
	books: PropTypes.array,
	cart: PropTypes.array,
	isLoading: PropTypes.bool,
	isbnChain: PropTypes.string,
	deleteFromCart: PropTypes.func
};

export default Cart;
