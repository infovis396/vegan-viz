const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 300;
const dataset = [
  {
    "index": 0, "nutrient": "calcium", "value": 0,
    "squash": 0,
    "banana": 0,
    "potato": 0,
    "lentils": 0,
    "oj": 0,
    "pb": 1,
    "wheatbread": 3,
    "broccoli": 2,
    "spinach": 0,
    "soymilk": 30,
    "tofu": 14,
    "brownrice": 0
  },
  {
    "index": 1, "nutrient": "dietaryfiber", "value": 0,
    "squash": 18,
    "banana": 7,
    "potato": 10,
    "lentils": 40,
    "oj": 8,
    "pb": 5,
    "wheatbread": 5,
    "broccoli": 5,
    "spinach": 13,
    "soymilk": 0,
    "tofu": 0,
    "brownrice": 9
  },
  {
    "index": 2, "nutrient": "iron", "value": 0,
    "squash": 0,
    "banana": 0,
    "potato": 0,
    "lentils": 37,
    "oj": 0,
    "pb": 0,
    "wheatbread": 3,
    "broccoli": 0,
    "spinach": 75,
    "soymilk": 0,
    "tofu": 37,
    "brownrice": 12
  },
  {
    "index": 3, "nutrient": "magnesium", "value": 0,
    "squash": 15,
    "banana": 10,
    "potato": 0,
    "lentils": 0,
    "oj": 0,
    "pb": 11,
    "wheatbread": 0,
    "broccoli": 3,
    "spinach": 37,
    "soymilk": 0,
    "tofu": 15,
    "brownrice": 20
  },
  {
    "index": 4, "nutrient": "potassium", "value": 0,
    "squash": 14,
    "banana": 9,
    "potato": 13,
    "lentils": 15,
    "oj": 10,
    "pb": 2,
    "wheatbread": 2,
    "broccoli": 0,
    "spinach": 0,
    "soymilk": 6,
    "tofu": 0,
    "brownrice": 3
  },
  {
    "index": 5, "nutrient": "protein", "value": 0,
    "squash": 4,
    "banana": 2,
    "potato": 3,
    "lentils": 32,
    "oj": 0,
    "pb": 14,
    "wheatbread": 9,
    "broccoli": 3,
    "spinach": 0,
    "soymilk": 12,
    "tofu": 21,
    "brownrice": 9
  },
  {
    "index": 6, "nutrient": "vitaminb12", "value": 0,
    "squash": 0,
    "banana": 0,
    "potato": 0,
    "lentils": 0,
    "oj": 0,
    "pb": 0,
    "wheatbread": 0,
    "broccoli": 0,
    "spinach": 0,
    "soymilk": 0,
    "tofu": 0,
    "brownrice": 0
  },
  {
    "index": 7, "nutrient": "vitaminc", "value": 0,
    "squash": 50,
    "banana": 10,
    "potato": 20,
    "lentils": 0,
    "oj": 71,
    "pb": 0,
    "wheatbread": 0,
    "broccoli": 43,
    "spinach": 10,
    "soymilk": 0,
    "tofu": 0,
    "brownrice": 0
  }
]
var full_height = 600;
var full_width = 300;
var margin = { top: 30, right: 20, bottom: 30, left: 50 },
  canvas_width = 600 - margin.left - margin.right,
  canvas_height = 300 - margin.top - margin.bottom;

// Maps domain to range (e.g. "A" to 0, "B" to 1)
var xScale = d3.scaleBand()  // ordinal data is usually categories (e.g. "A")
  .domain(["calcium", "dietaryfiber", "iron", "magnesium", "potassium", "protein", "vitaminb12", "vitaminc"])  // set ordinal's input domain
  .rangeRound([0, canvas_width])
  .padding(0.1); // output range snaps to nearest pixel boundaries, puts spacing
// basically rangeBands() automatically calculates widthsc

var yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, canvas_height]);

class CustomD3Component extends D3Component {

