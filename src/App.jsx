import React, { Component } from 'react';
import './App.scss';
import Header from './components/header/header';
import Image from './components/image/image';
import Popup from './components/popup/popup';
import images from './images.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      showPopup: false,
    };
  }

  componentDidMount() {
    const { togglePopup } = this;
    this.setState(() => ({
      data: images,
    }));

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) togglePopup();
    });
  }

  addImage = (name, src) => {
    const { data } = this.state;
    let id = Math.max(...data.map(o => o.id));
    const newImage = { id: (id += 1), imageName: name, imageSrc: src };

    this.setState(prevState => ({
      data: [newImage, ...prevState.data],
    }));
  };

  deleteImage = (id) => {
    this.setState(prevState => ({
      data: prevState.data.filter(el => el.id !== id),
    }));
  };

  togglePopup = () => {
    const { showPopup } = this.state;
    this.setState(() => ({
      showPopup: !showPopup,
    }));
  };

  render() {
    const { data, showPopup } = this.state;
    const { togglePopup, addImage, deleteImage } = this;
    return (
      <div className="App">
        <Header />
        <button type="button" onClick={e => togglePopup(e)} className="button">
          ADD
        </button>
        <section className="App-main">
          {data.map(image => (
            <Image
              key={image.id}
              imageName={image.imageName}
              imageSrc={image.imageSrc}
              imageId={image.id}
              deleteImage={deleteImage}
            />
          ))}
        </section>
        {showPopup ? (
          <Popup closePopup={e => togglePopup(e)} addImage={addImage} />
        ) : null}
      </div>
    );
  }
}

export default App;
