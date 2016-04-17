"use strict";

var React = require("react");
var Image = require("../common/Image");

var SummonerInfo = React.createClass({
	render: function() {
		return (
			<div className="summoner-info">
				<div className="thumbnail-container">
					<Image src={this.props.summoner.profileIconUrl} alt={"summoner icon"} />
				</div>
				<span>{this.props.summoner.summonerName}</span>
				<span>{this.props.summoner.region}</span>
			</div>
		);
	}
});

module.exports = SummonerInfo;