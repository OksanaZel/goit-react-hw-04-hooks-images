import React, { useState, useEffect } from "react";
import fetchImages from "./services/api-service";
import {onShowErrorNotification} from "./services/notification"
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreButton from "./components/LoadMoreButton";
import Spinner from "./components/Spinner";
import Modal from "./components/Modal";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!searchQuery) {
      return
    }

    setStatus("pending");

    fetchImages(searchQuery, page).then((images) => {

      if (!images.length) {
        throw new Error();
      }
      
      setImages(prevImages => [...prevImages, ...images]);
      setStatus("resolved");

      page > 1 &&
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      
    }).catch((error) => {
      console.log(error);
      onShowErrorNotification();
      setStatus("rejected");
    })
  }, [searchQuery, page])

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return
    }
    
    resetState();
    setSearchQuery(query);
  };

  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImg(largeImageUrl);
    setAlt(tags);
  }
  
  const closeModal = () => {
    setSelectedImg(null)
  }

  const resetState = () => {
    setSearchQuery("");
    setPage(1);
    setImages([]);
    setSelectedImg(null);
    setAlt(null);
    setStatus("idle");
  }

  if (status === "idle") {
    return <SearchBar onSubmit={handleFormSubmit} />
  }

  if (status === "pending") {
    return (
      <>
        <SearchBar onSubmit={handleFormSubmit} />
        <Spinner />
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
        {images.length > 0 && <LoadMoreButton onClick={loadMoreBtnClick} />}
      </>
    )
  }

  if (status === "resolved") {
    return (
      <>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
        {selectedImg && <Modal selectedImg={selectedImg} tags={alt} onClose={closeModal} />}
        {images.length > 0 && <LoadMoreButton onClick={loadMoreBtnClick} />}
      </>
    )
  }

  if (status === "rejected") {
    return <SearchBar onSubmit={handleFormSubmit} />
  }
}