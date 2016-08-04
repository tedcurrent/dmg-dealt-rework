"use strict";

import React from "react";
import SearchInput from "./SearchInput";
import SearchDropDown from "./SearchDropDown";
import AppConstants from "../../constants/AppConstants";

// Search wrapper (input, dropdown..)
export default function SearchInputContainer(props) {
	return (
		<div className="input-container">
			<SearchInput 
				value={props.queryValue}
				resultSelected={props.resultSelected}
				onChange={props.queryStringChange}
				onEnter={props.resultSubmitHandler}
				resultSelectedChange={props.arrowKeyNavigation}
				summoner={props.searchResult.summoner}
			/>
			<SearchDropDown
				options={AppConstants.SEARCH_REGION_OPTIONS} 
				value={props.regionSelected}
				labelField="description"
				valueField="short"
				onChange={props.dropDownChange}
			/>
		</div>
	);
}