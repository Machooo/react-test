import React, { Component } from "react";
import "./popup.scss";

class Popup extends Component {

   constructor(props) {
      super(props);

      this.state = {
        imageName: '',
        imageSrc: ''
      }
      
      this.handleChange = this.handleChange.bind(this);
      this.addImage = this.addImage.bind(this);
    }

  addImage(name, src){
    this.props.addImage(name, src);
    this.setState({imageName: '', imageSrc: ''});
    this.props.closePopup();
  }

  handleChange(key) {
    return function(e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  render() { 
    return (
    <div className='popup'>
      <div className='popup-inner'>
        <div className="popup-title">New Image</div>
        <input 
          type="text" 
          value={this.state.imageName} 
          className="image-title" 
          placeholder="Title"
          onChange={ this.handleChange('imageName') } />
        <input 
          type="text" 
          value={this.state.imageSrc}  
          className="image-url" 
          placeholder="URL"
          onChange={ this.handleChange('imageSrc') }  />
        <div className="popup-bottom">
          <button onClick={this.props.closePopup} className="popup-close">CLOSE</button>
          <button className="popup-add" onClick={this.addImage.bind(this, this.state.imageName, this.state.imageSrc)}>ADD</button>
        </div>
      </div>
    </div>
    );
  }
};

export default Popup;