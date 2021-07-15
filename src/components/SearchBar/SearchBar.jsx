import React, { Component } from "react";
import PropTypes from "prop-types";
import {onShowInfoNotification} from "../../services/notification"
import {Header, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput} from "./SearchBar.styled"

export default class SearchBar extends Component {
    state = {
        searchQuery: "",
    }

    handleSearchQueryChange = (e) => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.searchQuery.trim() === "") {
            onShowInfoNotification()
            return;
        }

        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: "" });
    }

    render() {
        return (
            <Header>
            <SearchForm onSubmit={this.handleSubmit}>
                <SearchFormButton type="submit">
                <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>
                    <SearchFormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="searchQuery"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchQueryChange}/>
            </SearchForm>
            </Header>
        )
    }
}

SearchBar.propTypes = {
        onSubmit: PropTypes.func,
    }


