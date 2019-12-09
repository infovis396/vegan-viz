const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const drag = require('d3-drag');

const size = 300;

// const position = [[500, 600], [500, 600], [500, 600], [500, 600], ]
const food_position_mapping_origonal = [
  { "food": "spinach", "name": "Spinach", "position": [50, 340], "diet": "vegan" },
  { "food": "grapes", "name": "Grapes","position": [150, 340], "diet": "vegan" },
  { "food": "pear", "name": "Pears", "position": [250, 340], "diet": "vegan" },
  { "food": "broccoli", "name": "Broccoli","position": [350, 340], "diet": "vegan" },
  { "food": "butternut-squash", "name": "Squash","position": [450, 340], "diet": "vegan" },
  // { "food": "banana", "position": [550, 340] },
  { "food": "loaf", "name": "Bread","position": [100, 260], "diet": "vegan" },
  { "food": "potato", "name": "Potatoes","position": [200, 260], "diet": "vegan" },
  // { "food": "rice", "position": [650, 335], "diet": "substitution" },
  { "food": "prohibition", "name": "Pasta", "position": [300, 260], "diet": "redo" },
  { "food": "spaguetti", "name": "Pasta","position": [300, 260], "diet": "nonvegan" },
  { "food": "cereal", "name": "Cereal","position": [400, 260], "diet": "vegan" },
  // { "food": "wheat", "position": [500, 260] },
  // { "food": "soy-milk", "position": [650, 235], "diet": "substitution" },
  { "food": "prohibition","name": "Milk", "position": [150, 180], "diet": "redo" },
  { "food": "milk", "name": "Milk","position": [150, 180], "diet": "nonvegan" },
  // { "food": "almond-milk", "position": [650, 235], "diet": "substitution" },
  { "food": "prohibition", "name": "yogurt","position": [250, 180], "diet": "redo" },
  { "food": "yogurt", "name": "Yogurt","position": [250, 180], "diet": "nonvegan" },
  // { "food": "coconut-drink", "position": [650, 235], "diet": "substitution" },
  { "food": "prohibition", "name": "Cheese","position": [350, 180], "diet": "redo" },
  { "food": "cheese", "name": "Cheese","position": [350, 180], "diet": "nonvegan" },
  // { "food": "soy-milk", "position": [450, 180] },
  // { "food": "tofu", "position": [650, 110], "diet": "substitution" },
  { "food": "prohibition", "name": "Meat","position": [200, 100], "diet": "redo" },
  { "food": "meat", "name": "Meat","position": [200, 100], "diet": "nonvegan" },
  // { "food": "pistachio", "position": [650, 110], "diet": "substitution" },
  { "food": "prohibition", "name": "Fish","position": [300, 100], "diet": "redo" },
  { "food": "fish", "name": "Fish","position": [300, 100], "diet": "nonvegan"  },
  // { "food": "tofu", "position": [400, 100]  },
  // { "food": "olive-oil", "position": [650, 35], "diet": "substitution" },
  { "food": "prohibition", "name": "Butter","position": [250, 20], "diet": "redo" },
  { "food": "butter", "name": "Butter","position": [250, 20], "diet": "nonvegan"  },
]
const food_position_mapping = [
  { "food": "spinach", "name": "Spinach", "position": [50, 340], "diet": "vegan" },
  { "food": "grapes", "name": "Grapes","position": [150, 340], "diet": "vegan" },
  { "food": "pear", "name": "Pears", "position": [250, 340], "diet": "vegan" },
  { "food": "broccoli", "name": "Broccoli","position": [350, 340], "diet": "vegan" },
  { "food": "butternut-squash", "name": "Squash","position": [450, 340], "diet": "vegan" },
  // { "food": "banana", "position": [550, 340] },
  { "food": "loaf", "name": "Bread","position": [100, 260], "diet": "vegan" },
  { "food": "potato", "name": "Potatoes","position": [200, 260], "diet": "vegan" },
  // { "food": "rice", "position": [650, 335], "diet": "substitution" },
  { "food": "prohibition", "name": "Pasta", "position": [300, 260], "diet": "redo" },
  { "food": "spaguetti", "name": "Pasta","position": [300, 260], "diet": "nonvegan" },
  { "food": "cereal", "name": "Cereal","position": [400, 260], "diet": "vegan" },
  // { "food": "wheat", "position": [500, 260] },
  // { "food": "soy-milk", "position": [650, 235], "diet": "substitution" },
  { "food": "prohibition","name": "Milk", "position": [150, 180], "diet": "redo" },
  { "food": "milk", "name": "Milk","position": [150, 180], "diet": "nonvegan" },
  // { "food": "almond-milk", "position": [650, 235], "diet": "substitution" },
  { "food": "prohibition", "name": "yogurt","position": [250, 180], "diet": "redo" },
  { "food": "yogurt", "name": "Yogurt","position": [250, 180], "diet": "nonvegan" },
  // { "food": "coconut-drink", "position": [650, 235], "diet": "substitution" },
  { "food": "prohibition", "name": "Cheese","position": [350, 180], "diet": "redo" },
  { "food": "cheese", "name": "Cheese","position": [350, 180], "diet": "nonvegan" },
  // { "food": "soy-milk", "position": [450, 180] },
  // { "food": "tofu", "position": [650, 110], "diet": "substitution" },
  { "food": "prohibition", "name": "Meat","position": [200, 100], "diet": "redo" },
  { "food": "meat", "name": "Meat","position": [200, 100], "diet": "nonvegan" },
  // { "food": "pistachio", "position": [650, 110], "diet": "substitution" },
  { "food": "prohibition", "name": "Fish","position": [300, 100], "diet": "redo" },
  { "food": "fish", "name": "Fish","position": [300, 100], "diet": "nonvegan"  },
  // { "food": "tofu", "position": [400, 100]  },
  // { "food": "olive-oil", "position": [650, 35], "diet": "substitution" },
  { "food": "prohibition", "name": "Butter","position": [250, 20], "diet": "redo" },
  { "food": "butter", "name": "Butter","position": [250, 20], "diet": "nonvegan"  },
]

