'use strict';

var React = require('react');
var d3 = require('d3');
var Arc = require('../piechart/Arc');

module.exports = React.createClass({
  displayName: 'FuelGauge',

  propTypes: {
    data       : React.PropTypes.array,
    cx         : React.PropTypes.number,
    cy         : React.PropTypes.number,
    color      : React.PropTypes.string,
    bgColor    : React.PropTypes.string,
    title      : React.PropTypes.string,
    thickness  : React.PropTypes.number,
    startAngle : React.PropTypes.number,
    endAngle   : React.PropTypes.number,
    arcData    : React.PropTypes.array,
    domainMax  : React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      data    : [],
      title   : '',
      color   : '#4581B6',
      bgColor : 'gray'
    };
  },

  renderArcs: function() {
    var props = this.props;
    var state = this.state;
    var arcData = props.arcData;

    var scales = d3.scale.linear()
      .domain([0, 100])
      .range([0, 80]);

    var color = props.color;

    return arcData.map(function(arcDatum, idx) {
      var arc = d3.svg.arc()
        .startAngle(scales(arcDatum.startAngle))
        .endAngle(scales(arcDatum.endAngle))
        .outerRadius(props.radius)
        .innerRadius(props.innerRadius);

      if (idx + 1 === arcData.length) {
        color = props.bgColor;
      }

      return (
        <path
          d={arc()}
          fill={color}
          stroke='white'
        />
      );
    });
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var arcData = props.arcData;

    return (
      <g>
        {this.renderArcs()}
      </g>
    );
  }
});