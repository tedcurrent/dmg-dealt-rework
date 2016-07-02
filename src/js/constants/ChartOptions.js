module.exports = {
	GLOBAL_OPTIONS: {
		chart: {
			style: {
				fontFamily: "'Alegreya', 'serif'"
			}
		},
		
		plotOptions: {
			pie: {
				size: "100%",
				dataLabels: {
					enabled: false
				},
				showInLegend: true,
				innerSize: "50%"
			}
		},

		credits: {
			enabled: false
		},

		title: {
			text: ""
		}
	},

	DAMAGE_DONUT_OPTIONS: {
		chart: {
			backgroundColor: "#20232A",
			type: "pie",
			spacingTop: 0,
			spacingBottom: 0,
			spacingLeft: 0,
			spacingRight: 0
		},

		colors: ["#e06464", "#6464e0", "#64e08c"],

		legend: {
			align: "right",
			itemStyle: {
				"color": "#f2f0de"
			},
			layout: "vertical",
			verticalAlign: "middle"
		},

		series: [
			{
				borderColor: "#20232A",
				name: "Damage done",
				data: [
					{name: "Physical damage", y: 0},
					{name: "Magic damage", y: 0},
					{name: "True damage", y: 0}
				]
			}
		]
	}
};