'use strict';

var React = require('react');
var d3 = require('d3');


module.exports = React.createClass({

  displayName: 'Arc',

  propTypes: {
    fill: React.PropTypes.string,
    d: React.PropTypes.string,
    startAngle: React.PropTypes.number,
    endAngle: React.PropTypes.number,
    innerRadius: React.PropTypes.number,
    outerRadius: React.PropTypes.number,
    labelTextFill: React.PropTypes.string,
    valueTextFill: React.PropTypes.string,
    sectorBorderColor: React.PropTypes.string,
    showInnerLabels: React.PropTypes.bool,
    showOuterLabels: React.PropTypes.bool,
    href: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      labelTextFill: 'black',
      valueTextFill: 'white',
      showInnerLabels: true,
      showOuterLabels: true,
      href: null
    };
  },

  render() {
    var props = this.props;

    var arc = d3.svg.arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius)
      .startAngle(props.startAngle)
      .endAngle(props.endAngle);

    // forking for adding hrefs in the sloppy way that we have to given current support for SVG in React
    if (props.href) {
      return (
        <g
          className='rd3-piechart-arc'
          dangerouslySetInnerHTML={{__html: this.renderAnchor(props, arc)}}
        >
        </g>
      );
    } else {
      return (
        <g className='rd3-piechart-arc' >
          <path
            d={arc()}
            fill={props.fill}
            stroke={props.sectorBorderColor}
            onMouseOver={props.handleMouseOver}
            onMouseLeave={props.handleMouseLeave}
          />
          {props.showOuterLabels ? this.renderOuterLabel(props, arc) : null}
          {props.showInnerLabels ? this.renderInnerLabel(props, arc) : null}
        </g>
      );
    }
  },

  renderAnchor(props, arc) {
    var path = React.renderToString(this.renderArc(props, arc));
    var outerLabels = props.showOuterLabels ? React.renderToString(this.renderOuterLabel(props, arc)) : null;
    var innerLabels = props.showInnerLabels ? React.renderToString(this.renderInnerLabel(props, arc)) : null;
    return `<a xlink:href=${props.href}>${path}${outerLabels}${innerLabels}</a>`;
  },

  renderArc(props, arc) {
    return (
      <path
        d={arc()}
        fill={props.fill}
        stroke={props.sectorBorderColor}
        onMouseOver={props.handleMouseOver}
        onMouseLeave={props.handleMouseLeave}
      />
    )
  },

  renderInnerLabel(props, arc) {
    // shortcircuit for no inner labels
    if (!props.hasInnerLabels) return false;

    // make value text can be formatted
    var formattedValue = props.valueTextFormatter(props.value);
    return (
        <text
          className='rd3-piechart-value'
          transform={`translate(${arc.centroid()})`}
          dy='.35em'
          style={{
            'shapeRendering': 'crispEdges',
            'textAnchor': 'middle',
            'fill': props.valueTextFill
          }}>
          { formattedValue }
        </text>
      );
  },

  renderOuterLabel(props, arc) {
    // shortcircuit for no outer labels
    if (!props.hasOuterLabels) return false;

    var rotate = `rotate(${ (props.startAngle+props.endAngle)/2 * (180/Math.PI) })`;
    var positions = arc.centroid();
    var radius = props.outerRadius;
    var dist   = radius + 35;
    var angle  = (props.startAngle + props.endAngle) / 2;
    var x      = dist * (1.2 * Math.sin(angle));
    var y      = -dist * Math.cos(angle);
    var t = `translate(${x},${y})`;

    return  (
      <g>
        <line
          x1='0'
          x2='0'
          y1={-radius - 2}
          y2={-radius - 26}
          stroke={props.labelTextFill}
          transform={rotate}
          style={{
            'fill': props.labelTextFill,
            'strokeWidth': 2
          }}
          >
        </line>
        <text
          className='rd3-piechart-label'
          transform={t}
          dy='.35em'
          style={{
            'textAnchor': 'middle',
            'fill': props.labelTextFill,
            'shapeRendering': 'crispEdges'
          }}>
          {props.label}
        </text>
      </g>
    );
  }
});
