
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse;

var TheDate = new Date( Date.UTC(2012, 10, 5) );

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

var area = d3.svg.area()
	.x(function(d) { return x(d.created); })
	.y0(height)
	.y1(function(d) { return y(d.reading); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("api/temperatures", function(error, data) {


  data.forEach(function(d) {
    var dtt = parseDate(d.created);
    d.created = dtt;
    d.reading = +d.reading;
  });

  x.domain(
      [ d3.min(data, function(d){ return d.created;}), d3.max(data, function(d){ return d.created;})]
    );
  y.domain(
      [d3.min(data, function(d) { return d.reading-20; }), d3.max(data, function(d) { return d.reading+20; })]
    );

//   x.domain([data[0].date, data[data.length - 1].date]);
//   y.domain(d3.extent(data, function(d) { return d.temperature; }));

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
      .text("Temperature (ºC)");

	svg.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area);

        // Tabel

        // The table generation function
function tabulate(data, columns) {
    var table = d3.select("#chart-table").append("table")
            //.attr("style", "margin-left: 250px")
            .attr("class", "table table-hover table-sm"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier") // sets the font style
            .html(function(d) { return d.value; });
    
    return table;
}

// render the table
 var peopleTable = tabulate(data, ["created", "reading"]);
 

});
