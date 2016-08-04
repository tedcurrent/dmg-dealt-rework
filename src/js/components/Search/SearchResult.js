"use strict";

import React from "react";
import SearchResultThumbnail from "./SearchResultThumbnail";
import _ from "lodash";

export default function SearchResult({summoner, onClick, resultSelected}) {
	const _renderResult = () => {
		return (
			<div 
				onClick={onClick} 
				className={resultSelected ? "search-result selected" : "search-result"}
			>
				<SearchResultThumbnail icon={summoner.profileIconId} />
				<span className="name">{summoner.name}</span>
				<span className="level">
					{"level "} <span className="emphasis">{summoner.level}</span>
				</span>
			</div>
		);
	};

	return (
		<div>
			{_.isEmpty(summoner) ? "" : _renderResult()}
		</div>
	);
}