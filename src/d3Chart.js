// import $ from 'jquery'
import * as d3 from 'd3'
// import vizabi from 'vizabi'

// console.log(vizabi)

export default class d3Chart {
	create (element) {
		this.margin = {top: 20, right: 20, bottom: 30, left: 50},
		this.width = 960 - this.margin.left - this.margin.right,
		this.height = 500 - this.margin.top - this.margin.bottom

		// parse the date / time
		// var parseTime = d3.timeParse("%d-%b-%y")

		// console.log(parseTime)

		// set the ranges
		this.x = d3.scaleLinear().range([0, this.width])
		this.y = d3.scaleLinear().range([this.height, 0])

		// define the line
		// this.valueline = d3.line()
		// 	.x((d) => this.x(d.x) )
		// 	.y((d) => this.y(d.y) )

		this.svg = d3.select(element).append('svg')
				.attr('width', this.width + this.margin.left + this.margin.right)
				.attr('height', this.height + this.margin.top + this.margin.bottom)
			.append('g')
				.attr('transform', 
						`translate(${this.margin.left},${this.margin.top})`)
	}

	init () {
		//	 this.svg.append('path')
		// 	.attr('class', 'line')

		// Add the X Axis
		this.svg.append("g")
			.attr('class', 'xAxis')
			.attr("transform", "translate(0," + this.height + ")")
			.call(d3.axisBottom(this.x))

		// Add the Y Axis
		this.svg.append("g")
			.attr('class', 'yAxis')
			.call(d3.axisLeft(this.y))
	}


	update (data) {
		console.log(data.length)

		const t = d3.transition().duration(500)

		// console.log(data)

		// Scale the range of the data
		this.x.domain(d3.extent(data, function(d) { return d.x }))
		this.y.domain([0, d3.max(data, function(d) { return d.y })])

		// Add the valueline path.
		// this.svg.selectAll('path.line')
		// 		.data([data])
		// 		.attr("d", this.valueline)

		this.svg.selectAll('g.xAxis')
			.call(d3.axisBottom(this.x))

		this.svg.selectAll('g.yAxis')
			.call(d3.axisLeft(this.y))
		

		const scal = 3
		const placeX = (d, i) => (i*100 + 30) / scal


		// JOIN
		const circle = this.svg.selectAll('circle').data(data, d => d.name)

		// EXIT
		circle.exit()
			.transition(t)
				.style('fill-opacity', 1e-6)
				.style('stroke-opacity', 1e-6)
				.remove()

		// UPDATE old elements
		// circle.attr("class", 'update')
		// 	.transition(t)
		// 		.attr('cy', d => y(d.y) )
		// 		.attr('cx', d => x(d.x) )

		// ENTER new elements
		const enterCircle = circle.enter().append('circle')

		enterCircle
				.style('fill-opacity', 0)
				.style('stroke-opacity', 0)
				.classed('stroked', true)
				.attr('cy', d => this.y(d.y) )
				.attr('cx', d => this.x(d.x) )
				
		enterCircle.merge(circle)
			.transition(t)
				.style('fill-opacity', 0.7)
				.style('stroke-opacity', 0.7)
				.attr('cy', d => this.y(d.y) )
				.attr('cx', d => this.x(d.x) )
				.attr('r', d =>  d.r / scal)
				.attr('fill', 'red')
				
				

	}

}


	// // Get the data
	

