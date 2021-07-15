import React from "react";
import PropTypes from "prop-types";
import {Item, Image} from "./ImageGalleryItem.styled"

export default function ImageGalleryItem({tags, previewImg, selectedImage}) {
    return (
        <Item>
            <Image src={previewImg} alt={tags} onClick={selectedImage}/>
        </Item>
    )
}

ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    previewImg: PropTypes.string.isRequired,
    selectedImage: PropTypes.func,
}

