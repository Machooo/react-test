import React, { Component } from 'react';
import { number, string, func } from 'prop-types';
import './image.scss';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      activeItem: undefined,
    };
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

  /* outside click */
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleClick();
    }
  };

  /* resize */
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  handleClick = (id) => {
    this.setState({
      activeItem: id,
    });
  };

  /* Image delete */
  deleteImage = (id) => {
    const { deleteImage } = this.props;
    deleteImage(id);
  };

  render() {
    const { handleClick, deleteImage } = this;
    const { activeItem, width } = this.state;
    const { imageId, imageName, imageSrc } = this.props;
    return (
      <article
        ref={this.setWrapperRef}
        className={
          activeItem === imageId
          && width <= 480
            ? 'Image mobile-del-btn'
            : 'Image'
        }
        role="presentation"
        onClick={e => handleClick(imageId, e)}
      >
        <header>
          <div className="Image-name">
            {imageName}
          </div>
          <button
            type="button"
            className="removeImage"
            onClick={e => deleteImage(imageId, e)}
          >
            Delete
          </button>
        </header>
        <div className="Image-picture">
          <div className="Image-picture-bg">
            <img src={imageSrc} alt={imageName} />
          </div>
        </div>
      </article>
    );
  }
}

Image.propTypes = {
  imageId: number.isRequired,
  imageName: string.isRequired,
  imageSrc: string.isRequired,
  deleteImage: func.isRequired,
};

export default Image;
