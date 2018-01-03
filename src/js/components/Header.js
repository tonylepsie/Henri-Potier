import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.Component{

	render() {
		const location = this.props.routeProps.location.pathname;
		let totalItems = this.props.cart.reduce((total, item) => {
			return total + item.qty; 
		},0);
		totalItems = totalItems === 0 ? '' : '('+totalItems+')';

		return (
			<header className="hero is-dark">
				<div className="hero-body">
					<div className="container has-text-centered">
						<h1 className="title">
							<span>La bibliothèque de </span> 
							<span className="bigger">Henri Potier</span>
						</h1>
					</div>
				</div>
				<div className="hero-foot">
					<div className="container">
						<nav className="tabs is-right is-boxed">	
							<ul>
								<li className={location === '/' ? 'is-active' : ''}>
									<Link to='/'>
										<span className="icon is-small"><i className="fa fa-home" aria-hidden="true"></i></span>
										<span>Accueil</span>
									</Link>
								</li>
								<li className={location.startsWith('/cart') ? 'is-active' : ''}>
									<Link to={'/cart'}>
										<span className="icon is-small"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
										<span>Panier {totalItems}</span>
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
		);
	}
}

Header.propTypes = {
	cart: PropTypes.array,
	routeProps: PropTypes.object
};


export default Header;
