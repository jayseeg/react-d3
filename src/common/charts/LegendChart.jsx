'use strict';

var React = require('react');
var Legend = require('../Legend');

module.exports = React.createClass({

  displayName: 'LegendChart',

  propTypes: {
    colors:         React.PropTypes.func,
    colorAccessor:  React.PropTypes.func,
    title:          React.PropTypes.node,
    viewBox:        React.PropTypes.string,
    width:          React.PropTypes.number,
    height:         React.PropTypes.number,
    children:       React.PropTypes.node,
    legend:         React.PropTypes.bool,
    legendPosition: React.PropTypes.string,
    sideOffset:     React.PropTypes.number,
    margins:        React.PropTypes.object,
    data:           React.PropTypes.oneOfType([
                      React.PropTypes.object,
                      React.PropTypes.array
                    ]),
    headingStyles:  React.PropTypes.object,
    legendKey:      React.PropTypes.string
  },

  getDefaultProps() {
    return {
      data:           {},
      legend:         false,
      legendPosition: 'right',
      sideOffset:     90,
      colors:         d3.scale.category20c(),
      colorAccessor:  (d, idx) => idx,
      headingStyles:  {}
    };
  },

  _renderLegend() {
    var props = this.props;

    if (props.legend) {
      return (
        <Legend
          {...props}
          vertical={props.verticalLegend}
        />
      );
    }
  },

  _renderTitle() {
    var props = this.props;
    if (props.title != null) {
      return <h5 style={props.headingStyles}>{props.title}</h5>;
    }
    return null;
  },

  render() {
    var props = this.props;
    var svgWidth = props.legend ? props.width : props.containerWidth;

    return (
      <div style={{'width': props.containerWidth, 'height': props.height}} >
        {this._renderTitle()}
        {this._renderLegend()}
        <svg viewBox={props.viewBox} width={svgWidth} height={props.height}>{props.children}</svg>
      </div>
    );
  }
});
