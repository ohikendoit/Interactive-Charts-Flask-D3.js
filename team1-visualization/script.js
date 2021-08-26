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
    .ticks(15)
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


var reports;

var data = [
  {
    "year": 2007,
    "DCED": 0.020291951,
    "UNDP-Private-Sector-Strategy-2007": 0.0361934446,
    "UNDP-Private-Sector-Strategy-2012": 0.0314169125,
    "UNDP-Private-Sector-Strategy-2016": 0.0006714684,
    "UNDP-Private-Sector-Strategy-2018": 0.0350867082,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0221212199
  },
  {
    "year": 2008,
    "DCED": 0.022419527,
    "UNDP-Private-Sector-Strategy-2007": 0.0416624941,
    "UNDP-Private-Sector-Strategy-2012": 0.0329868813,
    "UNDP-Private-Sector-Strategy-2016": 0.0004725325,
    "UNDP-Private-Sector-Strategy-2018": 0.0401262674,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0246019848
  },
  {
    "year": 2009,
    "DCED": 0.0237735138,
    "UNDP-Private-Sector-Strategy-2007": 0.0352088052,
    "UNDP-Private-Sector-Strategy-2012": 0.0321056716,
    "UNDP-Private-Sector-Strategy-2016": 0.0019624646,
    "UNDP-Private-Sector-Strategy-2018": 0.0391119149,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0242665109
  },
  {
    "year": 2010,
    "DCED": 0.0238007571,
    "UNDP-Private-Sector-Strategy-2007": 0.037147467,
    "UNDP-Private-Sector-Strategy-2012": 0.0324884883,
    "UNDP-Private-Sector-Strategy-2016": 0.0008416573,
    "UNDP-Private-Sector-Strategy-2018": 0.0399596994,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0239247314
  },
  {
    "year": 2011,
    "DCED": 0.0231831599,
    "UNDP-Private-Sector-Strategy-2007": 0.0363701122,
    "UNDP-Private-Sector-Strategy-2012": 0.0324208841,
    "UNDP-Private-Sector-Strategy-2016": 0.0010064769,
    "UNDP-Private-Sector-Strategy-2018": 0.0422763746,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0253848753
  },
  {
    "year": 2012,
    "DCED": 0.023650112,
    "UNDP-Private-Sector-Strategy-2007": 0.0342823922,
    "UNDP-Private-Sector-Strategy-2012": 0.0321699101,
    "UNDP-Private-Sector-Strategy-2016": 0.0012656741,
    "UNDP-Private-Sector-Strategy-2018": 0.0412159356,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0251234786
  },
  {
    "year": 2013,
    "DCED": 0.0250250211,
    "UNDP-Private-Sector-Strategy-2007": 0.0346085964,
    "UNDP-Private-Sector-Strategy-2012": 0.0329898914,
    "UNDP-Private-Sector-Strategy-2016": 0.0009485515,
    "UNDP-Private-Sector-Strategy-2018": 0.0419427593,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0254680778
  },
  {
    "year": 2014,
    "DCED": 0.0255694233,
    "UNDP-Private-Sector-Strategy-2007": 0.031896028,
    "UNDP-Private-Sector-Strategy-2012": 0.0311893811,
    "UNDP-Private-Sector-Strategy-2016": 0.0015004914,
    "UNDP-Private-Sector-Strategy-2018": 0.0423540989,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0251941554
  },
  {
    "year": 2015,
    "DCED": 0.0258569295,
    "UNDP-Private-Sector-Strategy-2007": 0.0304321291,
    "UNDP-Private-Sector-Strategy-2012": 0.0322096777,
    "UNDP-Private-Sector-Strategy-2016": 0.0019243729,
    "UNDP-Private-Sector-Strategy-2018": 0.0437096514,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0269645161
  },
  {
    "year": 2016,
    "DCED": 0.0257385951,
    "UNDP-Private-Sector-Strategy-2007": 0.0283150894,
    "UNDP-Private-Sector-Strategy-2012": 0.0331813971,
    "UNDP-Private-Sector-Strategy-2016": 0.0018711434,
    "UNDP-Private-Sector-Strategy-2018": 0.0459398953,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0283019923
  },
  {
    "year": 2017,
    "DCED": 0.0273287336,
    "UNDP-Private-Sector-Strategy-2007": 0.0285936739,
    "UNDP-Private-Sector-Strategy-2012": 0.0345854378,
    "UNDP-Private-Sector-Strategy-2016": 0.0024717865,
    "UNDP-Private-Sector-Strategy-2018": 0.0489208225,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0302585411
  },
  {
    "year": 2018,
    "DCED": 0.029152143,
    "UNDP-Private-Sector-Strategy-2007": 0.0272947641,
    "UNDP-Private-Sector-Strategy-2012": 0.0366151984,
    "UNDP-Private-Sector-Strategy-2016": 0.0028014159,
    "UNDP-Private-Sector-Strategy-2018": 0.0528508123,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0329337998
  },
  {
    "year": 2019,
    "DCED": 0.0288776696,
    "UNDP-Private-Sector-Strategy-2007": 0.0286180593,
    "UNDP-Private-Sector-Strategy-2012": 0.0384871664,
    "UNDP-Private-Sector-Strategy-2016": 0.0024549477,
    "UNDP-Private-Sector-Strategy-2018": 0.0552202705,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0347893662
  },
  {
    "year": 2020,
    "DCED": 0.0302939846,
    "UNDP-Private-Sector-Strategy-2007": 0.0280460855,
    "UNDP-Private-Sector-Strategy-2012": 0.0387403486,
    "UNDP-Private-Sector-Strategy-2016": 0.0023483863,
    "UNDP-Private-Sector-Strategy-2018": 0.0563184778,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0358705131
  },
  {
    "year": 2021,
    "DCED": 0.0313098488,
    "UNDP-Private-Sector-Strategy-2007": 0.0308223976,
    "UNDP-Private-Sector-Strategy-2012": 0.0370627459,
    "UNDP-Private-Sector-Strategy-2016": 0.0021356228,
    "UNDP-Private-Sector-Strategy-2018": 0.0540418456,
    "UNDP-Private-Sector-Strategy-2018-2022": 0.0348219597
  }
];

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "day"; }));
  
  data.forEach(function(d) {
    d.day = +d.day;

  });
  reports = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {day: d.day, people: +d[name] };
      })
    };
  }); 

var bus = reports[0];
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