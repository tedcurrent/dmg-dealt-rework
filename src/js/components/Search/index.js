"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import SearchInputContainer from "./SearchInputContainer";
import SearchResultWrapper from "./SearchResultWrapper";
import ApiRequestActions from "../../actions/ApiRequestActions";
import ApiResponseActions from "../../actions/ApiResponseActions";
import SearchActions from "../../actions/SearchActions";
import SearchStore from "../../stores/SearchStore";
import Util from "../../util/utils";
import _ from "lodash";

// Search controller
export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = SearchStore.getAll();

		this._onChange = this._onChange.bind(this);
		this._dropDownChange = this._dropDownChange.bind(this);
		this._queryStringChange = this._queryStringChange.bind(this);
		this._anyInputChange = this._anyInputChange.bind(this);
		this._resultSubmitHandler = this._resultSubmitHandler.bind(this);
		this._bodyClickHandler = this._bodyClickHandler.bind(this);
	}

	componentWillMount() {
		SearchStore.addChangeListener(this._onChange);
		this._anyInputChange = _.debounce(this._anyInputChange, 400);
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
					queryStringChange={this._queryStringChange}
					resultSubmitHandler={this._resultSubmitHandler}
					arrowKeyNavigation={this._arrowKeyNavigation}
					dropDownChange={this._dropDownChange}
				/>
				<SearchResultWrapper 
					searchResult={this.state.results}
					queryLengthOk={this.state.queryLengthOk}
					resultSelected={this.state.resultSelected}
					onClick={this._resultSubmitHandler}
					bodyClick={this._bodyClickHandler}
				/>
			</div>
		);
	}

	_onChange() {
		this.setState(SearchStore.getAll());
	}

	_dropDownChange(value) {
		SearchActions.changeRegion(value);
		this._anyInputChange(this.state.input.summoner, value);
	}

	_queryStringChange(value) {
		SearchActions.changeSummoner(value);
		this._anyInputChange(value, this.state.input.region);
	}

	// Calls to this are debounced (see lifecycle) to avoid server call overload
	_anyInputChange(summoner, region) {
		this._resetResults();
		if (Util.isQueryLengthOk(summoner)) {
			SearchActions.changeQueryLength(true);
			ApiRequestActions.getSummoner({summoner, region});
		} else {
			SearchActions.changeQueryLength(false);
		}
	}

	_resultSubmitHandler() {
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