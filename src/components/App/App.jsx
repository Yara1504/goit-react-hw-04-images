import React, { useState, useEffect } from 'react';
import fetchImages from 'api/fetchImages';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  
    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { hits } = await fetchImages(search, page);
      
        if (page === 1) {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
          }));
          setImages(imagesArray);
        } else {
          const newImages = hits.map(hit => ({
            id: hit.id,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
          }));
          setImages(prevImages => [...prevImages, ...newImages]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, page]);
     
  const searchImg = search => {
    setSearch(search);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalWindow = (largeImageURL) => {
    setModalWindow(prevModalWindow => !prevModalWindow);
    setCurrentImageUrl((largeImageURL));
  };
  
  return (
    <>
      <Searchbar onSubmit={searchImg} />
      {images && <ImageGallery images={images} handleModalWindow={handleModalWindow} />}
      {loading && <Loader />}
      {images.length >= 12 && <Button loadMore={loadMore} />}
      {modalWindow && (
        <Modal
          currentImageUrl={currentImageUrl}
          onClose={handleModalWindow}
        />
      )}
    </>
  );
};

export default App;