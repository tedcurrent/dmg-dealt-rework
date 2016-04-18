"use strict";

var React = require("react");
var Image = require("../common/Image");
var Util = require("../../util/utils");

var SummonerInfo = React.createClass({
	render: function() {
		var profileIconUrl = Util.buildProfileIconUrl(this.props.summoner.profileIconId);
		return (
			<div className="summoner-info">
				<div className="thumbnail-container">
					<Image src={profileIconUrl} alt={"summoner icon"} />
				</div>
				<span>{this.props.summoner.summonerName}</span>
				<span>{this.props.summoner.region}</span>
			</div>
		);
	}
});

module.exports = SummonerInfo;