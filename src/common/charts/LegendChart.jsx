'use strict';

var React = require('react');
var Legend = require('../Legend');

module.exports = React.createClass({

  displayName: 'LegendChart',

  propTypes: {
    colors:         React.PropTypes.oneOfType([
                      React.PropTypes.array,
                      React.PropTypes.func
                    ]),
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
          legendPosition={props.legendPosition}
          margins={props.margins}
          colors={props.colors}
          colorAccessor={props.colorAccessor}
          data={props.data}
          width={props.width}
          height={props.height}
          sideOffset={props.sideOffset}
          legendKey={props.legendKey}
          {...props}
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
    var svgWidth = props.radius ? props.radius * 2 : props.width - props.sideOffset;

    return (
      <div style={{'width': props.width, 'height': props.height}} >
        {this._renderTitle()}
        {this._renderLegend()}
        <svg viewBox={props.viewBox} width={svgWidth} height={props.height}>{props.children}</svg>
      </div>
    );
  }
});
