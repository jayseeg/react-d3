'use strict';

var React = require('react');
var d3 = require('d3');
var common = require('../common');
var Chart = common.Chart;
var XAxis = common.XAxis;
var YAxis = common.YAxis;
var Voronoi = common.Voronoi;
var utils = require('../utils');
var immstruct = require('immstruct');
var DataSeries = require('./DataSeries');
var mixins = require('../mixins');
var CartesianChartPropsMixin = mixins.CartesianChartPropsMixin;


module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin ],

  displayName: 'LineChart',

  propTypes: {
    margins:           React.PropTypes.object,
    circleRadius:      React.PropTypes.number,
    displayDataPoints: React.PropTypes.bool,
    hoverAnimation:    React.PropTypes.bool,
    interpolate:       React.PropTypes.bool,
    interpolationType: React.PropTypes.string,
    colors:            React.PropTypes.func,
    colorAccessor:     React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      margins:           {top: 10, right: 20, bottom: 40, left: 45},
      className:         'rd3-linechart',
      circleRadius:      3,
      interpolate:       false,
      interpolationType: null,
      displayDataPoints: true,
      hoverAnimation:    true,
      yDomain:           null,
      xDomain:           null,
      xIsRawDates:       false,
      yIsRawDates:       false
    };
  },

  render() {

    var structure = immstruct('lineChart', { voronoi: {}, voronoiSeries: {}});

    var props = this.props;

    var data = props.data;

    var interpolationType = props.interpolationType || (props.interpolate ? 'cardinal' : 'linear');

    // Calculate inner chart dimensions
    var innerWidth, innerHeight;

    innerWidth = props.width - props.margins.left - props.margins.right;
    innerHeight = props.height - props.margins.top - props.margins.bottom;

    if (props.legend && props.legendFloat) {
      innerWidth = innerWidth - props.legendOffset;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    var flattenedData = utils.flattenData(data, props.xAccessor, props.yAccessor);

    var allValues = flattenedData.allValues,
        xValues = flattenedData.xValues,
        yValues = flattenedData.yValues;

    var scales = utils.calculateScales(innerWidth, innerHeight, {
      xValues: xValues,
      isRawDates: props.xIsRawDates
    },
    {
      yValues: yValues,
      isRawDates: props.yIsRawDates
    });

    scales.yScale = props.yDomain ? scales.yScale.domain(props.yDomain) : scales.yScale;
    scales.xScale = props.xDomain ? scales.xScale.domain(props.xDomain) : scales.xScale;

    if (props.colorsArray && props.colorsArray.length) props.colors.range(props.colorsArray)

    var trans = `translate(${ props.margins.left },${ props.margins.top })`;
    var dataSeriesArray = data.map( (series, idx) => {
      var fill = props.colors(props.colorAccessor(series, idx));

      return (
        <DataSeries
          {...props}
          key={idx}
          structure={structure}
          xScale={scales.xScale}
          yScale={scales.yScale}
          seriesName={series.name}
          data={series.values}
          width={innerWidth}
          height={innerHeight}
          fill={fill}
          interpolationType={interpolationType}
        />
      );
    });

    return (
      <Chart
        {...props}
        data={data}
      >
        <g transform={trans} className={props.className}>
          {props.hoverAnimation ? <Voronoi
            structure={structure}
            data={allValues}
            xScale={scales.xScale}
            yScale={scales.yScale}
            width={innerWidth}
            height={innerHeight}
          /> : <g/> }
          <YAxis
            {...props}
            yAxisClassName='rd3-linechart-yaxis'
            tickFormatting={props.yAxisFormatter}
            yScale={scales.yScale}
            width={innerWidth}
            height={innerHeight}
            stroke={props.axesColor}
          />
          <XAxis
            {...props}
            xAxisClassName='rd3-linechart-xaxis'
            tickFormatting={props.xAxisFormatter}
            xScale={scales.xScale}
            width={innerWidth}
            height={innerHeight}
            stroke={props.axesColor}
          />
          {dataSeriesArray}
        </g>
      </Chart>
    );
  }

});
