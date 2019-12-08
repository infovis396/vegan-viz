const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');


class DietsD3Component extends D3Component {

  initialize(node, props) {
    const { dietgraph } = props;
    console.log(dietgraph)
    const canvas = d3.select(node).append('canvas').node();
    const context = canvas.getContext("2d");
    const width = node.getBoundingClientRect().width;
    const height = width * 0.9;
    canvas.width = width;
    canvas.height = height;

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) { return d.id; }))
      .force("center", d3.forceCenter(width / 2, height / 2));

    var graph = dietgraph
    var self = this;

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);


    d3.select(canvas)
      .call(d3.drag()
        .container(canvas)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .append("text")
        .attr("r", 40)
        .attr("fill", "#000");

    function ticked() {
      context.clearRect(0, 0, width, height);

      context.beginPath();
      graph.links.forEach(drawLink);
      context.strokeStyle = "#aaa";
      context.stroke();

      context.beginPath();
      graph.nodes.forEach(drawNode);
      context.fillStyle = self.props.nodeColor;
      context.fill();
      context.strokeStyle = "#fff";
      context.stroke();
    }

    function dragsubject() {
      return simulation.find(d3.event.x, d3.event.y);
    }


    // self.tick = ticked;

    function dragstarted() {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if (!d3.event.active) simulation.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }

    function drawLink(d) {
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      context.moveTo(d.x + 3, d.y);
      context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    }

    function addCircle(d) {
      d.append("circle");
    }

  }

  update() {
    this.tick();
  }
}

DietsD3Component.defaultProps = {
  nodeColor: '#000'
};

module.exports = DietsD3Component;
