"use strict";

import React from "react";
import isEmpty from "lodash/isempty";

// Search input component with mouse and keyboard handlers
export default function SearchInput(props) {
	const _handleChange = (e) => {
		props.resultSelectedChange(false);
		props.onChange(e.target.value);
	};

	const _handleKeyDown = (e) => {
		switch (e.key) {
			case "Enter":
				props.resultSelected ? props.onEnter() : _handleChange(e);
				break;
			case "ArrowDown":
				e.preventDefault();
				if (_hasSummoner(props.summoner))
					props.resultSelectedChange(!props.resultSelected);
				break;
			case "ArrowUp":
				e.preventDefault();
				if (_hasSummoner(props.summoner))
					props.resultSelectedChange(!props.resultSelected);
				break;
			default:
		}
	};

	const _hasSummoner = (result) => {
		return result && !isEmpty(result);
	};

	return (
		<input
			id="search-input"
			type="text"
			placeholder="Summoner name"
			autoFocus={true}
			value={props.value}
			onChange={_handleChange}
			onKeyDown={_handleKeyDown}
		/>
	);
}