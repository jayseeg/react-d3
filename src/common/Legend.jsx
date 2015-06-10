'use strict';

var React = require('react');
var d3 = require('d3');
var SVGAnchor = require('./SVGAnchor.jsx');
var shade = require('../utils').shade;

module.exports = React.createClass({

  displayName: 'Legend',

  propTypes: {
    width:         React.PropTypes.number,
    height:        React.PropTypes.number,
    margins:       React.PropTypes.object,
    text:          React.PropTypes.string,
    colors:        React.PropTypes.oneOfType([
                     React.PropTypes.array,
                     React.PropTypes.func
                   ]),
    colorAccessor: React.PropTypes.func,
    legendKey:     React.PropTypes.string,
    prepender:     React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      text:          "#000",
      colors:        d3.scale.category20c(),
      colorAccessor: (d, idx) => idx,
      legendKey:     'name',
      prepender:     () => undefined,
      totalAccessor: (mem, d) => mem + d.value,
      hoverData:     [],
      handleHover:   () => undefined,
      handleHoverOff:() => undefined
    };
  },

  // handleHover: function( idx ) {
  //   this.props.handleHover( idx )

  //           handleHover={this.handleHover}
  //           handleHoverOff={this.handleHoverOff}
  // },

  // handleHoverOff: function( idx ) {
  //   this.setState({hoverData: hoverData});
  // },

  render: function() {
    var props = this.props;

    var legendItems = [];

    // Default to blank prepend
    var prependWithTotal = () => '';
    // If prepender actually returns, assume it's meant to be used
    if (typeof props.prepender() !== 'undefined') {
      var GetTotalWith = function GetTotalWith (valAccessor) {
        return arr => arr.reduce((mem, datum) => mem + datum[valAccessor], 0);
      };
      // Setup a sum function with a custom key
      var getTotalWithAccessor = GetTotalWith(props.valueAccessor);
      // Setup a prepend function based on supplied prepender w/ our total
      prependWithTotal = props.prepender(getTotalWithAccessor(props.data));
    }

    props.data.forEach( (series, idx) => {

      var itemStyle = {
        color: props.colors[props.colorAccessor(series, idx)]
      };

      var dotColor = props.colors[props.colorAccessor(series, idx)];
      var diameter = 8;
      var offset = 0;
      if (props.hoverData.length && props.hoverData[idx].isHovered) {
        dotColor = shade(props.colors[props.colorAccessor(series, idx)], 0.2);
        diameter = 12;
        offset = 2;
      };

      var dotStyle = {
        display: 'inline-block',
        width: diameter,
        height: diameter,
        bottom: 0 - offset,
        marginLeft: 0 - offset,
        marginRight: 5 - offset,
        borderRadius: 99,
        backgroundColor: dotColor,
        position: 'relative',
        transition: 'background-color ease-in-out 0.111s',
      };

      // Use prepender to generate string to prepend
      var prepend = prependWithTotal(series[props.valueAccessor]);

      var children = [`${prepend}${series[props.legendKey]}`];

      var textStyle = {
        color: props.text,
        verticalAlign: 'top'
      };

      legendItems.push(
        <li
          style={itemStyle}
          key={idx}
          id={idx}
          onMouseEnter={props.handleHover.bind(this, idx)}
          onMouseLeave={props.handleHoverOff.bind(this, idx)}
        >
          <span
            style={textStyle}
          >
            <SVGAnchor
              {...series}
              svgChildren={false}
            >
              <div style={dotStyle}></div>
              {children}
            </SVGAnchor>
          </span>
        </li>
      );

    });

    // In preparation for legend positioning
    var legendFloat = 'right';

    var topMargin = props.margins.top;

    var legendBlockStyle = {
      wordWrap: 'break-word',
      width: props.width,
      paddingLeft: 0,
      marginTop: topMargin,
      marginLeft: 0,
      marginBottom: 0,
      float: legendFloat,
      listStyle: 'none'
    };

    return <ul style={legendBlockStyle}>{legendItems}</ul>;
  }

});
