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
  const [total, setTotal] = useState(0);
  
  const allPage = Math.ceil(total / 12);
  const showBtn = images.length > 0 && page < allPage;

  useEffect(() => {
      
    if (search === '') {
      return;
    }

async function fetchData() {
  try {
    setLoading(true);
    const response = await fetchImages(search, page); 
    const total = response.totalHits; 
    const images = response.hits;

    setImages(prevImages => [...prevImages, ...images]);

    setTotal(total);
  } finally {
    setLoading(false);
  }
}

    fetchData();}, [search, page]);
     
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
      {showBtn && <Button loadMore={loadMore} />}
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