'use strict';

var React = require('react');
var SVGAnchor = require('../common/SVGAnchor.jsx')
var shade = require('../utils').shade;

module.exports = React.createClass({

  propTypes: {
    fill: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    className: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      offset: 0,
      className: 'rd3-barchart-bar'
    };
  },

  render() {
    var props = this.props;

    var topPercent = null;

    if (props.topPercent) {
      topPercent = (
        <text
          x={props.xScale(props.containerIdx) + ( props.xScale.rangeBand() / 2 )}
          y={props.yScale(props.points[0]) - 5}
          style={props.topPercentStyles}
          textAnchor='middle'
        >
          {`${props.points[0]}%`}
        </text>
      )
    }

    var href = null
    if (props.data[props.containerIdx].href) {
      href = props.data[props.containerIdx].href
    }

    return (
      <SVGAnchor
        href={href}
        {...props}
      >
        {topPercent}
        <rect
          className='rd3-barchart-bar'
          {...this.props}
          fill={props.hoverData[props.id].isHovered ? shade(this.props.fill, 0.2) : props.fill}
        />
      </SVGAnchor>
    );
  }
});
