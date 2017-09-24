"use strict";

import React from "react";
import ReactDOM from "react-dom";
import SearchInputContainer from "./SearchInputContainer";
import SearchResultWrapper from "./SearchResultWrapper";
import ApiRequestActions from "../../actions/ApiRequestActions";
import SearchActions from "../../actions/SearchActions";
import SearchStore from "../../stores/SearchStore";
import Util from "../../util/utils";
import debounce from "lodash/debounce";

// Search controller
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = SearchStore.getAll();

    this._onChange = this._onChange.bind(this);
    this._changeRegion = this._changeRegion.bind(this);
    this._changeSummoner = this._changeSummoner.bind(this);
    this._search = debounce(this._search.bind(this), 400);
    this._submitResult = this._submitResult.bind(this);
    this._bodyClickHandler = this._bodyClickHandler.bind(this);
  }

  componentWillMount() {
    SearchStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className="search">
        <SearchInputContainer
          queryValue={this.state.input.summoner}
          regionSelected={this.state.input.region}
          resultSelected={this.state.resultSelected}
          searchResult={this.state.results}
          queryStringChange={this._changeSummoner}
          resultSubmitHandler={this._submitResult}
          arrowKeyNavigation={this._arrowKeyNavigation}
          dropDownChange={this._changeRegion}
        />
        <SearchResultWrapper
          searchResult={this.state.results}
          queryLengthOk={this.state.queryLengthOk}
          resultSelected={this.state.resultSelected}
          onClick={this._submitResult}
          bodyClick={this._bodyClickHandler}
        />
      </div>
    );
  }

  _onChange() {
    this.setState(SearchStore.getAll());
  }

  _changeRegion(value) {
    SearchActions.changeRegion(value);
    this._search(this.state.input.summoner, value);
  }

  _changeSummoner(value) {
    SearchActions.changeSummoner(value);
    this._search(value, this.state.input.region);
  }

  // Calls to this are debounced (see lifecycle) to avoid server call overload
  _search(summoner, region) {
    this._resetResults();
    if (Util.isQueryLengthOk(summoner)) {
      SearchActions.changeQueryLength(true);
      ApiRequestActions.getSummoner({ summoner, region });
    } else {
      SearchActions.changeQueryLength(false);
    }
  }

  _submitResult() {
    const summoner = this.state.results.summoner;
    this.context.router.push("/" + summoner.id + "/" + summoner.region);
    this._resetResults();
  }

  _bodyClickHandler(e) {
    if (!ReactDOM.findDOMNode(this).contains(e.target))
      this._resetResults();
  }

  _arrowKeyNavigation(selected) {
    SearchActions.changeArrowNavigation(selected);
  }

  _resetResults() {
    SearchActions.resetResults();
  }
}

Search.contextTypes = {
  router: React.PropTypes.object.isRequired
};