const redo_position_mapping = [
  { "food": "spaguetti", "name": "Pasta","position": [300, 260], "diet": "nonvegan" },
  { "food": "milk", "name": "Milk","position": [150, 180], "diet": "nonvegan" },
  { "food": "yogurt", "name": "Yogurt","position": [250, 180], "diet": "nonvegan" },
  { "food": "cheese", "name": "Cheese","position": [350, 180], "diet": "nonvegan" },
  { "food": "meat", "name": "Meat","position": [200, 100], "diet": "nonvegan" },
  { "food": "fish", "name": "Fish","position": [300, 100], "diet": "nonvegan" },
  { "food": "butter", "name": "Butter","position": [250, 20], "diet": "nonvegan" },
]

const other_position_mapping = [
  { "food": "butter", "position": [250, 20], "diet": "nonvegan" },
  { "food": "fish", "position": [300, 100], "diet": "nonvegan" },
  { "food": "meat", "position": [200, 100], "diet": "nonvegan" },
  { "food": "cheese", "position": [350, 180], "diet": "nonvegan" },
  { "food": "yogurt", "position": [250, 180], "diet": "nonvegan" },
  { "food": "milk", "position": [150, 180], "diet": "nonvegan" },
  { "food": "spaguetti", "position": [300, 260], "diet": "nonvegan" }]

const sub_position_mapping = [
  { "food": "olive-oil", "name": "Olive Oil","position": [625, 35], "diet": "sub", "newposition": [250, 20] },
  { "food": "tofu", "name": "Tofu","position": [625, 90], "diet": "sub", "newposition": [300, 100]},
  { "food": "pistachio", "name": "Pistachio","position": [625, 130], "diet": "sub", "newposition": [200, 100]},
  { "food": "soy-milk", "name": "Soy Milk","position": [625, 195], "diet": "sub", "newposition": [350, 180]},
  { "food": "almond-milk", "name": "Almond Milk","position": [625, 235], "diet": "sub", "newposition": [250, 180] },
  { "food": "coconut-drink", "name": "Coconut Milk","position": [625, 275], "diet": "sub", "newposition": [150, 180]},
  { "food": "rice", "name": "Rice","position": [625, 335], "diet": "sub", "newposition": [300, 260]}]
