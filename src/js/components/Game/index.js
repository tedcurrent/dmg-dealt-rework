"use strict";

import React from "react";
import GameHeader from "./GameHeader";
import GameStats from "./GameStats/";
import Collapse from "../Common/Collapse";

// A wrapper for the game header and the stats view
export default class GameWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			statsOpen: false
		};
		this._headerClickHandler = this._headerClickHandler.bind(this);
		this._showStats = this._showStats.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.statsOpen)
			this.setState({statsOpen: false});
	}

	render() {
		return (
			<div className="game-wrapper">
				<GameHeader 
					game={this.props.game} 
					gameClass={this.props.gameClass}
					onClick={this._headerClickHandler}
					statsOpen={this.state.statsOpen}
				>
					{this.props.children}
				</GameHeader>
				<Collapse>
					{this._showStats()}
				</Collapse>
			</div>
		);
	}

	_headerClickHandler() {
		this.setState({statsOpen: !this.state.statsOpen});
	}

	_showStats() {
		if (this.state.statsOpen)
			return <GameStats game={this.props.game} />;
	}
}