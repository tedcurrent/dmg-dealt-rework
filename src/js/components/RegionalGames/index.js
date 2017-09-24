"use strict";

import React from "react";
import ErrorPage from "../Error";
import RegionContainer from "./RegionContainer";
import ApiRequestActions from "../../actions/ApiRequestActions";
import RegionalGamesStore from "../../stores/RegionalGamesStore";

// A wrapper for regional top scores page
export default class RegionalGamesController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regionalResults: RegionalGamesStore.getAll()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    this._refreshRegionals();
    RegionalGamesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    RegionalGamesStore.removeChangeListener(this._onChange);
  }

  // Renders a list of games OR an error OR nothing
  render() {
    const results = this.state.regionalResults;

    if (results.errors === 0 && results.games.length) {
      return this._renderGames(results);
    } else if (results.errors) {
      return this._renderError();
    } else {
      return this._renderNothing();
    }
  }

  _renderGames(results) {
    return <RegionContainer results={results} />;
  }

  _renderError() {
    return (
      <ErrorPage
        errorNumber={"500"}
        errorMessage={"There was an error in game search."}
        errorDetail={"Please try again later."}
      />
    );
  }

  _renderNothing() {
    return <div></div>;
  }

  _onChange() {
    this.setState({ regionalResults: RegionalGamesStore.getAll() });
  }

  _refreshRegionals() {
    ApiRequestActions.getRegionalGames();
  }
}