const position = [335, 275, 235, 195, 130, 90, 35]
const subpos = [760, 760, 800, 760, 800, 840, 760]

const newtposition = [335, 275, 235, 195, 130, 90, 35]

// Show X's on restricted foods
function showRestrictions() {
  // hide previous tooltip
  d3.select(".tooltext")
      .style("opacity", 0)
  d3.select(".tooltip_rect")
      .style("opacity", 0)

  d3.selectAll("image.detectlabel")
    .attr("opacity", 1)
  d3.selectAll("image.substitution")
    .attr("opacity", 0);
  d3.selectAll("image.redo")
    .attr("opacity", 1);

  d3.selectAll("image.nonvegan")
    .data(position)
    .transition()
    .attr("opacity", .3)
    .delay(function (i) { return (i * 7) })

  // updating tooltips
  d3.selectAll("image.nonvegan")
    .data(redo_position_mapping)
    .on("mouseover", function(d){
      console.log(d)
      console.log("hovering non vegan food item", d.food)
      d3.select(".tooltip_div")
            .attr("transform","translate(" + d.position[0] + "," + d.position[1] + ")")
            .style("width", d.name.length * 11)
      d3.select(".tooltext")
              .style("opacity", 1)
              .text(d.name)
      d3.select(".tooltip_rect")
        .attr("x", 0)
        .attr("y", 0)
        .style("width", function(blah){
          if (d.name == "Spaghetti") {
            return 58;
          }
          else{
            return d.name.length * 8;
          }})
        .style("opacity", .9);
    });

};

function eliminateRestrictions() {
  // hide previous tooltip
  d3.select(".tooltext")
      .style("opacity", 0)
  d3.select(".tooltip_rect")
      .style("opacity", 0)

  d3.selectAll("image.eliminatelabel")
    .attr("opacity", 1);
  d3.selectAll("image.nonvegan")
    .data(position)
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr("y", function(d) {
      return d;
    })
    .attr("x", 600)
    .attr("width", 35)
    .attr("height", 35)
    .attr("opacity", 1)
    .delay(function (i) { return (i * 10) });

  d3.selectAll("image.redo")
    .data(position)
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("opacity", 0)
    .delay(function (i) { return (i * 10) });


  // updating tooltips - elimination
  d3.selectAll("image.nonvegan")
    .data(redo_position_mapping)
    .on("mouseover", function(d, i){
      console.log(d)
      console.log("hovering non vegan food item elim", d.food)
      d3.select(".tooltip_div")
            .attr("transform","translate(" + 545 + "," + position[i] + ")")
            .style("width", d.name.length * 10)
      d3.select(".tooltext")
              .style("opacity", 1)
              .text(d.name)
              .style("font-size", 11)
      d3.select(".tooltip_rect")
        .attr("x", 0)
        .attr("y", 0)
        .style("width", function(blah){
          if (d.name == "Spaghetti") {
            return 58;
          }
          else{
            return d.name.length * 8;
          }})
        .style("opacity", .9);
    });

}

