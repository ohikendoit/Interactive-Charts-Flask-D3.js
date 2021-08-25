$(document).ready(function(){

if (navigator.userAgent.search("MSIE") >= 0) {
  $(".transline").css({"stroke-dasharray":"0px","stroke-dashoffset":"0px"});
} //IE can't animate stroke - needs this disabled.

  var ww = $(".wrapper").width();
  var margin = {top: 20, right: 20, bottom:50, left: 20},
    width = ww - margin.right - margin.left,
    height = 360 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([width, 0]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(31)
    .tickSize(10,0)
    .orient("bottom");

 if (ww < 700 ) {
	var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .tickSize(10,0)
    .orient("bottom");
}

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) { return x(+d.day); })
    .y(function(d) { return y(+d.people); });

var svg = d3.select("#line1").append("svg")
    .attr("id","travel-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var transports;

var data = [
  {
    "day":1,
    "bus":72082,
    "plane":32505,
    "train":22531,
    "car":288875
  },
  {
    "day":2,
    "bus":62185,
    "plane":41402,
    "train":22617,
    "car":288146
  },
  {
    "day":3,
    "bus":48744,
    "plane":29084,
    "train":18553,
    "car":231808
  },
  {
    "day":4,
    "bus":59231,
    "plane":39349,
    "train":25046,
    "car":308349
  },
  {
    "day":5,
    "bus":68832,
    "plane":67064,
    "train":27497,
    "car":355731
  },
  {
    "day":6,
    "bus":145197,
    "plane":89647,
    "train":51124,
    "car":652208
  },
  {
    "day":7,
    "bus":104725,
    "plane":48587,
    "train":41815,
    "car":508499
  },
  {
    "day":8,
    "bus":71491,
    "plane":46534,
    "train":26916,
    "car":339485
  },
  {
    "day":9,
    "bus":72229,
    "plane":32163,
    "train":22552,
    "car":288979
  },
  {
    "day":10,
    "bus":44608,
    "plane":30452,
    "train":19714,
    "car":240972
  },
  {
    "day":11,
    "bus":52141,
    "plane":51324,
    "train":28292,
    "car":342089
  },
  {
    "day":12,
    "bus":64253,
    "plane":44481,
    "train":26551,
    "car":329592
  },
  {
    "day":13,
    "bus":105021,
    "plane":48587,
    "train":44051,
    "car":530368
  },
  {
    "day":14,
    "bus":92761,
    "plane":33874,
    "train":43191,
    "car":504438
  },
  {
    "day":15,
    "bus":71639,
    "plane":35927,
    "train":28572,
    "car":349170
  },
  {
    "day":16,
    "bus":59083,
    "plane":61931,
    "train":24143,
    "car":313243
  },
  {
    "day":17,
    "bus":43722,
    "plane":57826,
    "train":25411,
    "car":312202
  },
  {
    "day":18,
    "bus":54209,
    "plane":72539,
    "train":24939,
    "car":323969
  },
  {
    "day":19,
    "bus":95124,
    "plane":106070,
    "train":34204,
    "car":462991
  },
  {
    "day":20,
    "bus":188624,
    "plane":162185,
    "train":55596,
    "car":770299
  },
  {
    "day":21,
    "bus":200293,
    "plane":134128,
    "train":64346,
    "car":846214
  },
  {
    "day":22,
    "bus":129836,
    "plane":106755,
    "train":48845,
    "car":629714
  },
  {
    "day":23,
    "bus":235004,
    "plane":165949,
    "train":54177,
    "car":791542
  },
  {
    "day":24,
    "bus":134119,
    "plane":113256,
    "train":57660,
    "car":722083
  },
  {
    "day":25,
    "bus":102805,
    "plane":83146,
    "train":46158,
    "car":570252
  },
  {
    "day":26,
    "bus":227028,
    "plane":157395,
    "train":66926,
    "car":904218
  },
  {
    "day":27,
    "bus":234413,
    "plane":128995,
    "train":81502,
    "car":1033348
  },
  {
    "day":28,
    "bus":216984,
    "plane":127627,
    "train":62841,
    "car":839445
  },
  {
    "day":29,
    "bus":241503,
    "plane":194349,
    "train":87629,
    "car":1137484
  },
  {
    "day":30,
    "bus":303984,
    "plane":237461,
    "train":102893,
    "car":1355650
  },
  {
    "day":31,
    "bus":161741,
    "plane":114967,
    "train":86919,
    "car":1026058
  }
];

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "day"; }));
  
  data.forEach(function(d) {
    d.day = +d.day;

  });
  transports = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {day: d.day, people: +d[name] };
      })
    };
  }); 

