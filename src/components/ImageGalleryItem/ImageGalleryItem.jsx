import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, largeImageURL, handleModalWindow }) {
  return (
    <li className={css.ImageGalleryItem} onClick={() => handleModalWindow(largeImageURL)}>
      <img src={webformatURL} alt="" data-large={largeImageURL} className={css.ImageGalleryItemImage} />
    </li>
  );
}

export default ImageGalleryItem;

