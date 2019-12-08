const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

class LandEmissions extends D3Component {

  initialize(node, props) {
    // Setup settings for graphic
    var full_width = 800;
    var full_height = this.full_height = 1200;
    var radius = 200 // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var margin = { top: 50, right: 20, bottom: 30, left: 50 },
      width = 1200 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // Create SVG element
    const svg = this.svg = d3.select(node)  // This is where we put our vis
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const pie_g = this.pie_g = svg
                              .append("g")
                              .attr("transform", "translate(" + 650 + "," + 1200 + ")");

    const land_g = this.land_g = svg
                                    .append("g")
                                    .attr("transform", "translate(" + 450 + "," + 1200 + ")");

    var dataset = {"Agriculture":50, "Forest": 37, "Urban": 1, "Other": 13}

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
          return "translate(-190, -150)";
        }
        else {
        return "translate(" + x_position + "," + y_position + ")";
      }})
      .style("text-anchor", "middle")
      .style("font-size", 11)
      .style("font-weight", "500")
      .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

    pie_g
      .append('rect')
      .attr("width", 25)
      .attr("height", 1)
      .attr("x", -220)
      .attr("y", 10)
      .attr("transform", "rotate(45)")
      // transition the pie chart into screen
      // pie_g
      // .transition()
      // .duration(5000)
      // .delay(1000)
      // .attr("transform", "translate(" + 650 + "," + (radius+100) + ")");
      // transition the pie chart into screen
      pie_g
      .transition()
      .duration(5000)
      .delay(1000)
      .attr("transform", "translate(" + 650 + "," + 350 + ")");

    }

    update(props) {

      const { land_state } = props;

      if (`${land_state}` == 1){
        console.log(land_state)

        const cow_posn_1 = [
          {
            "x": 150,
            "y": 0
          },
          {
            "x": 200,
            "y": 0
          },
          {
            "x": 100,
            "y": 30
          },
          {
            "x": 150,
            "y": 30
          },
          {
            "x": 200,
            "y": 30
          },
          {
            "x": 250,
            "y": 30
          },
          {
            "x": 50,
            "y": 70
          },
          {
            "x": 100,
            "y": 70
          },
          {
            "x": 150,
            "y": 70
          },
          {
            "x": 200,
            "y": 70
          },
          {
            "x": 250,
            "y": 70
          },
          {
            "x": 300,
            "y": 70
          }
        ]

        const wheat_posn_1 = [
          {
            "x": 75,
            "y": 0
          },
          {
            "x": 120,
            "y": 0
          },
          {
            "x": 250,
            "y": -10
          },
          {
            "x": 0,
            "y": 30
          },
          {
            "x": 50,
            "y": 30
          },
          {
            "x": 20,
            "y": 50
          },
          {
            "x": 350,
            "y": 30
          },
          {
            "x": 300,
            "y": 30
          },
          // {
          //   "x": 10,
          //   "y": 70
          // },
          {
            "x": 110,
            "y": 100
          },
          {
            "x": 70,
            "y": 100
          },
          {
            "x": 150,
            "y": 100
          },
          {
            "x": 200,
            "y": 105
          },
          {
            "x": 250,
            "y": 100
          },
          {
            "x": 305,
            "y": 90
          },
          {
            "x": 340,
            "y": 70
          },

        ]

        const wheat_posn_2 = [
          {
            "x": 80,
            "y": 10
          },
          {
            "x": 130,
            "y": 20
          },
          {
            "x": 175,
            "y": 30
          },
          {
            "x": 0,
            "y": 30
          },
          {
            "x": 50,
            "y": 30
          },
          {
            "x": 20,
            "y": 60
          },
          {
            "x": 230,
            "y": 40
          },
          {
            "x": 150,
            "y": 50
          },
          // {
          //   "x": 10,
          //   "y": 70
          // },
          {
            "x": 105,
            "y": 70
          },
          {
            "x": 65,
            "y": 80
          },
          {
            "x": 170,
            "y": 80
          },
          {
            "x": 200,
            "y": 70
          },
          {
            "x": 250,
            "y": 60
          },
          {
            "x": 130,
            "y": 85
          },
          {
            "x": 100,
            "y": 30
          },

        ]

        // anniamte pie chart out of screen
        this.pie_g
            .transition()
            .duration(2000)
            .attr("transform", "translate(" + 650 + "," + -500 + ")");

      this.land_g
            .transition()
            .duration(2000)
            .attr("transform", "translate(" + 450 + "," + 100 + ")");


        // animal prducts / non vegans land usage
        var animal_land = this.land_g.append("g")
                            .attr("width", "400")
                            .attr("height", "300")
                            .attr("fill", "white")
                            .attr("class", "animal_land")

        var animal_land_circle = animal_land.append("ellipse")
                      .attr("cx", 200)
                      .attr("cy", 150)
                      .attr("rx", 200)
                      .attr("ry", 75)
                      .style("fill", "#31a354")
                      // .transition()
                      // .duration(3000)
                      // .attr("cx", 200)
          // adding cows
          animal_land.selectAll("cows")
              .data(cow_posn_1)
              .enter()
              .append("svg:image")
              .attr("xlink:href", "/static/images/cow.png")
              .attr("x", function(d){
                return d.x;
              })
              .attr("y", function(d){
                return d.y;
              })
              .attr("width", "50")
              .attr("height", "175")
              .style("opacity", 0)
              .attr("class", "my_cows")

        // annimating cows
        animal_land.selectAll("image.my_cows")
          .data([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
          .transition()
          .duration(0)
          .ease(d3.easeLinear)
          .delay(function(i){
            return i*100 + 3000;
          })
          .style("opacity", 1);

          // adding wheat to left circle
          animal_land.selectAll("wheat")
              .data(wheat_posn_1)
              .enter()
              .append("svg:image")
              .attr("xlink:href", "/static/images/crop.png")
              .attr("x", function(d){
                return d.x;
              })
              .attr("y", function(d){
                return d.y;
              })
              .attr("width", "50")
              .attr("height", "175")
              .style("opacity", 0)
              .attr("class", "my_wheat")

        // annimating wheat
        animal_land.selectAll("image.my_wheat")
          .data([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
          .transition()
          .duration(0)
          .ease(d3.easeLinear)
          .delay(function(i){
            return i*150 + 3000;
          })
          .style("opacity", 1);


        // vegan land use side


        var plant_land = this.land_g.append("g")
                            .attr("transform","translate(50,350)")
                            .attr("width", "400")
                            .attr("height", "300")
                            .attr("fill", "white")
                            .attr("class", "plant_land")

        var plant_land_circle = plant_land.append("ellipse")
                            .attr("cx", 150)
                            .attr("cy", 150)
                            .attr("rx", 150)
                            .attr("ry", 50)
                            .style("fill", "#31a354")
                            // .transition()
                            // .duration(3000)
                            // .attr("cx", 150)

          // adding wheat to left circle
          plant_land.selectAll("wheat")
              .data(wheat_posn_2)
              .enter()
              .append("svg:image")
              .attr("xlink:href", "/static/images/crop.png")
              .attr("x", function(d){
                return d.x;
              })
              .attr("y", function(d){
                                    return d.y;
                                  })
                                  .attr("width", "50")
                                  .attr("height", "175")
                                  .style("opacity", 0)
                                  .attr("class", "my_wheat")

         var  wheat_anni_data = [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
          // annimating wheat
          plant_land.selectAll("image.my_wheat")
            .data(wheat_anni_data)
            .transition()
            .duration(0)
            .ease(d3.easeLinear)
            .delay(function(i){
              return i*150;
            })
            .style("opacity", 1);


        animal_land.append("text")
            .attr("x", 125)
            .attr("y", 45)
            .text("Standard diet")
            .style("font-weight", "bolder")
            .style("fill", "#484848	")
            .style("font-size", 24)
            .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

        plant_land.append("text")
            .attr("x", 85)
            .attr("y", 65)
            .text("Vegan diet")
            .style("font-weight", "bolder")
            .style("fill", "#484848	")
            .style("font-size", 24)
            .style("font-family", "font-family: Arial, Helvetica Neue, Helvetica, sans-serif;")

        // add images of stats
        animal_land.append("svg:image")
            .attr("xlink:href", "/static/images/omnivore_land.png")
            .attr("x", 150)
            .attr("y", 220)
            .attr("width", "100")
            .attr("height", "100")
            .attr("style", "opacity: 0")
            .transition()
            .delay(5000)
            .duration(2000)
            .attr("style", "opacity: 1")

        plant_land.append("svg:image")
            .attr("xlink:href", "/static/images/vegan_land.png")
            .attr("x", 100)
            .attr("y", 195)
            .attr("width", "100")
            .attr("height", "100")
            .attr("style", "opacity: 0")
            .transition()
            .delay(5000)
            .duration(2000)
            .attr("style", "opacity: 1")

}

  else if (`${land_state}` == 0){

    // bring pie back in
    this.pie_g
        .transition()
        .duration(2000)
        .attr("transform", "translate(" + 650 + "," + 350 + ")");

    // remove worlds
    this.land_g
          .transition()
          .duration(2000)
          .attr("transform", "translate(" + 450 + "," + 1200 + ")");

    //

    this.svg.selectAll(".animal_land")
        .transition()
        .delay(2000)
        .remove()

    this.svg.selectAll(".plant_land")
        .transition()
        .delay(2000)
        .remove()

      }
  }

}


module.exports = LandEmissions;