var bus = transports[0];
var plane = transports[1];
var train = transports[2];
var car = transports[3];

  x.domain(d3.extent(data, function(d) { return d.day; }))
    .range([0, width]);
   // .clamp(true);

  y.domain([
    d3.min(transports, function(c) { return d3.min(c.values, function(v) { return v.people; }); }),
    d3.max(transports, function(c) { return d3.max(c.values, function(v) { return v.people; }); })
  ]);
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 1.05*height + ")")
      .call(xAxis);

  var city = svg.selectAll(".city")
      .data(transports)
      .enter().append("g")
      .attr("class", "city");

var p1 = city.append("path") //Add the 3 coloured lines for transport type
      .attr("class", "transline")
      .attr("id", function(d) { return d.name; }) // ID of transport type
      .attr("d", function(d) { return line(d.values); }); //data of all Y values
 //data function return names.

var handleLine = svg.append("rect")
      .attr("class","line")
      .attr("height", (height + 20))
      .attr("transform", "translate(0,-5)")
      .attr("width",2)
      .attr("fill","#FFF");

var handle = svg.append("svg:image")
    .attr("xlink:href", "https://cdn-goeuro.com/static_content/web/Design/ball_indicator.svg")//christmas ball handle
    .attr("width", 34)
    .attr("height", 34)
    .attr("transform", "translate(-15," + (height + 15) + ")");

var handleText = svg.append("text")
    .style({"fill":"#FFF","font-size":"14px","text-anchor":"middle"})
    .attr("transform", "translate(1," + (height + 40) + ")");



var graph = svg.select("g.graph");
    var lines = graph.select('g.line-container')
        .selectAll('path.line').data(data);

    lines.enter()
        .append('path')
        .attr('class', function (d, i) {
            return 'line' + d.key;
        })
        .attr('fill', 'none')
        .attr('stroke', function (d, i) {
            return colors(i);
        })
        .attr('d', function (d) {
            return line(d.values);
        });

    //** Create a invisible rect for mouse tracking
 var hoverRect = svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'none')
        .style('pointer-events', 'all')
        .on('mousemove', mouseMove)
        .on('mouseout', mouseOut)
        .on('touchmove', mouseMove)
        .on('touchend', mouseOut);
    
    //** Init Tooltip

var toolTip = d3.select("#line1").append('div')
              .attr('class', 'chart-tooltip');

function mouseMove() {

     var mouse   = d3.mouse(this),
            mouseX  = mouse[0],
            mouseY  = mouse[1],
            value   = Math.round(x.invert(mouseX)),
            valMap = value-1;  //map day - 1 for proper match (since array indexing starts at 0)
          if (value > 0) {  
            var dayBus = data[valMap].bus;
            var dayTrain = data[valMap].train;
            var dayPlane = data[valMap].plane;
            var dayCar = data[valMap].car;
          }
        //** Display tool tip
        
        toolTip
            .style('visibility', 'visible')
            .style("left", (20 + mouseX + "px"))
            .style("top", (mouseY + "px"))
            .html(value + " December 2015<br/>Buses: <span class='textB'></span><br/>Trains: <span class='textT'></span><br/>Planes: <span class='textP'></span><br/>Cars: <span class='textC'></span>");
            
        handle
          .attr("x", (mouseX + "px"));
        handleText
          .attr("x", (mouseX + "px"))
          .html(value);

        handleLine
          .attr("x", (mouseX + "px")); //

//Don't smush tooltip on right edge:
  var leftLimit = width - 180;
        if (mouseX >= leftLimit) {
          toolTip.style("left", (mouseX - 140 + "px"));
  }
//get daily values and print
            $(".textB").text(dayBus.toLocaleString()),
            $(".textP").text(dayPlane.toLocaleString()),
            $(".textT").text(dayTrain.toLocaleString()),
            $(".textC").text(dayCar.toLocaleString());
    }//end mousemove

function mouseOut() {
  toolTip.style('visibility', 'hidden');
           var totalBus = 0,
              totalTrain = 0,
              totalPlane = 0,
              totalCar = 0;//reset values
}

});