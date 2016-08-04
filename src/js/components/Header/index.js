"use strict";

import React from "react";
import Search from "../Search/index";
import { Link } from "react-router";
import ApiRequestActions from "../../actions/ApiRequestActions";

// A wrapper for navigation items and search
export default function Header(props) {
	return (
		<header>
			<span className="logo">
				<a href="/">DMGDealt</a>
			</span>
			<Search />

			<ul>
				<li>
					<Link to="/regions">
						<i className="fa fa-globe" aria-hidden="true"></i>
						<span> TOP</span>
					</Link>
				</li>
			</ul>
		</header>
	);
}