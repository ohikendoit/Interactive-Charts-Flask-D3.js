$(document).ready(function(){

if (navigator.userAgent.search("MSIE") >= 0) {
  $(".transline").css({"stroke-dasharray":"0px","stroke-dashoffset":"0px"});
} //IE can't animate stroke - needs this disabled.

  var ww = $(".wrapper").width();
  var margin = {top: 20, right: 40, bottom:10, left: 70},
    width = ww - margin.right - margin.left,
    height = 360 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([width, -40]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(15)
    .tickSize(10,0)
    .tickFormat(d3.format("d"))
    .orient("bottom");

 if (ww < 700 ) {
	var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .tickSize(10,0)
    .tickFormat(d3.format("d"))
    .orient("bottom");
}

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var line = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) { return x(+d.year); })
    .y(function(d) { return y(+d.similarity); });

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
    "UNDP_Private_Sector_Strategy_2007": 0.0361934446,
    "UNDP_Private_Sector_Strategy_2012": 0.0314169125,
    "UNDP_Private_Sector_Strategy_2016": 0.0006714684,
    "UNDP_Private_Sector_Strategy_2018": 0.0350867082,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0221212199
  },
  {
    "year": 2008,
    "DCED": 0.022419527,
    "UNDP_Private_Sector_Strategy_2007": 0.0416624941,
    "UNDP_Private_Sector_Strategy_2012": 0.0329868813,
    "UNDP_Private_Sector_Strategy_2016": 0.0004725325,
    "UNDP_Private_Sector_Strategy_2018": 0.0401262674,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0246019848
  },
  {
    "year": 2009,
    "DCED": 0.0237735138,
    "UNDP_Private_Sector_Strategy_2007": 0.0352088052,
    "UNDP_Private_Sector_Strategy_2012": 0.0321056716,
    "UNDP_Private_Sector_Strategy_2016": 0.0019624646,
    "UNDP_Private_Sector_Strategy_2018": 0.0391119149,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0242665109
  },
  {
    "year": 2010,
    "DCED": 0.0238007571,
    "UNDP_Private_Sector_Strategy_2007": 0.037147467,
    "UNDP_Private_Sector_Strategy_2012": 0.0324884883,
    "UNDP_Private_Sector_Strategy_2016": 0.0008416573,
    "UNDP_Private_Sector_Strategy_2018": 0.0399596994,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0239247314
  },
  {
    "year": 2011,
    "DCED": 0.0231831599,
    "UNDP_Private_Sector_Strategy_2007": 0.0363701122,
    "UNDP_Private_Sector_Strategy_2012": 0.0324208841,
    "UNDP_Private_Sector_Strategy_2016": 0.0010064769,
    "UNDP_Private_Sector_Strategy_2018": 0.0422763746,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0253848753
  },
  {
    "year": 2012,
    "DCED": 0.023650112,
    "UNDP_Private_Sector_Strategy_2007": 0.0342823922,
    "UNDP_Private_Sector_Strategy_2012": 0.0321699101,
    "UNDP_Private_Sector_Strategy_2016": 0.0012656741,
    "UNDP_Private_Sector_Strategy_2018": 0.0412159356,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0251234786
  },
  {
    "year": 2013,
    "DCED": 0.0250250211,
    "UNDP_Private_Sector_Strategy_2007": 0.0346085964,
    "UNDP_Private_Sector_Strategy_2012": 0.0329898914,
    "UNDP_Private_Sector_Strategy_2016": 0.0009485515,
    "UNDP_Private_Sector_Strategy_2018": 0.0419427593,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0254680778
  },
  {
    "year": 2014,
    "DCED": 0.0255694233,
    "UNDP_Private_Sector_Strategy_2007": 0.031896028,
    "UNDP_Private_Sector_Strategy_2012": 0.0311893811,
    "UNDP_Private_Sector_Strategy_2016": 0.0015004914,
    "UNDP_Private_Sector_Strategy_2018": 0.0423540989,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0251941554
  },
  {
    "year": 2015,
    "DCED": 0.0258569295,
    "UNDP_Private_Sector_Strategy_2007": 0.0304321291,
    "UNDP_Private_Sector_Strategy_2012": 0.0322096777,
    "UNDP_Private_Sector_Strategy_2016": 0.0019243729,
    "UNDP_Private_Sector_Strategy_2018": 0.0437096514,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0269645161
  },
  {
    "year": 2016,
    "DCED": 0.0257385951,
    "UNDP_Private_Sector_Strategy_2007": 0.0283150894,
    "UNDP_Private_Sector_Strategy_2012": 0.0331813971,
    "UNDP_Private_Sector_Strategy_2016": 0.0018711434,
    "UNDP_Private_Sector_Strategy_2018": 0.0459398953,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0283019923
  },
  {
    "year": 2017,
    "DCED": 0.0273287336,
    "UNDP_Private_Sector_Strategy_2007": 0.0285936739,
    "UNDP_Private_Sector_Strategy_2012": 0.0345854378,
    "UNDP_Private_Sector_Strategy_2016": 0.0024717865,
    "UNDP_Private_Sector_Strategy_2018": 0.0489208225,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0302585411
  },
  {
    "year": 2018,
    "DCED": 0.029152143,
    "UNDP_Private_Sector_Strategy_2007": 0.0272947641,
    "UNDP_Private_Sector_Strategy_2012": 0.0366151984,
    "UNDP_Private_Sector_Strategy_2016": 0.0028014159,
    "UNDP_Private_Sector_Strategy_2018": 0.0528508123,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0329337998
  },
  {
    "year": 2019,
    "DCED": 0.0288776696,
    "UNDP_Private_Sector_Strategy_2007": 0.0286180593,
    "UNDP_Private_Sector_Strategy_2012": 0.0384871664,
    "UNDP_Private_Sector_Strategy_2016": 0.0024549477,
    "UNDP_Private_Sector_Strategy_2018": 0.0552202705,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0347893662
  },
  {
    "year": 2020,
    "DCED": 0.0302939846,
    "UNDP_Private_Sector_Strategy_2007": 0.0280460855,
    "UNDP_Private_Sector_Strategy_2012": 0.0387403486,
    "UNDP_Private_Sector_Strategy_2016": 0.0023483863,
    "UNDP_Private_Sector_Strategy_2018": 0.0563184778,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0358705131
  },
  {
    "year": 2021,
    "DCED": 0.0313098488,
    "UNDP_Private_Sector_Strategy_2007": 0.0308223976,
    "UNDP_Private_Sector_Strategy_2012": 0.0370627459,
    "UNDP_Private_Sector_Strategy_2016": 0.0021356228,
    "UNDP_Private_Sector_Strategy_2018": 0.0540418456,
    "UNDP_Private_Sector_Strategy_2018_2022": 0.0348219597
  }
];

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));
  
  data.forEach(function(d) {
    d.year = +d.year;

  });
  reports = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {year: d.year, similarity: +d[name] };
      })
    };
  }); 

