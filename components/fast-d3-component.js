const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 300;
const position = [50, 100, 150, 200]

// Animation: put them down one by one:
function fasttriggerTransitionDelay() {
  d3.selectAll("circle.b12")
    .transition()
    .duration(500)
    .attr("cy", 10 + Math.random() * 80)
    .delay(200)
    .transition()
    .duration(500)
    .attr("cy", 10 + Math.random() * 80)
    .on("end", fasttriggerTransitionDelay);
};

class FastD3Component extends D3Component {

  initialize(node, props) {
    // Position of the circles on the X axis

    const svg = this.svg = d3.select(node)  // This is where we put our vis
      .append("svg")
      .attr("width", 400)
      .attr("height", 100)

    // Add circles at the top
    svg.selectAll("myb12circles")
      .data(position)
      .enter()
      .append("circle")
      .attr("class", "b12")
      .attr("cx", function (d) { return d })
      .attr("cy", 20)
      .attr("r", 10)
      .attr("fill", "crimson")

    fasttriggerTransitionDelay()
  }

  update(props) {

    const { transition } = props;
    
  }
}

module.exports = FastD3Component;