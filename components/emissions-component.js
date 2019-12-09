const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

// const dataset = [{"food":73, "industrial":24, "household":3}];

class EmissionsComponent extends D3Component {

  initialize(node, props) {
    // add the pie chart first

    var dataset = {"Agriculture":11, "Energy":72, "Industry":6,"Forestry":6, "Other":5}
        // Setup settings for graphic
    var full_width = 800;
    var full_height = this.full_height = 1200;
    var radius = 200 // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var margin = { top: 50, right: 20, bottom: 30, left: 50 },
      canvas_width = 1200 - margin.left - margin.right,
      canvas_height = 800 - margin.top - margin.bottom;

    // Create SVG element
    const svg = this.svg = d3.select(node)  // This is where we put our vis
      .append("svg")
      .attr("width", canvas_width + margin.left + margin.right)
      .attr("height", canvas_height + margin.top + margin.bottom);

    const pie_g = this.pie_g = svg
                              .append("g")
                              .attr("transform", "translate(" + 650 + "," + 1200 + ")");

    const worlds_g = this.worlds_g = svg
                                    .append("g")
                                    .attr("transform", "translate(" + 450 + "," + 1200 + ")");

    var pie = d3.pie()
    	.value(function(d) {return d.value; })

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
      	.style("opacity", 1)

    var offset_scale = d3.scaleOrdinal()
                        .domain(["Industry", "Forestry", "Waste", "Other"])
                        .range([40,60,75,85])
  	// Now add the annotation. Use the centroid method to get the best coordinates
    pie_g
      .append("text")
      .text("Global Manmade Greenhouse Gas Emissions by Sector")
      .attr("x", -200)
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
        if (d.data.value < 7 ){
          return "translate(" + x_position + "," + y_position + ")," + "rotate(" + offset_scale(d.data.key) + ")";
        }
        else {
        return "translate(" + x_position + "," + y_position + ")";
      }})
    	.style("text-anchor", "middle")
    	.style("font-size", 11)
      .style("font-weight", "500")
      .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

      // transition the pie chart into screen
      pie_g
      .transition()
      .duration(5000)
      .delay(1000)
      .attr("transform", "translate(" + 650 + "," + 350 + ")");

    }

  update(props) {
    // if state = 1 --> annimate globes in
    // if state = 0 --> remove globe
    const { ghg_state, emissions_globe} = props;

    console.log(ghg_state)

    if (`${ghg_state}` == 1) {

      // undo annimation
      // this.svg.selectAll(".curr_globe")
      //         .transition()
      //         .duration(1000)
      //         .attr("style", "fill-opacity:0;fill:grey")
      //
      // this.svg.selectAll(".updated_globe")
      //           .transition()
      //           .duration(1000)
      //           .attr("style", "fill-opacity:0;fill:grey")

      // anniamte pie chart out of screen
      this.pie_g
          .transition()
          .duration(2000)
          .attr("transform", "translate(" + 650 + "," + -300 + ")");

      this.worlds_g
            .transition()
            .duration(2000)
            .attr("transform", "translate(" + 450 + "," + 300 + ")");


      var margin = {top: 80, right: 80, bottom: 80, left: 80},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      // const svg = this.svg = d3.select(node).append("svg")
      //     .attr("width", width + margin.left + margin.right)
      //     .attr("height", height + margin.top + margin.bottom)
      //   .append("g")
      //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      var current_globe = this.worlds_g.append("g")
                              .attr("width", "100")
                              .attr("height", "100")
                              .attr("fill", "white")
                              .attr("class", "curr_globe_svg")

      console.log("appending world image")
      current_globe.append("svg:image")
          .attr("xlink:href", "static/images/world.png")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", "175")
          .attr("height", "175")
          // .transition()
          // .duration(2000)
          // .attr("y", 0)
      console.log("appending circle")
      current_globe.append("circle")
          .attr("cx", 87.5)
          .attr("cy", 87.5)
          .attr("r", 100)
          .attr("style", "fill-opacity:0;fill:grey")
          .attr("class", "curr_globe")


      var updated_globe = this.worlds_g.append("g")
                              .attr("transform","translate(250,0)")
                              .attr("width", "100")
                              .attr("height", "100")
                              .attr("fill", "white")
                              .attr("class", "updated_globe_svg")

      updated_globe.append("svg:image")
          .attr("xlink:href", "static/images/world.png")
          .attr("x", 0)
          .attr("y", 0)
          .attr("r", 100)
          .attr("width", "175")
          .attr("height", "175")
          // .transition()
          // .duration(2000)
          // .attr("y", 0)

      updated_globe.append("circle")
          .attr("cx", 87.5)
          .attr("cy", 87.5)
          .attr("r", 100)
          .attr("style", "fill-opacity:0;fill:grey")
          .attr("class", "updated_globe")

      console.log("annimating globe")

      // annimate globe
      var darkness = d3.scaleLinear()
                        .domain([50, 5000]) // min to max GHG emission values (max should be 100% vegans)
                        .range([0.40, 0.65])

      var current_globe_opacity = "fill-opacity:" + darkness(5000)
      var updated_globe_opacity = "fill-opacity:" + darkness(50)

      this.worlds_g.select(".curr_globe")
              .transition()
              .duration(3000)
              .delay(2000)
              .attr("style", "fill:black;" + current_globe_opacity)
              // .attr("style", current_globe_opacity)

      this.worlds_g.select(".updated_globe")
              .transition()
              .duration(3000)
              .delay(2000)
              .attr("style", "fill:grey;" + updated_globe_opacity)
              // .attr("style", updated_globe_opacity)

      current_globe.append("text")
          .attr("x", 20)
          .attr("y", -40)
          .text("Standard diet")
          .style("font-weight", "bolder")
          .style("fill", "#484848	")
          .style("font-size", 24)
          .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

      updated_globe.append("text")
          .attr("x", 30)
          .attr("y", -40)
          .text("Vegan diet")
          .style("font-weight", "bolder")
          .style("fill", "#484848	")
          .style("font-size", 24)
          .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

      current_globe.append("svg:image")
          .attr("xlink:href", "static/images/omnivore_co2.png")
          .attr("x", 50)
          .attr("y", 190)
          .attr("width", "100")
          .attr("height", "100")
          .attr("style", "opacity: 0")
          .transition()
          .delay(2000)
          .duration(2000)
          .attr("style", "opacity: 1")


      updated_globe.append("svg:image")
          .attr("xlink:href", "static/images/vegan_co2.png")
          .attr("x", 50)
          .attr("y", 190)
          .attr("width", "100")
          .attr("height", "100")
          .attr("style", "opacity: 0")
          .transition()
          .delay(2000)
          .duration(2000)
          .attr("style", "opacity: 1")
          .attr("class", "vegan_co2_image")

      this.worlds_g.select(".curr_globe")
          .on("mouseover", function(d) {
            console.log("hovering on image")
            })


    }

    else if (`${ghg_state}` == 0) {

      // this.svg.select(".curr_globe")
      //     .remove()

      // bring pie back in
      this.pie_g
          .transition()
          .duration(2000)
          .attr("transform", "translate(" + 650 + "," + 350 + ")");

      // move worlds out of way
      this.worlds_g
            .transition()
            .duration(2000)
            .attr("transform", "translate(" + 450 + "," + 1200 + ")");

      // remove worlds
      this.worlds_g.selectAll(".curr_globe_svg")
          .transition()
          .delay(2000)
          .remove()


      this.worlds_g.selectAll(".updated_globe_svg")
          .transition()
          .delay(2000)
          .remove()

      console.log("removed svg")

    }

  }
}


module.exports = EmissionsComponent;
