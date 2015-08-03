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
    colors            : React.PropTypes.func,
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

    if (props.colorsArray && props.colorsArray.length) props.colors.range(props.colorsArray)

    var arcs = arcData.map((arc, idx) => {
      return (
        <ArcContainer
          {...props}
          key={idx}
          id={idx}
          startAngle={arc.startAngle}
          endAngle={arc.endAngle}
          outerRadius={props.radius}
          fill={props.colors(props.colorAccessor(arc, idx))}
          value={props.values[idx]}
          label={props.labels[idx]}
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