  initialize(node, props) {

    // Setup settings for graphic
    //var canvas_width = 500;
    //var canvas_height = 250;


    // Create SVG element
    const svg = this.svg = d3.select(node)  // This is where we put our vis
      .append("svg")
      .attr("width", canvas_width + margin.left + margin.right)
      .attr("height", canvas_height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var xaxisScale = d3.scaleBand()  // ordinal data is usually categories (e.g. "A")
      .domain(["Calcium", "Dietaryfiber", "Iron", "Magnesium", "Potassium", "Protein", "Vitamin B12", "VitaminC"])  // set ordinal's input domain
      .rangeRound([0, canvas_width])
      .padding(0.1);
    var yaxisScale = d3.scaleLinear()
      .domain([100, 0])
      .range([0, canvas_height]);
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + canvas_height + ")")
      .call(d3.axisBottom(xaxisScale));
    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yaxisScale));
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left + 3))
      .attr("x", 0 - (canvas_height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-weight", "bold")
      .text("Percent DRI");
    svg.append("text")
      .attr("y", canvas_height + margin.bottom)
      .attr("x", canvas_width / 2)
      .attr("dx", "1em")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-weight", "bold")
      .text("Nutrients");

    // Create Bars
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")  // Add rect svg, can also be say circle
      .attr("class", "bars")
      .attr("x", function (d, i) {
        return xScale(d.nutrient); // Start graphing at X
      })
      .attr("y", function (d) {  // Start graphing at Y
        return canvas_height - yScale(d.value); // Y naturally goes top to bottom, so flip
      })
      .attr("width", canvas_width / 8 - 2)  // Width of the bar
      .attr("height", function (d) {
        return yScale(d.value);   // Height of each bar
      })
      .attr("fill", "grey") // Color
      .on("mouseover", function (d) {  // Create tooltip on mouseover
        var xPosition = parseFloat(d3.select(this).attr("x"));
        var yPosition = parseFloat(d3.select(this).attr("y")) + canvas_height / 2;
        // parseFloat means that even if result is a string, interpret as a float

        // Update the tooltip position and value
        d3.select("#tooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px")
          .select("#value")
          .text(d.value)

        d3.select("#tooltip").classed("hidden", false);  // Show the tooltip
      })
      .on("mouseout", function () {  // 'Destroy' tooltip on mouseout
        d3.select("#tooltip").classed("hidden", true);  // Hide the tooltip
      });
  

    svg.selectAll("rectangles")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("y", -30)
      .attr("width", 600)
      .attr("height", 30)
      .attr("fill", "white");
    // Create Text Labels
    svg.selectAll("mytext")
      .data(dataset)
      .enter()
      .append("text")
      .text(function (d) {
        return d.value; // Value in array is the text
      })
      .attr("class", "numbers")
      .attr("x", function (d, i) {
        return xScale(d.nutrient) + 30;
      })
      .attr("y", function (d) {
        return canvas_height - yScale(d.value) - 5;
      })
      .attr("font-family", "sans-serif") // Change text font
      .attr("font-size", "14px") // Font size
      .attr("text-anchor", "middle")
      .attr("opacity", 0) // Align to middle  // Color of font
  }

  update(props) {

    var yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, canvas_height]);

    const { food, count } = props;

    if (`${food}` == "squash") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.squash;
      });
    } else if (`${food}` == "banana") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.banana;
      });
    } else if (`${food}` == "potato") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.potato
      });
    } else if (`${food}` == "lentils") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.lentils
      });
    } else if (`${food}` == "oj") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.oj
      });
    } else if (`${food}` == "pb") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.pb
      });
    } else if (`${food}` == "wheatbread") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.wheatbread
      });
    } else if (`${food}` == "broccoli") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.broccoli
      });
    } else if (`${food}` == "spinach") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.spinach
      });
    } else if (`${food}` == "tofu") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.tofu
      });
    } else if (`${food}` == "soymilk") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.soymilk
      });
    } else if (`${food}` == "brownrice") {
      dataset.forEach(function (d, i) {
        d.value = d.value + d.wheatbread
      });
    } else {
      dataset.forEach(function (d, i) {
        d.value = 0
      });
    }
    // Update Bars
    this.svg.selectAll("rect.bars")
      .data(dataset)  // Update with new data
      .transition()  // Transition from old to new
      .delay(function (d, i) {
        return i / 8 * 500;  // Dynamic delay (each item delays a little longer)
      })
      //.delay(200)  // Wait in ms before animation (static)
      .duration(500)  // Transition time - default 250ms
      //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
      .attr("y", function (d) {
        return canvas_height - yScale(d.value);
      })
      .attr("height", function (d) {
        return yScale(d.value);
      })
      .attr("fill", function (d) {
        if (d.value < 100) {
          return "grey"
        } else {
          return "olivedrab"
        }
      });  // redraw
    this.svg.selectAll("text.numbers")
        .data(dataset)
        .transition()  // Transition from old to new
        // .delay(function (d, i) {
        //   return i / dataset.length * 500;  // Dynamic delay (each item delays a little longer)
        // })
        //.delay(200)  // Wait in ms before animation
        .duration(1000)  // Transition time - changed from default 250ms
        //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
        .text(function (d) {
          return d.value + "%";
        })
        .attr("x", function (d, i) {
          return xScale(d.nutrient) + 30;
        })
        .attr("y", function (d) {
          if (d.value < 100) {
            return canvas_height - yScale(d.value) - 5;
          } else {
            return canvas_height - yScale(100) - 5;
          }
        })
      .attr("opacity", 1) ;
  }
}

module.exports = CustomD3Component;