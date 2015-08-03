'use strict';

var React = require('react');
var d3 = require('d3');
var DataSeries = require('./DataSeries');
var utils = require('../utils');

var { Chart, XAxis, YAxis } = require('../common');
var { CartesianChartPropsMixin } = require('../mixins');

module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin ],

  displayName: 'BarChart',

  propTypes: {
    data: React.PropTypes.array,
    yAxisTickCount: React.PropTypes.number,
    width: React.PropTypes.number,
    margins: React.PropTypes.object,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    hoverAnimation: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      yAxisTickCount: 4,
      margins: {top: 10, right: 20, bottom: 40, left: 45},
      hoverAnimation: true,
    };
  },

  getInitialState: function() {
    var props = this.props;

    var hoverArray = props.data
    if (props.stackedBarLabels && props.stackedBarLabels.length) {
      var hoverArray = props.stackedBarLabels

    }
    var hoverData = hoverArray.map(function(datum, idx) {
      return {
        isHovered: false
      };
    });

    return {
      hoverData: hoverData
    }
  },

  handleHover: function( idx ) {
    var state = this.state;
    var hoverData = state.hoverData.map(function(datum, i) {
      if (i === idx) return {isHovered: true};
      return {isHovered: false};
    });

    this.setState({hoverData: hoverData});
  },

  handleHoverOff: function( idx ) {
    var state = this.state;
    var hoverData = state.hoverData.map(function(datum) {
      return {isHovered: false};
    });

    this.setState({hoverData: hoverData});
  },

  render() {

    var props = this.props;
    var state = this.state;

    var values = props.data.map( (item) => item.values );

    var labels = props.data.map( (item) => item.label );

    var margins = props.margins;

    // Calculate inner chart dimensions
    var innerWidth, innerHeight;

    innerWidth = props.width - props.margins.left - props.margins.right;
    innerHeight = props.height - props.margins.top - props.margins.bottom;

    if (props.legend && props.legendFloat) {
      innerWidth = innerWidth - props.legendOffset;
    }

    var sideMargins = margins.left + margins.right;
    var topBottomMargins = margins.top + margins.bottom;

    var flattenedValues = []
    var flattenedValues = utils.flattenData(props.data, props.xAccessor, props.yAccessor);

    var xValues = flattenedValues.xValues,
        yValues = flattenedValues.yValues;

    var scales = utils.calculateScales(innerWidth, innerHeight, {
      xValues: labels,
      isRawDates: props.xIsRawDates
    },
    {
      yValues: yValues,
      isRawDates: props.yIsRawDates
    });

    scales.yScale = props.yDomain ? scales.yScale.domain(props.yDomain) : scales.yScale;
    scales.xScale = props.xDomain ? scales.xScale.domain(props.xDomain) : scales.xScale;

    var minValue = Math.min(d3.min(flattenedValues), 0);

    var yScale = d3.scale.linear()
      .domain([minValue, d3.max(flattenedValues)])
      .range([props.height - topBottomMargins, 0]);

    var xScale = d3.scale.ordinal()
      .domain(labels)
      .rangeRoundBands([0, props.width - sideMargins], 0.1);


    var trans = `translate(${ margins.left },${ margins.top })`;

    // if any of the value arrays have a length over 1, then it's stacked
    var isStacked = values.reduce((mem, valueArray) => {
      return valueArray.length > mem ? valueArray.length : mem
    }, 0) > 1
      ? true
      : false

// setting here to make sure length of colors is available
// var colorAccessor = (d, idx) => idx % props.colors.length;

    var stackedBarLabelObjects = [];
    if (props.stackedBarLabels && props.stackedBarLabels.length) {
      stackedBarLabelObjects = props.stackedBarLabels.map(label => ({name: label}))
    }

    return (
      <Chart
        {...props}
        data={stackedBarLabelObjects}
        verticalLegend={false}
        hoverData={state.hoverData}
        handleHover={this.handleHover}
        handleHoverOff={this.handleHoverOff}
      >
        <g transform={trans} className='rd3-barchart'>
          <YAxis
            {...props}
            yAxisClassName='rd3-barchart-yaxis'
            yScale={scales.yScale}
            margins={margins}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
            tickFormatting={props.yAxisFormatter}
          />
          <XAxis
            {...props}
            xAxisClassName='rd3-barchart-xaxis'
            xScale={xScale}
            margins={margins}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
            xAxisTickValues={labels}
            tickFormatting={props.xAxisFormatter}
          />
          <DataSeries
            {...props}
            isStacked={isStacked}
            values={values}
            labels={labels}
            yScale={scales.yScale}
            xScale={scales.yScale}
            margins={margins}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
            hoverData={state.hoverData}
            handleHover={this.handleHover}
            handleHoverOff={this.handleHoverOff}
          />
        </g>
      </Chart>
    );
  }

});
