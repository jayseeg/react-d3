'use strict';

var React = require('react');
var Bar = require('./Bar');
var shade = require('../utils').shade;

module.exports = React.createClass({
  renderBars(point, idx) {
    var props = this.props;
    if (props.colorsArray && props.colorsArray.length) props.colors.range(props.colorsArray)

    var fill = props.colors(props.colorAccessor(point, idx))

    return (
      <Bar
        {...props}
        id={idx}
        y={props.yScale(Math.max(0, point))}
        height={Math.abs(props.yScale(0) - props.yScale(point))}
        fill={fill}
        handleMouseEnter={props.hoverAnimation ? props.handleHover : null}
        handleMouseLeave={props.hoverAnimation ? props.handleHoverOff : null}
      />
    );
  },

  render() {
    var props = this.props;

    var bars = props.points
      .sort((pointA, pointB) => pointA < pointB)
      .map(this.renderBars);

    return <g>{bars}</g>;
  },

  _animateBar() {
    this.setState({ 
      fill: shade(this.props.fill, 0.2)
    });
  },

  _restoreBar() {
    this.setState({ 
      fill: this.props.fill
    });
  },
});
