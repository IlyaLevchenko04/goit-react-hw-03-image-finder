import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  largeImageURL,
  handleLargeImage,
  id,
  webformatURL,
}) => {
  const onClick = e => {
    e.preventDefault();
    handleLargeImage(largeImageURL);
  };

  return (
    <li className="gallery-item item" id={id} onClick={onClick}>
      <img src={webformatURL} alt="" className="image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  handleLargeImage: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
