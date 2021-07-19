import React, { useState } from "react";
import PropTypes from "prop-types";
import {onShowInfoNotification} from "../../services/notification"
import {Header, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput} from "./SearchBar.styled"


export default function SearchBar({onSubmit}) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchQuery.trim() === "") {
            onShowInfoNotification();
            return;
        }

        onSubmit(searchQuery);
        resetState();
    }

    const resetState = () => {
        setSearchQuery("");
    }

    return (
         <Header>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>
                    <SearchFormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="searchQuery"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}/>
            </SearchForm>
            </Header>
    )
}

SearchBar.propTypes = {
        onSubmit: PropTypes.func,
    }