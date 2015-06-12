'use strict';

var React = require('react');
var DataSeries = require('./DataSeries');
var Chart = require('../common').Chart;

module.exports = React.createClass({
  displayName: 'FuelGaugeChart',

  propTypes: {
    data      : React.PropTypes.array,
    color     : React.PropTypes.string,
    bgColor   : React.PropTypes.string,
    title     : React.PropTypes.string,
    thickness : React.PropTypes.number,
    maxValue  : React.PropTypes.number,
    titleColor: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      maxValue: 100,
      titleColor: 'black'
    };
  },

  renderNumber: function( radius, thickness, hCenter, value ) {
    var props = this.props;

    return (
      <text
        style={{
          fontSize: radius / 2,
          fontWeight: 700,
          fill: props.titleColor
        }}
        textAnchor='middle'
        transform={`translate(${hCenter}, ${radius + (radius / 5)})`}
      >{value}</text>
    );
  },

  render: function() {
    var props = this.props;
    var state = this.state;

    var values = props.data.map(datum => datum.value);
    // assuming single datapoint is pulled in, we need an opposite for the background
    values.push(props.maxValue - values[0]);

    var radius = props.height > props.width ? props.width / 2 : props.height / 2;
    var innerRadius = radius - props.thickness;

    var hCenter = props.width / 2;

    var transform = `translate(${hCenter}, ${radius}) rotate(-144)`;

    return (
      <Chart
        {...props}
        width={props.width}
      >
        <g
          className='rd3-fuelgaugechart'
          transform={transform}
        >
          <DataSeries
            {...props}
            values={values}
            radius={radius}
            innerRadius={innerRadius}
          />
        </g>
        {this.renderNumber(radius, props.thickness, hCenter, values[0])}
      </Chart>
    );
  }
});