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

    return (
      <SVGAnchor {...props}>
        <rect
          className='rd3-barchart-bar'
          {...this.props}
          fill={props.hoverData[props.id].isHovered ? shade(this.props.fill, 0.2) : props.fill}
        />
      </SVGAnchor>
    );
  }
});
