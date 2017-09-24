"use strict";

import React from "react";
import SearchResult from "./SearchResult";

// A search result wrapper with multiple rendering options based on state
export default class SearchResultWrapper extends React.Component {
  constructor(props) {
    super(props);
    this._bodyClickHandler = this._bodyClickHandler.bind(this);
    this._renderResults = this._renderResults.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this._bodyClickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this._bodyClickHandler);
  }

  render() {
    return (
      <div className="search-result-container">
        {this._renderResults()}
      </div>
    );
  }

  _bodyClickHandler(e) {
    this.props.bodyClick(e);
  }

  _renderResults() {
    if (this.props.searchResult.errors)
      return <div className="search-result error">An error occurred. Please try again</div>;
    if (!this.props.queryLengthOk)
      return <div className="search-result error">A summoner name should be at least 2 characters.</div>;
    if (!this.props.searchResult.summoner)
      return <div className="search-result error">No summoner found.</div>;

    return (
      <SearchResult
        onClick={this.props.onClick}
        summoner={this.props.searchResult.summoner}
        resultSelected={this.props.resultSelected}
      />
    );
  }
}