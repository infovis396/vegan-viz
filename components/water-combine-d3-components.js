const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const dataset = [{"food":73, "industrial":24, "household":3}];


class WaterCombineD3Components extends D3Component {

  initialize(node, props) {
    //data
    var dataset = {"Agriculture":73, "Household":3, "Industry":24}

    // Setup settings for graphic
    var full_width = 600;
    var full_height = this.full_height = 1200;
    var radius = 200 // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
      canvas_width = 1200 - margin.left - margin.right,
      canvas_height = 600 - margin.top - margin.bottom;

    // Create SVG element
    const svg = this.svg = d3.select(node)  // This is where we put our vis
      .append("svg")
      .attr("width", canvas_width + margin.left + margin.right)
      .attr("height", canvas_height + margin.top + margin.bottom);
    const pie_g = this.pie_g = svg
                              .append("g")
                              .attr("transform", "translate(" + 650 + "," + -500 + ")");
    const glass_g = this.glass_g = svg
                              .append("g")
                              .attr("transform", "translate(" + 600 + "," + 1200 + ")");
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(null)

    var data_ready = pie(d3.entries(dataset))

    var keys = d3.map(data_ready, function(d){ return d.data.key})

    var labels = ["Agriculture", "Energy", "Industry", "Waste", "Forestry", "Other"]

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(100)
        .outerRadius(radius)

    var color = d3.scaleOrdinal()
      .domain(keys)
      .range(["#8dd3c7","#ffffb3", "#fdb462", "#bebada", "#fb8072", "#80b1d3"])

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    pie_g
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr("stroke", "black")
        .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    var offset_scale = d3.scaleOrdinal()
                        .domain(["Household"])
                        .range([85])
    // Now add the annotation. Use the centroid method to get the best coordinates
    pie_g
      .append("text")
      .text("Global Water Use by Sector")
      .attr("x", -100)
      .attr("y", -225)
      .style("font-weight", "bolder")
      .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

    pie_g
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return d.data.key + " " + d.data.value + "%" })
      .attr("transform", function(d) {
        var x_position = arcGenerator.centroid(d)[0]
        var y_position = arcGenerator.centroid(d)[1]
        // if (d.data.value < 7 ){
        //   return "translate(" + x_position + "," + y_position + ")," + "rotate(" + offset_scale(d.data.key) + ")";
        // }
        // else {
        return "translate(" + x_position + "," + y_position + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 11)
      .style("font-weight", "500")
      .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

      pie_g
      .transition()
      .duration(5000)
      .delay(1000)
      .attr("transform", "translate(" + 650 + "," + 350 + ")");


                              }

  update(props) {
    const { statetrack } = props;
    console.log(`${statetrack}`)

    if (`${statetrack}` == 1) {

      // anniamte pie chart out of screen
      this.pie_g
          .transition()
          .duration(2000)
          .attr("transform", "translate(" + 650 + "," + -500 + ")");

    this.glass_g
          .transition()
          .duration(2000)
          .attr("transform", "translate(" + 600 + "," + 0 + ")");

    //Glass 1
    this.glass_g.append("rect")
      .attr("x", -150)
      .attr("y", 600)
      .attr("width", 150)
      .attr("height", 250)
      .attr("fill", "white")
      .attr("stroke", "grey")
      .attr("stroke-width", 10)
      // .attr("opacity", 0.2)
      .transition()
      .attr("y", 140)
      .duration(1000);
    this.glass_g.append("ellipse")
      .attr("cx", -75)
      .attr("cy", 600)
      .attr("rx", 80)
      .attr("ry", 10)
      .attr("fill", "white")
      .attr("stroke", "grey")
      .attr("stroke-width", 10)
      .transition()
      .attr("cy", 137)
      .duration(1000);


    // Glass 2
    this.glass_g.append("rect")
      .attr("x", 100)
      .attr("y", 600)
      .attr("width", 150)
      .attr("height", 250)
      .attr("fill", "white")
      .attr("stroke", "grey")
      .attr("stroke-width", 10)
      // .attr("opacity", 0.2)
      .transition()
      .attr("y", 140)
      .duration(1000);
    this.glass_g.append("ellipse")
      .attr("cx", 175)
      .attr("cy", 600)
      .attr("rx", 80)
      .attr("ry", 10)
      .attr("fill", "white")
      .attr("stroke", "grey")
      .attr("stroke-width", 10)
      .transition()
      .attr("cy", 137)
      .duration(1000);

    //Water 1
    this.glass_g.append("rect")
      .attr("x", -145)
      .attr("y", this.full_height)
      .attr("width", 140)
      .attr("height", 230)
      .attr("fill", "#66B2FF")
      .attr("class", "waste")
      .transition()
      .attr("y", 155)
      .delay(500)
      .duration(3000);
    //Water 2
    this.glass_g.append("rect")
      .attr("x", 105)
      .attr("y", this.full_height)
      .attr("width", 140)
      .attr("height", 92)
      .attr("fill", "#66B2FF")
      .attr("class", "waste")
      .transition()
      .delay(500)
      .attr("y", 293)
      .duration(3000);

    //White Rectangle
    this.glass_g.append("rect")
      .attr("x", -200)
      .attr("y", 855)
      .attr("width", 500)
      .attr("height", 300)
      .attr("fill", "#EBFAFF")
      .transition()
      .delay(5)
      .attr("y", 395)
      .duration(1000);

    this.glass_g.append("text")
        .attr("x", -145)
        .attr("y", 100)
        .text("Standard diet")
        .style("font-weight", "bolder")
        .style("fill", "#484848")
        .style("font-size", 24)
        .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")


    this.glass_g.append("text")
        .attr("x", 115)
        .attr("y", 100)
        .text("Vegan diet")
        .style("font-weight", "bolder")
        .style("fill", "#484848")
        .style("font-size", 24)
        .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")


    this.glass_g.append("svg:image")
      .attr("xlink:href", "static/images/omnivore_water.png")
      .attr("x", -120)
      .attr("y", 380)
      .attr("width", "100")
      .attr("height", "100")
      .attr("style", "opacity: 0")
      .transition()
      .delay(2000)
      .duration(2000)
      .attr("style", "opacity: 1")

    this.glass_g.append("svg:image")
      .attr("xlink:href", "static/images/vegan_water.png")
      .attr("x", 125)
      .attr("y", 385)
      .attr("width", "100")
      .attr("height", "100")
      .attr("style", "opacity: 0")
      .transition()
      .delay(2000)
      .duration(2000)
      .attr("style", "opacity: 1")


    }

    else if (`${statetrack}` == 0){
      // bring pie back in
      this.pie_g
          .transition()
          .duration(2000)
          .attr("transform", "translate(" + 650 + "," + 350 + ")");

      // remove worlds
      this.glass_g
            .transition()
            .duration(2000)
            .attr("transform", "translate(" + 600 + "," + 1200 + ")");

    }
  }
}


module.exports = WaterCombineD3Components;