function showSubstitutions() {
  // hide previous tooltip
  d3.select(".tooltext")
      .style("opacity", 0)
  d3.select(".tooltip_rect")
      .style("opacity", 0)

  d3.selectAll("image.substitutelabel")
    .attr("opacity", 1)
  d3.selectAll("image.sub")
    .data(other_position_mapping)
    .transition()
    .duration(2000)
    .delay(function (d, i) {
      return i * 10
    })
    .attr("x", 800)
    .attr("opacity", 1)
    .transition()
    .duration(2000)
    .delay(function (d, i) {
      return i * 10
    })
    .attr("x", function (d) {
      return d.position[0]
    })
    .attr("y", function (d) {
      return d.position[1]
    })
    .attr("width", 80)
    .attr("height", 80)
    .attr("opacity", 1);

  d3.selectAll("image.subdub")
    .data(other_position_mapping)
    .transition()
    .duration(2000)
    .delay(function (d, i) {
      return i * 10
    })
    .attr("x", 800)
    .attr("opacity", 1)


    // updating tooltips
    d3.selectAll("image.sub")
      .data(sub_position_mapping)
      .on("mouseover", function(d){
        console.log(d)
        console.log("hovering non vegan food item", d.food)
        d3.select(".tooltip_div")
              .attr("transform","translate(" + d.newposition[0] + "," + d.newposition[1] + ")")
              .style("width", d.name.length * 11)
        d3.select(".tooltext")
                .style("opacity", 1)
                .text(d.name)
        d3.select(".tooltip_rect")
          .attr("x", 0)
          .attr("y", 0)
          .style("width", function(blah){
            if (d.name.length > 8) {
              return d.name.length * 6;
            }
            else{
              return d.name.length * 8;
            }})
          .style("opacity", .9);
      });

      // updating tooltips
      d3.selectAll("image.subdub")
        .data(sub_position_mapping)
        .on("mouseover", function(d){
          console.log(d)
          console.log("hovering non vegan food item", d.food)
          d3.select(".tooltip_div")
                .attr("transform","translate(" + 750 + "," + d.position[1] + ")")
                .style("width", d.name.length * 11)
          d3.select(".tooltext")
                  .style("opacity", 1)
                  .text(d.name)
          d3.select(".tooltip_rect")
            .attr("x", 0)
            .attr("y", 0)
            .style("width", function(blah){
              if (d.name.length > 8) {
                return d.name.length * 6;
              }
              else{
                return d.name.length * 8;
              }})
            .style("opacity", .9);
        });



  // d3.selectAll("image.sub")
  //   .data(newtposition)
  //   .transition()
  //   .duration(1000)
  //   .ease(d3.easeLinear)
  //   .attr("x", function (d) {
  //     return d
  //   })
  //   .attr("opacity", 1)
  //   .delay(function (i) { return (i * 10) });
}

function moveSubs() {
  d3.selectAll("image.sub")
    .data(position)
    .transition()
    .delay(400)
    .duration(1000)
    .ease(d3.easeLinear)
    .attr("x", function (d) {
      return d
    })
    .attr("opacity", 1)
    .delay(function (i) { return (i * 10) });
  // d3.selectAll("image.sub")
  //   .data(redo_position_mapping)
  //   .transition()
  //   .delay(400)
  //   .duration(1000)
  //   .ease(d3.easeLinear)
  //   .attr("opacity", 1)
  //   .attr("x", function (d) {
  //     return d.position[0]
  //   })
  //   .attr("x", function (d) {
  //     return d.position[1]
  //   })
  //   .delay(function (i) { return (i * 10) });

  d3.selectAll("line.connect")
    .data(subpos)
    .transition()
    .delay(400)
    .duration(1000)
    .ease(d3.easeLinear)
    .attr("opacity", 1)
    .delay(function (i) { return (i * 10) });
}

