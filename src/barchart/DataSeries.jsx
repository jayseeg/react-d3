'use strict';

var React = require('react');
var d3 = require('d3');
var BarContainer = require('./BarContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    values: React.PropTypes.array,
    labels: React.PropTypes.array,
    colors: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]),
    colorAccessor: React.PropTypes.func,
    title: React.PropTypes.string,
    padding: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    offset: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      padding: 0.1,
      data: []
    };
  },

  render() {

    var props = this.props;

    var xScale = d3.scale.ordinal()
      .domain(d3.range(props.values.length))
      .rangeRoundBands([0, props.width], props.padding);

    // we want an array
    var colors = typeof props.colors === 'function' ? props.colors() : props.colors;

    var bars = props.values.map((point, idx) => {
      return (
        <BarContainer
          height={Math.abs(props.yScale(0) - props.yScale(point))}
          width={xScale.rangeBand()}
          x={xScale(idx)}
          y={props.yScale(Math.max(0, point))}
          availableHeight={props.height}
          fill={props.colors[props.colorAccessor(props.data[idx], idx)]}
          key={idx}
          hoverAnimation={props.hoverAnimation}
        />
      );
    });

    return (
      <g>{bars}</g>
    );
  }
});
