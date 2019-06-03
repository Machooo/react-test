import React, { Component } from "react";
import './App.scss';
import Header from "./components/header/header";
import Image from "./components/image/image";
import Popup from "./components/popup/popup";
import images from "./images.json";


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			showPopup: false
		}

		this.addImage = this.addImage.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.togglePopup = this.togglePopup.bind(this);

	}

	componentDidMount() {
		this.setState(prevState => ({
			data: images
		}))

		document.addEventListener('keyup', (e) => {
        	if (e.keyCode === 27) this.togglePopup();
    	});
	}

	addImage(name, src) {
		let id = Math.max.apply(Math, this.state.data.map(function(o) { return o.id; })),
			newImage = {id: id += 1, imageName: name, imageSrc: src};
		
		this.setState(prevState => ({
			data: [newImage, ...prevState.data]
		}))
	}


	removeImage(id) {
		console.log(id);
		this.setState(prevState => ({
        	data: prevState.data.filter(el => el.id !== id )
      	}));
	}

	togglePopup() {
		this.setState(prevState => ({
        	showPopup: !this.state.showPopup
      	}));
	}

  render() {

    return(
      <div className="App">
        <Header />
		<button onClick={this.togglePopup.bind(this)} className="button">ADD</button>
        <section className="App-main">
			{
				this.state.data.map((image, id) => 
					<Image key={id} imageName={image.imageName} imageSrc={image.imageSrc} imageId={image.id} delete={this.removeImage} />
				)
			
			}
		</section>
		{this.state.showPopup ? <Popup closePopup={this.togglePopup.bind(this)} addImage={this.addImage} /> : null}
      </div>
    );
  }
}

export default App;
