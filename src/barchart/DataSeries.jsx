'use strict';

var React = require('react');
var d3 = require('d3');
var BarContainer = require('./BarContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    values: React.PropTypes.array,
    labels: React.PropTypes.array,
    colors: React.PropTypes.func,
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
      data: [],
      colors: d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
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
        key={idx}
        hoverAnimation={props.hoverAnimation}
        xScale={xScale}
        containerIdx={idx}
      />
    )
  },

  render() {
    var props = this.props;

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
