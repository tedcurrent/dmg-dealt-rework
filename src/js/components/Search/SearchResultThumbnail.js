"use strict";

var React = require("react");
var Image = require("../Common/Image");
var Util = require("../../util/utils");
var AppConstants = require("../../constants/AppConstants");

var SearchResultThumbnail = React.createClass({
	render: function() {
		return (
			<div className="thumbnail-container">
				<Image 
					src={Util.buildProfileIconUrl(this.props.icon)} 
					defaultImage={AppConstants.DEFAULT_SUMMONER_ICON_PATH}
					alt={"summoner icon"} 
				/>
			</div>
		);
	}
});

module.exports = SearchResultThumbnail;