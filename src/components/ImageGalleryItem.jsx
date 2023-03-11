import { Component } from 'react';
import '../index.css';

export class ImageGalleryItem extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.handleId(e.currentTarget.closest('li').id);
    this.props.handleModal();
  };

  render() {
    const { id, webformatURL } = this.props;
    return (
      <li className="gallery-item item" id={id}>
        <a href="./" onClick={this.onClick} className="link">
          <img src={webformatURL} alt="" className="image" />
        </a>
      </li>
    );
  }
}