function resetAll() {
  // remove tooltips from all images
  d3.selectAll("grainimages")
    .on("mouseover", null)
  d3.selectAll("image.nonvegan")
    .on("mouseover", null)
  d3.selectAll("image.sub")
    .on("mouseover", null)
  d3.selectAll("image.subdub")
    .on("mouseover", null)
  d3.select(".tooltext")
      .style("opacity", 0)
  d3.select(".tooltip_rect")
      .style("opacity", 0)
  // d3.select("tooltip_div")
  //   .remove()

  d3.selectAll("image.detectlabel")
    .attr("opacity", 0);
  d3.selectAll("image.eliminatelabel")
    .attr("opacity", 0);
  d3.selectAll("image.substitutelabel")
    .attr("opacity", 0);
  d3.selectAll("image.sub")
    .attr("x", 625)
    .attr("opacity", 0);
  d3.selectAll("image.sub")
    .attr("x", 625)
    .attr("opacity", 0);
  d3.selectAll("image.sub")
    .attr("x", 625)
    .attr("opacity", 0);
  d3.selectAll("image.redo")
    .attr("opacity", 1)
  d3.selectAll("image.nonvegan")
    .data(redo_position_mapping)
    .attr("x", function(d) {
      return d.position[0]
    })
    .attr("y", function (d) {
      return d.position[1]
    })
    .attr("width", 80)
    .attr("height", 80)
    .attr("opacity", 1)
  d3.selectAll("image.sub")
    .data(sub_position_mapping)
    .attr("x", function (d) {
      return d.position[0]
    })
    .attr("y", function (d) {
      return d.position[1]
    })
    .attr("width", 35)
    .attr("height", 35)
    .attr("opacity", 0)
  d3.selectAll("image.subdub")
    .data(sub_position_mapping)
    .attr("x", function (d) {
      return d.position[0]
    })
    .attr("y", function (d) {
      return d.position[1]
    })
    .attr("width", 35)
    .attr("height", 35)
    .attr("opacity", 0)
  d3.selectAll("line.connect")
    .attr("opacity", 0)


  // updating tooltips
  d3.selectAll("image.nonvegan")
      .data(redo_position_mapping)
      .on("mouseover", function(d){
        console.log(d)
        console.log("hovering food item", d.food)
        d3.select(".tooltip_div")
              .attr("transform","translate(" + d.position[0] + "," + d.position[1] + ")")
              .style("width", d.name.length * 11)
        d3.select(".tooltext")
                .style("opacity", 1)
                .text(d.name)
                .style("font-size", 11)
        d3.select(".tooltip_rect")
          .attr("x", 0)
          .attr("y", 0)
          .style("width", function(blah){
            if (d.name == "Spaghetti") {
              return 58;
            }
            else{
              return d.name.length * 8;
            }})
          .style("opacity", .9);
      })

      // // updating redo tooltips
      // d3.selectAll("image.nonvegan")
      //     .data(redo_position_mapping)
      //     .on("mouseover", function(d){
      //       console.log(d)
      //       console.log("redoing food item mouse over", d.food)
      //       tooltip_div
      //             .attr("transform","translate(" + d.position[0] + "," + d.position[1] + ")")
      //             .style("width", d.name.length * 11)
      //       tooltext
      //               .style("opacity", 1)
      //               .text(d.name)
      //               .style("font-size", 11)
      //       div
      //         .attr("x", 0)
      //         .attr("y", 0)
      //         .style("width", function(blah){
      //           if (d.name == "Spaghetti") {
      //             return 58;
      //           }
      //           else{
      //             return d.name.length * 8;
      //           }})
      //       div.transition()
      //               .duration(200)
      //               .style("opacity", .9);
      //     })


}

class DragD3Component extends D3Component {

