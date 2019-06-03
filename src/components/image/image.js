import React, { Component } from "react";
import "./image.scss"

class Image extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 0,
			clickedOutside: false,
			activeItem: undefined
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
   		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
		document.removeEventListener('mousedown', this.handleClickOutside);
	}


/**************** outside click *****************/
	setWrapperRef(node) {
	    this.wrapperRef = node;
	}

	handleClickOutside(event) {
	if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
		  this.handleClick();
		}
	}

/**************** resize *****************/
	updateWindowDimensions() {
		this.setState({ width: window.innerWidth});
	}

	handleClick(id) {
	    this.setState({
	      	activeItem: id
	    })
	}


/**************** Image delete *****************/
	delete(id){
       this.props.delete(id);
   	}

	render() {
		return(
			<article ref={this.setWrapperRef} className={ this.state.activeItem === this.props.imageId && this.state.width <= 480 ? "Image mobile-del-btn" : "Image" } 
                onClick={ this.handleClick.bind(this, this.props.imageId) }>
				<header>
					<div className="Image-name">{this.props.imageName}</div>
					<button className="removeImage" onClick={this.delete.bind(this, this.props.imageId)}>Delete</button>
				</header>
				<div className="Image-picture">
					<div className="Image-picture-bg">
						<img src={this.props.imageSrc} alt={this.props.imageName} />
					</div>
				</div>
			</article>
		)
	}
}

export default Image;