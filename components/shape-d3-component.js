const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 300;
const position = [50, 100, 150, 200, 250, 300, 350]

function circle(coordinates) {
  var circle = [],
    length = 0,
    lengths = [length],
    polygon = d3.geom.polygon(coordinates),
    p0 = coordinates[0],
    p1,
    x,
    y,
    i = 0,
    n = coordinates.length;

  // Compute the distances of each coordinate.
  while (++i < n) {
    p1 = coordinates[i];
    x = p1[0] - p0[0];
    y = p1[1] - p0[1];
    lengths.push(length += Math.sqrt(x * x + y * y));
    p0 = p1;
  }

  var area = polygon.area(),
    radius = Math.sqrt(Math.abs(area) / Math.PI),
    centroid = polygon.centroid(-1 / (6 * area)),
    angleOffset = -Math.PI / 2, // TODO compute automatically
    angle,
    i = -1,
    k = 2 * Math.PI / lengths[lengths.length - 1];

  // Compute points along the circle’s circumference at equivalent distances.
  while (++i < n) {
    angle = angleOffset + lengths[i] * k;
    circle.push([
      centroid[0] + radius * Math.cos(angle),
      centroid[1] + radius * Math.sin(angle)
    ]);
  }

  return circle;
}

function loop() {
  path
    .attr("d", d0)
    .transition()
    .duration(5000)
    .attr("d", d1)
    .transition()
    .delay(5000)
    .attr("d", d0)
    .each("end", loop);
}

class ShapeD3Component extends D3Component {

  initialize(node, props) {
    // Position of the circles on the X axis

    var width = 960,
      height = 500;

    const svg = this.svg = d3.select(node)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    d3.json("california.json", function (polygon) {
      var coordinates0 = polygon.coordinates[0],
        coordinates1 = circle(coordinates0),
        path = svg.append("path"),
        d0 = "M" + coordinates0.join("L") + "Z",
        d1 = "M" + coordinates1.join("L") + "Z";

      loop();
    });

  }

  update(props) {

    // const { transition } = props;

    // oppositeTransitionDelay();
    // while (true) {
    //   triggerTransitionDelay();
    //   oppositeTransitionDelay();
    // }
  }
}

module.exports = ShapeD3Component;