'use strict';

var React = require('react');
var d3 = require('d3');
var AxisTicks = require('./AxisTicks');
var AxisLine = require('./AxisLine');
var Label = require('./Label');

module.exports = React.createClass({

  displayName: 'YAxis',

  propTypes: {
    yAxisClassName: React.PropTypes.string,
    yAxisTickValues: React.PropTypes.array,
    yOrient: React.PropTypes.oneOf(['left', 'right', 'full', 'leftFull']),
    yScale: React.PropTypes.func.isRequired,
    fill: React.PropTypes.string,
    stroke: React.PropTypes.string,
    tickStroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.string,
    yAxisOffset: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      yAxisClassName: 'y axis',
      yOrient: 'left',
      fill: 'none',
      stroke: '#000',
      tickStroke: '#000',
      strokeWidth: '1',
      yAxisOffset: 0
    };
  },

  render() {

    var props = this.props;

    var t;
    if (props.yOrient === 'right') {
       t = `translate(${props.yAxisOffset + props.width},0)`;
    } else {
       t = `translate(${props.yAxisOffset},0)`;
    }

    var tickArguments;
    if (props.yAxisTickCount) {
      tickArguments = [props.yAxisTickCount];
    }
    
    if (props.yAxisTickInterval) {
      tickArguments = [d3.time[props.yAxisTickInterval.unit], props.yAxisTickInterval.interval];
    }

    return (
      <g
        className={props.yAxisClassName}
        transform={t}
      >
        <AxisTicks
          tickValues={props.yAxisTickValues}
          tickFormatting={props.tickFormatting}
          rawDates={props.yIsRawDates}
          tickArguments={tickArguments}
          tickStroke={props.yTickStrokeColor}
          tickTextStroke={props.yTickTextStroke}
          innerTickSize={props.yInnerTickSize}
          scale={props.yScale}
          orient={props.yOrient}
          width={props.width}
          displayText={props.yDisplayTickText}
          margins={props.margins}
        />
        <AxisLine
          {...props}
          scale={props.yScale}
          orient={props.yOrient}
          outerTickSize={props.yOuterTickSize}
          stroke={props.yAxisStrokeColor}
          strokeWidth={props.yAxisStrokeWidth}
        />
        <Label
          label={props.yAxisLabel}
          offset={props.yAxisLabelOffset}
          orient={props.yOrient}
          margins={props.margins}
          height={props.height}
          width={props.width}
          labelColor={props.yLabelColor}
        />
      </g>
    );
  }

});
