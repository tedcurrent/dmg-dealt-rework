"use strict";

import React from "react";

// Select component. Country options come from the owning component
export default function Dropdown(props) {
	const options = props.options.map((option) => {
		return (
			<option key={option[props.valueField]} value={option[props.valueField]}>
				{option[props.labelField]}
			</option>
		);
	});

	const _handleChange = (e) => {
		props.onChange(e.target.value);
	};
	
	return (
		<div className="drop-down">
			<select id={props.id}
				value={props.value} 
				onChange={_handleChange}>
				{options}
			</select>
			<span className="drop-arrow">&#9660;</span>
		</div>
	);
}