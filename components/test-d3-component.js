const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 300;
const position = [50, 100, 150, 200]

// Animation: put them down one by one:
function triggerTransitionDelay() {
  d3.selectAll("ellipse.b12")
    .transition()
    .duration(2000)
    .attr("cy", 10 + Math.random() * 80)
    .delay(function (i) { return (i * 10) })
    .transition()
    .duration(2000)
    .attr("cy", 10 + Math.random() * 80)
    .delay(function (i) { return (i * 10) })
    .on("end", triggerTransitionDelay);
};

class TestD3Component extends D3Component {

  initialize(node, props) {
    // Position of the circles on the X axis

    const svg = this.svg = d3.select(node)  // This is where we put our vis
      .append("svg")
      .attr("width", 400)
      .attr("height", 100)

    // Add circles at the top
    svg.selectAll("myb12ellipses")
      .data(position)
      .enter()
      .append("ellipse")
      .attr("class", "b12")
      .attr("cx", function (d) { return d })
      .attr("cy", 20)
      .attr("rx", 10)
      .attr("ry", 5)
      .attr("fill", "indianred")

    triggerTransitionDelay()
  }

  update(props) {

    const { transition } = props;
    
  }
}

module.exports = TestD3Component;