  initialize(node, props) {
    // Position of the circles on the X axis

    const { snaptogroup } = props;
    const svg = this.svg = d3.select(node)  // This is where we put our vis
      .append("svg")
      .attr("width", 1300)
      .attr("height", 450)


    svg.selectAll("triangle")
      .data(food_position_mapping)
      .enter()
      .append("svg:image")
      .attr("xlink:href", function (d) {
        return "static/images/triangle.png"
      })
      .attr("class", "triangle")
      .attr("x", -5)
      .attr("y", -105)
      .attr("width", 600)
      .attr("height", 650);

    addStepsLabels(svg);


    // Add circles at the top
    var grain_images = svg.selectAll("grainimages")
      .data(food_position_mapping)
      .enter()
      .append("svg:image")
      .attr("xlink:href", function (d) {
         return "static/images/" + d.food + ".png" })
      .attr("class", function (d) {
        return d.diet})
      .attr("x", function (d) {
         return d.position[0] })
      .attr("y", function (d) {
        return d.position[1]
      })
      .attr("width", 80)
      .attr("height", 80)

    var sub_images = svg.selectAll("sub")
      .data(sub_position_mapping)
      .enter()
      .append("svg:image")
      .attr("xlink:href", function (d) {
        return "static/images/" + d.food + ".png"
      })
      .attr("class", function (d) {
        return d.diet
      })
      .attr("x", function (d) {
        return d.position[0]
      })
      .attr("y", function (d) {
        return d.position[1]
      })
      .attr("width", 35)
      .attr("height", 35)
      .attr("opacity", 0);

    svg.selectAll("subdub")
      .data(sub_position_mapping)
      .enter()
      .append("svg:image")
      .attr("xlink:href", function (d) {
        return "static/images/" + d.food + ".png"
      })
      .attr("class", "subdub")
      .attr("x", 625)
      .attr("y", function (d) {
        return d.position[1]
      })
      .attr("width", 35)
      .attr("height", 35)
      .attr("opacity", 0);

    // svg.selectAll("mytext")
    //   .data(food_position_mapping)
    //   .enter()
    //   .append("text")
    //   .attr("class", "norestrictions")
    //   .attr("x", 740)
    //   .attr("y", 20)
    //   .text("Substitutions")
    //   .attr("font-family", "sans-serif") // Change text font
    //   .attr("font-size", "14px") // Font size
    //   .attr("text-anchor", "middle")

    // tooltip
    var tooltip_div = svg.append("g")
                        .attr("style", "text-align:center")
                        .attr("class", "tooltip_div")

    var div = tooltip_div.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .style("width", 60)
                .style("height", 28)
                .style("fill", "white")
                .style("stroke", "black")
                .attr("class", "tooltip_rect")
                .style("opacity", 0);

    var tooltext = tooltip_div.append("text")
                .attr("x", 5)
                .attr("y", 20)
                .text("")
                .style("opacity", 0)
                .attr("class", "tooltext")

    grain_images
      .data(food_position_mapping)
      .on("mouseover", function(d){
        console.log(d)
        console.log("hovering food item", d.food)
        tooltip_div
              .attr("transform","translate(" + d.position[0] + "," + d.position[1] + ")")
              .style("width", d.name.length * 11)
        tooltext
                .style("opacity", 1)
                .text(d.name)
                .style("font-size", 11)
        div
          .attr("x", 0)
          .attr("y", 0)
          .style("width", function(blah){
            if (d.name == "Spaghetti") {
              return 58;
            }
            else{
              return d.name.length * 8;
            }})
        div.transition()
                .duration(200)
                .style("opacity", .9);
      })
    //   .on("mouseout", function(d) {
    //     console.log("mousing out")
    //         div.transition()
    //             .duration(500)
    //             .style("opacity", 0)
    //         tooltext.transition()
    //             .duration(500)
    //             .style("opacity", 0)
    // });


  }

  update(props) {
    const { showrestrictions } = props;

    step = 1;
    if (`${showrestrictions}` == "step1") {
      resetAll();
      showRestrictions();
    } else if (`${showrestrictions}` == "step2") {
        eliminateRestrictions();
    } else if (`${showrestrictions}` == "step3") {
        showSubstitutions();
    } else if (`${showrestrictions}` == "step4") {
      resetAll();
    }
  }
}

var step = 0

