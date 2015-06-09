'use strict';

var React = require('react');
var d3 = require('d3');
var ArcContainer = require('./ArcContainer');


module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    data              : React.PropTypes.array,
    values            : React.PropTypes.array,
    labels            : React.PropTypes.array,
    transform         : React.PropTypes.string,
    innerRadius       : React.PropTypes.number,
    radius            : React.PropTypes.number,
    colors            : React.PropTypes.oneOfType([
                         React.PropTypes.array,
                         React.PropTypes.func
                       ]),
    colorAccessor     : React.PropTypes.func,
    showInnerLabels   : React.PropTypes.bool,
    showOuterLabels   : React.PropTypes.bool,
    sectorBorderColor : React.PropTypes.string,
    href              : React.PropTypes.string
  },

  getDefaultProps() {
    return {
      data:          [],
      innerRadius:   0
    };
  },

  render() {

    var props = this.props;

    var pie = d3.layout
      .pie()
      .sort(null);

    var arcData = pie(props.values);

    // we want an array
    var colors = typeof props.colors === 'function' ? props.colors() : props.colors;

    var arcs = arcData.map((arc, idx) => {
      return (
        <ArcContainer
          key={idx}
          startAngle={arc.startAngle}
          endAngle={arc.endAngle}
          outerRadius={props.radius}
          innerRadius={props.innerRadius}
          labelTextFill={props.labelTextFill}
          valueTextFill={props.valueTextFill}
          valueTextFormatter={props.valueTextFormatter}
          fill={props.colors[props.colorAccessor(props.data[idx], idx)]}
          value={props.values[idx]}
          label={props.labels[idx]}
          width={props.width}
          showInnerLabels={props.showInnerLabels}
          showOuterLabels={props.showOuterLabels}
          sectorBorderColor={props.sectorBorderColor}
          hoverAnimation={props.hoverAnimation}
          href={props.data[idx].href}
        />
      );
    });
    return (
      <g className='rd3-piechart-pie' transform={props.transform} >
        {arcs}
      </g>
    );
  }
});
