'use strict';

var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({

  displayName: 'AxisTick',

  propTypes: {
    scale          : React.PropTypes.func.isRequired,
    orient         : React.PropTypes.oneOf(['top','bottom','left','right', 'leftFull']).isRequired,
    tickArguments  : React.PropTypes.array,
    tickValues     : React.PropTypes.array,
    innerTickSize  : React.PropTypes.number,
    outerTickSize  : React.PropTypes.number,
    tickPadding    : React.PropTypes.number,
    tickFormat     : React.PropTypes.func,
    tickStroke     : React.PropTypes.string,
    tickTextStroke : React.PropTypes.string,
    displayText    : React.PropTypes.bool,
    rawDates       : React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      innerTickSize: 6,
      outerTickSize: 6,
      tickStroke: '#000',
      tickTextStroke: '#000',
      tickPadding: 3,
      tickArguments: [10],
      tickValues: null,
      displayText: true,
      rawDates: false,
    };
  },

  render() {
    var props = this.props;

    var tr,
        ticks,
        scale,
        adjustedScale,
        textAnchor,
        tickFormat,
        y0, y1, y2, dy, x0, x1, x2, dx;

    var sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1;
    var tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding;

    scale = props.scale;

    if (props.tickValues) {
      ticks = props.tickValues;
    } else if (scale.ticks) {
      ticks = scale.ticks.apply(scale, props.tickArguments);
    } else {
      ticks = scale.domain();
    }

    if (props.tickFormatting && props.rawDates) {
        tickFormat = function( rawDate ) {
          var date = new Date(rawDate);
          return props.tickFormatting(date);
        }
    } else if (props.tickFormatting) {
        tickFormat = props.tickFormatting;
    } else if (scale.tickFormat) {
        tickFormat = scale.tickFormat.apply(scale, props.tickArguments);
    } else {
        tickFormat = (d)=> d;

    }

    adjustedScale = scale.rangeBand ? (d) => { return scale(d) + scale.rangeBand() / 2; } : scale;

    // Still working on this
    // Ticks and lines are not fully aligned
    // in some orientations
    switch (props.orient) {
      case 'top':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = "middle";
        y2 = props.innerTickSize * sign;
        y1 = 10;
        dy =  sign < 0 ? "0em" : ".71em";
        break;
      case 'bottom':
        tr = (tick) => `translate(${adjustedScale(tick)},0)`;
        textAnchor = "middle";
        y2 = props.innerTickSize * sign;
        y1 = 10;
        dy =  sign < 0 ? "0em" : ".71em";
        break;
      case 'left':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "end";
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = ".32em";
        break;
      case 'leftFull':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "beginning";
        x2 = props.width;
        x1 = 0 - props.margins.left;
        dy = '-3px';
        break;
      case 'leftBlank':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "beginning";
        x2 = 0;
        x1 = 0;
        dy = '-3px';
        break;
      case 'right':
        tr = (tick) => `translate(0,${adjustedScale(tick)})`;
        textAnchor = "start";
        x2 = props.innerTickSize * -sign;
        x1 = tickSpacing * -sign;
        dy = ".32em";
        break;
    }

    var displayText = props.displayText ? 'block' : 'none';

    return (
      <g>
        {ticks.map( (tick, idx) => {
          return (
            <g key={idx} className="tick" transform={tr(tick)} >
              <line style={{shapeRendering:'crispEdges',opacity:'1',stroke:props.tickStroke}} x1={x1} x2={x2} y2={y2} >
              </line>
              <text
                strokeWidth="0.01"
                dy={dy} x={x1} y={y1}
                style={{stroke:props.tickTextStroke, fill:props.tickTextStroke, display:displayText}}
                textAnchor={textAnchor}
                fill={props.tickTextStroke}
              >
                {tickFormat(tick)}
              </text>
            </g>
          );
          })
        }
      </g>
    );
  }

});
