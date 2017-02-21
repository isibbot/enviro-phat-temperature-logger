
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var  area = d3.svg.area()
	.x(function(d) { return x(d.date); })
	.y0(height)
	.y1(function(d) { return y(d.temperature); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.csv("csv/data.csv", function(error, data) {
//   data.forEach(function(d) {
//     d.date = parseDate(d.date);
//     d.temperature = +d.temperature;
//   });

//   x.domain([data[0].date, data[data.length - 1].date]);
//   y.domain(d3.extent(data, function(d) { return d.temperature; }));

//   svg.append("linearGradient")
//       .attr("id", "temperature-gradient")
//       .attr("gradientUnits", "userSpaceOnUse")
//       .attr("x1", 0).attr("y1", y(50))
//       .attr("x2", 0).attr("y2", y(60))
//     .selectAll("stop")
//       .data([
//         {offset: "0%", color: "steelblue"},
//         {offset: "50%", color: "gray"},
//         {offset: "100%", color: "red"}
//       ])
//     .enter().append("stop")
//       .attr("offset", function(d) { return d.offset; })
//       .attr("stop-color", function(d) { return d.color; });

//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Temperature (ºF)");

// 	svg.append("path")
// 		.datum(data)
// 		.attr("class", "area")
// 		.attr("d", area);

// });

d3.json("api/temperatures", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.created);
    d.temperature = +d.reading;
  });

  x.domain([data[0].date, data[data.length - 1].date]);
  y.domain(d3.extent(data, function(d) { return d.temperature; }));

  svg.append("linearGradient")
      .attr("id", "temperature-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", y(50))
      .attr("x2", 0).attr("y2", y(60))
    .selectAll("stop")
      .data([
        {offset: "0%", color: "steelblue"},
        {offset: "50%", color: "gray"},
        {offset: "100%", color: "red"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

	svg.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area);

});