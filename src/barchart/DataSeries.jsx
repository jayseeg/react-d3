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

  renderBarContainers(points, idx) {

    var props = this.props;

    var bars = props.data.map((datum, idx) => idx)

    var xScale = d3.scale.ordinal()
      .domain(bars)
      .rangeRoundBands([0, props.width], props.padding);


    return (
      <BarContainer
        {...props}
        points={points}
        width={xScale.rangeBand()}
        x={xScale(idx)}
        availableHeight={props.height}
        fill={props.colors[props.colorAccessor(props.data[idx], idx)]}
        key={idx}
        hoverAnimation={props.hoverAnimation}
        xScale={xScale}
        containerIdx={idx}
      />
    )
  },

  render() {

    var props = this.props;

    // we want an array
    var colors = typeof props.colors === 'function' ? props.colors() : props.colors;

    var bars;
    if (props.isStacked) {
      bars = props.values.map(this.renderBarContainers);
    } else {
      bars = props.values.map(this.renderBarContainers);
    }
    

    return (
      <g>{bars}</g>
    );
  }
});
