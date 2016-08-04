"use strict";

import React from "react";
import ErrorPage from "../Error";
import PersonalContainer from "./PersonalContainer";
import ApiRequestActions from "../../actions/ApiRequestActions";
import PersonalGamesStore from "../../stores/PersonalGamesStore";
import _ from "lodash";

// Controller for the PersonalGames page
export default class PersonalGamesController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameResults: PersonalGamesStore.getAll()
		};
		this._onChange = this._onChange.bind(this);
	}

	componentWillMount(){
		this._refreshGames(this.props);
		PersonalGamesStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		PersonalGamesStore.removeChangeListener(this._onChange);
	}

	componentWillReceiveProps(nextProps) {
		this._refreshGames(nextProps);
	}

	// Renders a list of games OR an error OR nothing
	render() {
		const results = this.state.gameResults;

		if (results.errors === 0 && !_.isEmpty(results.summoner)) {
			return this._renderGames(this.state.gameResults);
		} else if (results.errors) {
			return this._renderError();
		} else {
			return this._renderNothing();
		}
	}

	_renderGames(results) {
		return <PersonalContainer results={results} />;
	}

	_renderError() {
		return (
			<ErrorPage
				errorNumber={404}
				errorMessage={"No games found with the name and region combination."}
				errorDetail={"Please try something else."}
			/>
		);
	}

	_renderNothing() {
		return <div></div>;
	}

	_onChange() {
		this.setState({gameResults: PersonalGamesStore.getAll()});
	}

	_refreshGames({params: {id, region}}) {
		const query = {id, region};
		ApiRequestActions.getPersonalGames(query);
	}
}