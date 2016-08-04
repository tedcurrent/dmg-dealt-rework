"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import SearchInputContainer from "./SearchInputContainer";
import SearchResultWrapper from "./SearchResultWrapper";
import ApiRequestActions from "../../actions/ApiRequestActions";
import ApiResponseActions from "../../actions/ApiResponseActions";
import SummonerSearchStore from "../../stores/SummonerSearchStore";
import Util from "../../util/utils";
import _ from "lodash";

// Search controller
export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResult: SummonerSearchStore.getAll(),
			regionSelected: "euw",
			queryValue: "",
			queryLengthOk: true,
			resultSelected: false
		};
		this._onChange = this._onChange.bind(this);
		this._dropDownChange = this._dropDownChange.bind(this);
		this._queryStringChange = this._queryStringChange.bind(this);
		this._anyInputChange = this._anyInputChange.bind(this);
		this._querySubmit = this._querySubmit.bind(this);
		this._resetResults = this._resetResults.bind(this);
		this._resultSubmitHandler = this._resultSubmitHandler.bind(this);
		this._bodyClickHandler = this._bodyClickHandler.bind(this);
		this._arrowKeyNavigation = this._arrowKeyNavigation.bind(this);
		this._validateQueryLength = this._validateQueryLength.bind(this);
	}

	componentWillMount() {
		SummonerSearchStore.addChangeListener(this._onChange);
		this._anyInputChange = _.debounce(this._anyInputChange, 400);
	}

	componentWillUnmount() {
		SummonerSearchStore.removeChangeListener(this._onChange);
	}

	render() {
		return (
			<div className="search">
				<SearchInputContainer
					queryValue={this.state.queryValue}
					resultSelected={this.state.resultSelected}
					queryStringChange={this._queryStringChange}
					resultSubmitHandler={this._resultSubmitHandler}
					arrowKeyNavigation={this._arrowKeyNavigation}
					regionSelected={this.state.regionSelected}
					dropDownChange={this._dropDownChange}
					searchResult={this.state.searchResult}
				/>
				<SearchResultWrapper 
					searchResult={this.state.searchResult}
					queryLengthOk={this.state.queryLengthOk}
					onClick={this._resultSubmitHandler}
					bodyClick={this._bodyClickHandler}
					resultSelected={this.state.resultSelected}
				/>
			</div>
		);
	}

	_onChange() {
		this.setState({searchResult: SummonerSearchStore.getAll()});
	}

	_dropDownChange(value) {
		this.setState({regionSelected: value}, this._anyInputChange);
	}

	_queryStringChange(value) {
		this.setState({queryValue: value}, this._anyInputChange);
	}

	// Calls to this are debounced (see lifecycle) to avoid server call overload
	_anyInputChange() {
		this._resetResults();
		this._validateQueryLength(this.state.queryValue, () => {
			if (this.state.queryLengthOk)
				this._querySubmit(this.state.queryValue, this.state.regionSelected);
		});
	}

	_querySubmit(summonerName, summonerRegion) {
		const query = {summonerName, summonerRegion};
		ApiRequestActions.getSummoner(query);
		this.setState({querySent: true});
	}

	_resetResults() {
		ApiResponseActions.updateSummonerSearchResult({});
		this._arrowKeyNavigation(false);
		this.setState({queryLengthOk: true});
	}

	_resultSubmitHandler() {
		const summoner = this.state.searchResult.summoner;
		this.context.router.push("/" + summoner.id + "/" + summoner.region);
		this._resetResults();
	}

	_bodyClickHandler(e) {
		if (!ReactDOM.findDOMNode(this).contains(e.target))
			this._resetResults();
	}

	_arrowKeyNavigation(selected) {
		this.setState({resultSelected: selected});
	}

	_validateQueryLength(queryValue, callback) {
		this.setState({queryLengthOk: Util.isQueryLengthOk(queryValue)}, callback);
	}
}

Search.contextTypes = {
	router: React.PropTypes.object.isRequired
};