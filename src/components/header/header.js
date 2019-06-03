import React from "react";
import "./header.scss";

class Header extends React.Component{
	render() {
		return(

			<nav className="nav">
				<div className="nav-menu">
					<div className="nav-name">
						<a className="nav-name-logo" href="/">
							Images
						</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;