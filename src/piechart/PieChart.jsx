'use strict';

var React = require('react');
var DataSeries = require('./DataSeries');
var Chart = require('../common').Chart;


module.exports = React.createClass({

  displayName: 'PieChart',

  propTypes: {
    data:               React.PropTypes.array,
    cx:                 React.PropTypes.number,
    cy:                 React.PropTypes.number,
    labelTextFill:      React.PropTypes.string,
    valueTextFill:      React.PropTypes.string,
    valueTextFormatter: React.PropTypes.func,
    colors:             React.PropTypes.func,
    colorAccessor:      React.PropTypes.func,
    title:              React.PropTypes.string,
    showInnerLabels:    React.PropTypes.bool,
    showOuterLabels:    React.PropTypes.bool,
    sectorBorderColor:  React.PropTypes.string,
    hoverAnimation:     React.PropTypes.bool,
    legendKey:          React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      margins:            {top: 10, right: 20, bottom: 40, left: 45},
      data:               [],
      title:              '',
      colors:             d3.scale.category20c(),
      colorAccessor:      (d, idx) => idx,
      valueTextFormatter: (val) => `${ val }%`,
      hoverAnimation:     true
    };
  },

  getInitialState: function() {
    var props = this.props;
    var hoverData = props.data.map(function(datum, idx) {
      return {
        isHovered: false
      };
    });

    return {
      hoverData: hoverData
    }
  },

  handleHover: function( idx ) {
    var state = this.state;
    var hoverData = state.hoverData.map(function(datum, i) {
      if (i === idx) return {isHovered: true};
      return {isHovered: false};
    });

    this.setState({hoverData: hoverData});
  },

  handleHoverOff: function( idx ) {
    var state = this.state;
    var hoverData = state.hoverData.map(function(datum) {
      return {isHovered: false};
    });

    this.setState({hoverData: hoverData});
  },

  render: function() {
    var props = this.props;
    var state = this.state;

    var values = props.data.map( (item) => item.value );
    var labels = props.data.map( (item) => item.label );

    var width = (props.width - props.gutterWidth) / 2;

    var radius = props.height > width ? width / 2 : props.height / 2;

    var innerRadius = radius - props.thickness;

    var transform = `translate(${ radius },${ radius })`;

    return (
      <Chart
        {...props}
        containerWidth={props.width}
        width={width}
        hoverData={state.hoverData}
        handleHover={this.handleHover}
        handleHoverOff={this.handleHoverOff}
      >
        <g className='rd3-piechart'>
          <DataSeries
            {...props}
            values={values}
            labels={labels}
            colorAccessor={props.colorAccessor}
            transform={transform}
            width={width}
            containerWidth={props.width}
            radius={radius}
            innerRadius={innerRadius}
            hoverData={state.hoverData}
            handleHover={this.handleHover}
            handleHoverOff={this.handleHoverOff}
          />
        </g>
      </Chart>
    );
  }

});
