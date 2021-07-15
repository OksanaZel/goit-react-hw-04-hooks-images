import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem"
import { List } from "./ImageGallery.styled";

export default function ImageGallery({images, selectedImage}) {
    return (
        <List>
            {images.map(({id, webformatURL, tags, largeImageURL}) => (
                <ImageGalleryItem
                    key={id}
                    previewImg={webformatURL}
                    tags={tags}
                    selectedImage={()=> selectedImage(largeImageURL, tags)}/>
            ))}
        </List>
    )
}
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    })),
    selectedImage:PropTypes.func,
}
