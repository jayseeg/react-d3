'use strict';

var React = require('react');

module.exports = React.createClass({

  displayName: 'BasicChart',

  propTypes: {
    title         : React.PropTypes.node,
    viewBox       : React.PropTypes.string,
    width         : React.PropTypes.number,
    height        : React.PropTypes.number,
    children      : React.PropTypes.node,
    headingStyles : React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      headingStyles: {}
    };
  },

  _renderTitle() {
    var props = this.props;

    if (props.title != null) {
      return (
        <h5 style={props.headingStyles}>{props.title}</h5>
      );
    } else {
      return null;
    }
  },

  _renderChart: function() {
    var props = this.props;

    return (
      <svg
        viewBox={props.viewBox}
        width={props.width}
        height={props.height}
      >
        {props.children}
      </svg>
    );
  },

  render: function() {
    if (this.props.title != null) {
      return (
        <div>
          {this._renderTitle()}
          {this._renderChart()}
        </div>
      );
    } else {
      return this._renderChart();
    }
  }
});
