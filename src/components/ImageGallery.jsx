import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';

import '../index.css';

export class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className="gallery">
          {this.props.resp.map(({ id, webformatURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                id={id}
                handleId={this.props.handleId}
                handleModal={this.props.handleModal}
              />
            );
          })}
        </ul>
        {this.props.children}
      </>
    );
  }
}
