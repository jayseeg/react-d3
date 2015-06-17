'use strict';

var React = require('react');


module.exports = React.createClass({

  displayName: 'Label',

  render() {
    var props = this.props;
    var strokeWidth = '0.01';
    if (props.label) {
      switch (props.orient) {
        case 'top':
          return (
            <text
              fill={props.labelColor}
              strokeWidth={strokeWidth}
              y={props.offset} x={props.width/2}
              textAnchor='middle' >
              {props.label}
            </text>
          );
        case 'bottom':
          return (
            <text
              fill={props.labelColor}
              strokeWidth={strokeWidth}
              y={props.offset} x={props.width/2}
              textAnchor='middle' >
              {props.label}
            </text>
          );
        case 'left':
        case 'leftFull':
          return (
            <text
              fill={props.labelColor}
              strokeWidth={strokeWidth}
              y={-props.offset} x={-props.height/2}
              textAnchor='middle'
              transform='rotate(270)'>
              {props.label}
            </text>
          );
        case 'right':
          return (
            <text
              fill={props.labelColor}
              strokeWidth={strokeWidth}
              y={props.offset} x={-props.height/2}
              textAnchor='middle'
              transform='rotate(270)'>
              {props.label}
            </text>
          );
      }
    }
    return <text/>;
  }

});


