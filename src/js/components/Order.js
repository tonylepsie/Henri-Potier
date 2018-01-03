import React from 'react';
import Params from './Params';
import PropTypes from 'prop-types';

class Order extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			bestPrice: 0,
			priceBeforeReduction: this.getPriceBeforeReduction()
		};
	}

	componentWillMount() {
		let isbnChain = this.props.isbnChain;
		fetch(Params.endPoint+'/'+isbnChain+'/commercialOffers')
			.then(blob => blob.json())
			.then(data => this.getBestOffer(data));
	}

	getPriceBeforeReduction() {
		let price = 0;
		this.props.cart.forEach((item) => {
			for ( let i = 0 ; i < item.qty; i++ ) {
				price += item.price;
			}
		});
		return price;
	}

	getBestOffer (data) {
		const prices= [];
		const priceBeforeReduction = this.state.priceBeforeReduction;

		data.offers.forEach( offer => {
			switch(offer.type) {
			case 'percentage': {
				const percentagePrice = priceBeforeReduction - (priceBeforeReduction * (offer.value / 100));
				prices.push(percentagePrice);
				break;
			}
			case 'minus': {
				const minusPrice = (priceBeforeReduction - offer.value);
				prices.push(minusPrice);
				break;
			}
			case 'slice': {
				if (priceBeforeReduction >= offer.value) {
					const slicePrice = priceBeforeReduction - (Math.floor(priceBeforeReduction / offer.sliceValue)) * offer.value;
					prices.push(slicePrice);
				}
				break;
			}
			}
		});
		const bestPrice = Math.min(...prices);
		this.setState({
			bestPrice
		});
	}

	render() {
		return (
			<tfoot>
				<tr>
					<th colSpan="2">
						Prix avant réduction
					</th>
					<th>
						<div><strike>{this.state.priceBeforeReduction+Params.unit}</strike></div>
					</th>
				</tr>
				<tr>
					<th colSpan="2">
						<strong>Prix</strong>
					</th>
					<th>
						<div>{this.state.bestPrice+Params.unit}</div>
					</th>
				</tr>
			</tfoot>
		);
	}
}

Order.propTypes = {
	isbnChain: PropTypes.string,
	cart: PropTypes.array
};


export default Order;