function addStepsLabels(svg) {
  // ADD LABELS & NUMBERS FOR THE STEPS
  // svg.selectAll("detectlabels")
  //   .data([0])
  //   .enter()
  //   .append("svg:image")
  //   .attr("xlink:href", function (d) {
  //     return "/static/images/detect.png"
  //   })
  //   .attr("class", "detectlabel")
  //   .attr("x", 90)
  //   .attr("y", 0)
  //   .attr("width", 80)
  //   .attr("height", 30)
  //   .attr("opacity", 0);
  // svg.selectAll("detectlabels")
  //   .data([0])
  //   .enter()
  //   .append("svg:image")
  //   .attr("xlink:href", function (d) {
  //     return "/static/images/detectnum.png"
  //   })
  //   .attr("class", "detectlabel")
  //   .attr("x", 60)
  //   .attr("y", 0)
  //   .attr("width", 30)
  //   .attr("height", 30)
  //   .attr("opacity", 0);

  svg.selectAll("eliminatelabels")
    .data([0])
    .enter()
    .append("svg:image")
    .attr("xlink:href", function (d) {
      return "static/images/restricted.png"
    })
    .attr("class", "eliminatelabel")
    .attr("x", 570)
    .attr("y", -2)
    .attr("width", 110)
    .attr("height", 32)
    .attr("opacity", 0);
  // svg.selectAll("eliminatelabels")
  //   .data([0])
  //   .enter()
  //   .append("svg:image")
  //   .attr("xlink:href", function (d) {
  //     return "/static/images/eliminatenum.png"
  //   })
  //   .attr("class", "eliminatelabel")
  //   .attr("x", 535)
  //   .attr("y", 0)
  //   .attr("width", 30)
  //   .attr("height", 30)
  //   .attr("opacity", 0);

  svg.selectAll("substitutelabels")
    .data([0])
    .enter()
    .append("svg:image")
    .attr("xlink:href", function (d) {
      return "static/images/vegansubs.png"
    })
    .attr("class", "substitutelabel")
    .attr("x", 770)
    .attr("y", -2)
    .attr("width", 115)
    .attr("height", 32)
    .attr("opacity", 0);
  // svg.selectAll("substituteslabels")
  //   .data([0])
  //   .enter()
  //   .append("svg:image")
  //   .attr("xlink:href", function (d) {
  //     return "/static/images/substitutenum.png"
  //   })
  //   .attr("class", "substitutelabel")
  //   .attr("x", 725)
  //   .attr("y", 0)
  //   .attr("width", 30)
  //   .attr("height", 30)
  //   .attr("opacity", 0);

}

function addConnectors(svg) {
  // ADD THE CONNECTOR LINES (OPACITY 0)
  svg.selectAll("connect")
    .data(food_position_mapping)
    .enter()
    .append("line")
    .attr("class", "connect")
    .attr("x1", 690)
    .attr("y1", 50)
    .attr("x2", 750)
    .attr("y2", 50)
    .attr("stroke-width", 2)
    .attr("stroke", "grey")
    .attr("opacity", 0);
  svg.selectAll("connect")
    .data(food_position_mapping)
    .enter()
    .append("line")
    .attr("class", "connect")
    .attr("x1", 690)
    .attr("y1", 110)
    .attr("x2", 750)
    .attr("y2", 130)
    .attr("stroke-width", 2)
    .attr("stroke", "grey")
    .attr("opacity", 0);
  svg.selectAll("connect")
    .data(food_position_mapping)
    .enter()
    .append("line")
    .attr("class", "connect")
    .attr("x1", 690)
    .attr("y1", 150)
    .attr("x2", 750)
    .attr("y2", 130)
    .attr("stroke-width", 2)
    .attr("stroke", "grey")
    .attr("opacity", 0);
  svg.selectAll("connect")
    .data(food_position_mapping)
    .enter()
    .append("line")
    .attr("class", "connect")
    .attr("x1", 690)
    .attr("y1", 215)
    .attr("x2", 750)
    .attr("y2", 255)
    .attr("stroke-width", 2)
    .attr("stroke", "grey")
    .attr("opacity", 0);
  svg.selectAll("connect")
    .data(food_position_mapping)
    .enter()
    .append("line")
    .attr("class", "connect")
    .attr("x1", 690)
    .attr("y1", 255)
    .attr("x2", 750)
    .attr("y2", 255)
    .attr("stroke-width", 2)
    .attr("stroke", "grey")
    .attr("opacity", 0);
  svg.selectAll("connect")
    .data(food_position_mapping)
    .enter()
    .append("line")
    .attr("class", "connect")
    .attr("x1", 690)
    .attr("y1", 295)
    .attr("x2", 750)
    .attr("y2", 255)
    .attr("stroke-width", 2)
    .attr("stroke", "grey")
    .attr("opacity", 0);
  svg.selectAll("connect")
    .data(food_position_mapping)
    .enter()
    .append("line")
    .attr("class", "connect")
    .attr("x1", 690)
    .attr("y1", 355)
    .attr("x2", 750)
    .attr("y2", 355)
    .attr("stroke-width", 2)
    .attr("stroke", "grey")
    .attr("opacity", 0);
}

module.exports = DragD3Component;
