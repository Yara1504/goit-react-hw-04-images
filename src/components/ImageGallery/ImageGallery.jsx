import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ images, handleModalWindow }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={webformatURL}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          handleModalWindow={handleModalWindow}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;