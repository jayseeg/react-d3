'use strict';

var React = require('react');
var d3 = require('d3');
var FuelGauge = require('./FuelGauge');

module.exports = React.createClass({
  displayName: 'DataSeries',

  propTypes: {
    data      : React.PropTypes.array,
    color     : React.PropTypes.string,
    bgColor   : React.PropTypes.string,
    title     : React.PropTypes.string,
    thickness : React.PropTypes.number,
    values    : React.PropTypes.array,
    domainMax : React.PropTypes.number
  },

  render: function() {
    var props = this.props;
    var state = this.state;

    var pie = d3.layout
      .pie()
      .sort(null);

    var arcData = pie(props.values);

    return (
      <g className='rd3-fuelgaugechart-fuelgauge'>
        <FuelGauge 
          {...props}
          arcData={arcData}
        />
      </g>
    );
  }
});