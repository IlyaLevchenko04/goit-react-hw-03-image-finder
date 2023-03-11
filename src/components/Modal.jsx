import { Component } from 'react';
import '../index.css';

export class Modal extends Component {
  state = {
    id: this.props.currentId,
    imageInfo: '',
  };

  componentDidMount() {
    this.setState({ id: this.props.currentId });

    window.addEventListener('keydown', this.onEscClick);

    fetch(
      `https://pixabay.com/api/?key=32923550-e97d894c3a0a0654cb5be36c1&id=${this.state.id.toString()}`
    )
      .then(data => data.json())
      .then(data => {
        const arr = data.hits;
        const url = arr.map(({ largeImageURL }) => {
          return largeImageURL;
        });
        this.setState({ imageInfo: url });
      });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      return this.props.handleModal();
    }
  };

  onBakcdropClick = e => {
    if (e.currentTarget === e.target) {
      return this.props.handleModal();
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.onBakcdropClick}>
        <div className="modal">
          <img src={this.state.imageInfo} alt="" />
        </div>
      </div>
    );
  }
}
