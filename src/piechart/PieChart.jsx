'use strict';

var React = require('react');
var DataSeries = require('./DataSeries');
var LegendChart = require('../common').LegendChart;


module.exports = React.createClass({

  displayName: 'PieChart',

  propTypes: {
    data:               React.PropTypes.array,
    radius:             React.PropTypes.number,
    cx:                 React.PropTypes.number,
    cy:                 React.PropTypes.number,
    labelTextFill:      React.PropTypes.string,
    valueTextFill:      React.PropTypes.string,
    valueTextFormatter: React.PropTypes.func,
    colors:             React.PropTypes.oneOfType([
                          React.PropTypes.array,
                          React.PropTypes.func
                        ]),
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
      valueTextFormatter: (val) => `${ val }%`,
      hoverAnimation:     true
    };
  },

  render: function() {
    var props = this.props;

    var transform = `translate(${ props.radius },${ props.radius })`;

    var values = props.data.map( (item) => item.value );
    var labels = props.data.map( (item) => item.label );

    // setting here to make sure length of colors is available
    var colorAccessor = (d, idx) => idx % props.colors.length;

    return (
      <LegendChart
        width={props.width}
        height={props.height}
        title={props.title}
        legendKey={props.legendKey}
        {...props}
      >
        <g className='rd3-piechart'>
          <DataSeries
            labelTextFill={props.labelTextFill}
            valueTextFill={props.valueTextFill}
            valueTextFormatter={props.valueTextFormatter}
            data={props.data}
            values={values}
            labels={labels}
            colors={props.colors}
            colorAccessor={colorAccessor}
            transform={transform}
            width={props.width}
            height={props.height}
            radius={props.radius}
            innerRadius={props.innerRadius}
            showInnerLabels={props.showInnerLabels}
            showOuterLabels={props.showOuterLabels}
            sectorBorderColor={props.sectorBorderColor}
            hoverAnimation={props.hoverAnimation}
          />
        </g>
      </LegendChart>
    );
  }

});