var DCED = reports[0];
var UNDP_Private_Sector_Strategy_2007 = reports[1];
var UNDP_Private_Sector_Strategy_2012 = reports[2];
var UNDP_Private_Sector_Strategy_2016 = reports[3];
var UNDP_Private_Sector_Strategy_2018 = reports[4];
var UNDP_Private_Sector_Strategy_2018_2022 = reports[5];

  x.domain(d3.extent(data, function(d) { return d.year; }))
    .range([0, width]);
   // .clamp(true);

  y.domain([
    d3.min(reports, function(c) { return d3.min(c.values, function(v) { return v.similarity; }); }),
    d3.max(reports, function(c) { return d3.max(c.values, function(v) { return v.similarity; }); })
  ]);

// Add X axis
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 1.05*height + ")")
      .call(xAxis);

// Add Y axis
svg.append("g")
      .call(yAxis);

// Add X axis label
svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 40)
      .style('fill', 'white')
      .style("font-size", "12px")
      .text("Year of Job Posting Published")

// Add Y axis label
svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr("x", -margin.top)
      .style('fill', 'white')
      .style("font-size", "12px")
      .text("Cosine Similarity Value")

  var city = svg.selectAll(".city")
      .data(reports)
      .enter().append("g")
      .attr("class", "city");

// Add label to the end of the line


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
            var yearDCED = data.DCED;
            var yearUNDP_Private_Sector_Strategy_2007 = data.UNDP_Private_Sector_Strategy_2007;
            var yearUNDP_Private_Sector_Strategy_2012 = data.UNDP_Private_Sector_Strategy_2012;
            var yearUNDP_Private_Sector_Strategy_2016 = data.UNDP_Private_Sector_Strategy_2016;
            var yearUNDP_Private_Sector_Strategy_2018 = data.UNDP_Private_Sector_Strategy_2018;
            var yearUNDP_Private_Sector_Strategy_2018_2022 = data.UNDP_Private_Sector_Strategy_2018_2022;
          }
        //** Display tool tip
        
        toolTip
            .style('visibility', 'visible')
            .style("left", (20 + mouseX + "px"))
            .style("top", (mouseY + "px"))
            .html(value + "<br/>DCED: <span class='textA'></span><br/>Private_Sector_Strategy_2007: <span class='textB'></span><br/>Private_Sector_Strategy_2012: <span class='textC'></span><br/>Private_Sector_Strategy_2016: <span class='textD'></span><br/>Private_Sector_Strategy_2018: <span class='textE'></span><br/>Private_Sector_Strategy_2018_2022: <span class='textF'></span>");
            
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
            $(".textA").text(yearDCED.toLocaleString()),
            $(".textB").text(yearUNDP_Private_Sector_Strategy_2007.toLocaleString()),
            $(".textC").text(yearUNDP_Private_Sector_Strategy_2012.toLocaleString()),
            $(".textD").text(yearUNDP_Private_Sector_Strategy_2016.toLocaleString());
            $(".textE").text(yearUNDP_Private_Sector_Strategy_2018.toLocaleString());
            $(".textF").text(yearUNDP_Private_Sector_Strategy_2018_2022.toLocaleString());
    }//end mousemove

function mouseOut() {
  toolTip.style('visibility', 'hidden');
           var totalDCED = 0,
              totalUNDP_Private_Sector_Strategy_2007 = 0,
              totalUNDP_Private_Sector_Strategy_2012 = 0,
              totalUNDP_Private_Sector_Strategy_2016 = 0,
              totalUNDP_Private_Sector_Strategy_2018 = 0,
              totalUNDP_Private_Sector_Strategy_2018_2022 = 0;//reset values
}

});