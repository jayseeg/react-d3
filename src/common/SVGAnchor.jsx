'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'SVGAnchor',

  getDefaultProps() {
    return {
      svgChildren: true
    }
  },

  getInitialState() {
    return {
      isHovered: false
    }
  },

  componentDidMount() {
    var props = this.props;
    var state = this.state;

    // if we have handed down the handlers && the element will be wrapped
    if (typeof props.handleMouseEnter === 'function') {
      var domNode = this.getDOMNode();

      // manually managing listeners due to use of dangerHTML
      domNode.addEventListener('mouseenter', this.dangerMouseEnterHandler);
      domNode.addEventListener('mouseleave', this.dangerMouseLeaveHandler);
    }
  },

  componentWillUnmount() {
      var domNode = this.getDOMNode();

      // manually managing listeners due to use of dangerHTML
      domNode.removeEventListener('mouseenter', this.dangerMouseEnterHandler);
      domNode.removeEventListener('mouseleave', this.dangerMouseLeaveHandler);
  },

  dangerMouseEnterHandler() {
    var props = this.props;
    var state = this.state;

    if (!state.isHovered) {
      props.handleMouseEnter(props.id);
      this.setState({isHovered: true});
    }
  },

  dangerMouseLeaveHandler() {
    var props = this.props;
    var state = this.state;
    
    if (state.isHovered) {
      props.handleMouseLeave(props.id);
      this.setState({isHovered: false});
    }
  },

  render() {
    var props = this.props

    // If there's a link target, render a string of html into
    // dangerouslySetInnerHTML on a wrapper element
    if (props.href && props.children) {
      var childs = props.children.map(child => {
        if (child && React.isValidElement(child)) return React.renderToString(child);
        else if (child) return child;
      }).join('');
      var hrefAttribute = 'href';
      var classAttribute = '';
      if (props.svgChildren) {
        hrefAttribute = 'xlink:href';
        classAttribute = `class='svgAnchor'`
      }
      var dangerHTML = {__html: `<a ${classAttribute} ${hrefAttribute}=${props.href}>${childs}</a>`};

      return <g dangerouslySetInnerHTML={dangerHTML}></g>;
    // Or just output an anonymous wrapper with the contents
    } else {
      return (
        <g>
          {props.children}
        </g>
      );
    }
  }
});