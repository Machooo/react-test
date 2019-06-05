import React, { Component } from 'react';
import { func } from 'prop-types';
import './popup.scss';

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageName: '',
      imageSrc: '',
    };
  }

  addImage = (name, src) => {
    const { addImage, closePopup } = this.props;
    addImage(name, src);
    this.setState({ imageName: '', imageSrc: '' });
    closePopup();
  };

  closePopup = () => {
    const { closePopup } = this.props;
    closePopup();
  };

  handleChange = key => (e) => {
    const state = {};
    state[key] = e.target.value;
    this.setState(state);
  };

  render() {
    const { imageName, imageSrc } = this.state;
    const { closePopup, addImage } = this;
    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-title">New Image</div>
          <input
            type="text"
            value={imageName}
            className="image-title"
            placeholder="Title"
            onChange={this.handleChange('imageName')}
          />
          <input
            type="text"
            value={imageSrc}
            className="image-url"
            placeholder="URL"
            onChange={this.handleChange('imageSrc')}
          />
          <div className="popup-bottom">
            <button type="button" onClick={e => closePopup(e)} className="popup-close">
              CLOSE
            </button>
            <button
              type="button"
              className="popup-add"
              onClick={e => addImage(imageName, imageSrc, e)}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  addImage: func.isRequired,
  closePopup: func.isRequired,
};

export default Popup;
