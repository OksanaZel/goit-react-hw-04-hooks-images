import React, { Component } from "react";
import PropTypes from "prop-types";
import fetchImages from "./services/api-service";
import {onShowErrorNotification} from "./services/notification"
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreButton from "./components/LoadMoreButton";
import Spinner from "./components/Spinner";
import Modal from "./components/Modal";

export default class App extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };
  
  state = {
    searchQuery: "",
    page: 1,
    images: [],
    selectedImg: null,
    alt: null,
    status: "idle"
  }

  async componentDidUpdate(_, prevState) {
    
        const prevSearch = prevState.searchQuery;
        const nextSearch = this.state.searchQuery;

        const prevPage = prevState.page;
        const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.setState({ status: "pending", })

      try {
        const images = await fetchImages(nextSearch, nextPage);
        
        if (!images.length) {
          throw new Error();
        }

        this.setState(prevState => ({
        images: [...prevState.images, ...images],
        status: "resolved"
        }))
      } catch (error) {
        onShowErrorNotification();
        this.setState({ status: "rejected" });

      }
      
      this.state.page > 1 &&
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
        });
      
    }
}

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return
    }
    
    this.resetState();
    this.setState({ searchQuery});
  };

  loadMoreBtnClick = () => {
        this.setState(prevState => ({
         page: prevState.page + 1,
        }));
    }

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImg: largeImageUrl,
      alt: tags
    })
  }
  
  closeModal = () => {
    this.setState({
      selectedImg: null,
    })
  }

  resetState = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      selectedImg: null,
      alt: null,
      status: "idle"
    })
  }

  render() {

    const { images, selectedImg, alt, status} = this.state;
    
    if (status === "idle") {
      return <SearchBar onSubmit={this.handleFormSubmit} />
    }

    if (status === "pending") {
      return (
        <>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <Spinner />
          <ImageGallery images={images} selectedImage={this.handleSelectedImage}/>
          {images.length > 0 && <LoadMoreButton onClick={this.loadMoreBtnClick} />}
        </>
      )
    }

    if (status === "resolved") {
      return (
        <>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} selectedImage={this.handleSelectedImage}/>
        {selectedImg && <Modal selectedImg={selectedImg} tags={alt} onClose={this.closeModal}/>}
        {images.length > 0 && <LoadMoreButton onClick={this.loadMoreBtnClick}/>}
        </>
      )
    }

    if (status === "rejected") {
      return <>
        <SearchBar onSubmit={this.handleFormSubmit} />
      </>
    }
  }
}

