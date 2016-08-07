export default {
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
		},

		tooltip: {
			backgroundColor: "rgba(242, 240, 222, 0.85)"
		}
	},

	DAMAGE_DONUT_OPTIONS: {
		chart: {
			backgroundColor: "#20232A",
			type: "pie",
			spacingTop: 0,
			spacingBottom: 0,
			spacingLeft: 0,
			spacingRight: 0,
			marginLeft: 0
		},

		colors: ["#965daa", "#493972", "#cd91d6"],

		legend: {
			align: "right",
			itemHiddenStyle: {
				color: "#272c35"
			},
			itemHoverStyle: {
				color: "#ceac00"
			},
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