import React from "react";
import $ from "jquery";
import "./style.css";
export default function Scroller(props) {
  // TODO: add caching so it's not constantly recalculating body window
  // I can't just declare it up here because on initial
  // load it sees the DOM has a height of zero.
  $(window).on('scroll', function () {
    const bodyEl = $(".body-content");
    const bottomOfContent = bodyEl.get(0).getBoundingClientRect().height + bodyEl.offset().top; // the percentage of catch-up - the accelerator: 

    const scrollPercentAccelerator = 1 + bodyEl.offset().top / bottomOfContent;
    const scrollDistance = $(window).scrollTop() + $(window).height() - bodyEl.offset().top;
    const scrollPercentage = Math.min(scrollDistance * scrollPercentAccelerator / bottomOfContent * 100, 100);
    /*  
        I hate this but I don't understand dasharray-offset enough to do better.
         0% read is 200% stroke offset.
        100% read is 40% stroke offset.
        As the user reads, 200% offset goes down to 40% offset.
    */

    const magicMultiplier = 2; // because e.g. 50% read * 2.4 => 120%, making the stroke offset halfway

    const magicNumber = 200;
    const circleFill = 40;
    const offSet = Math.max(-40, magicNumber - scrollPercentage * magicMultiplier);
    const checkedOffset = offSet >= magicNumber ? magicNumber : offSet + circleFill;
    $("#circle-lol").attr("stroke-dashoffset", `${checkedOffset}%`);
    if (offSet < magicNumber - circleFill) $(".white-wrapper").removeClass('hidden').addClass('pop-in-initial');
    const circleProgressionPercentage = parseInt($("#circle-lol").attr("stroke-dashoffset"));

    if (circleProgressionPercentage <= circleFill && $(".checkmark").hasClass('hidden')) {
      $(".checkmark").removeClass('hidden').addClass('pop-in');
      $("#circle-lol").addClass('grey-out');
    } // this is a separate if-check to prevent adding the class repeatedly


    if (circleProgressionPercentage > circleFill && $(".checkmark").hasClass('pop-in')) {
      $(".checkmark").addClass('hidden').removeClass('pop-in');
      $("#circle-lol").removeClass('grey-out');
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "body-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "check-mark-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "circle-background"
  }), /*#__PURE__*/React.createElement("div", {
    className: "circle-wrapper"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    height: "150px",
    xmlns: "http://www.w3.org/2000/svg",
    id: "circle-wrapper"
  }, /*#__PURE__*/React.createElement("circle", {
    id: "circle-lol",
    strokeLinecap: "round",
    cx: "50",
    cy: "50",
    r: "25",
    strokeWidth: "2",
    fill: "none",
    strokeDasharray: "200%",
    strokeDashoffset: "200%"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "checkmark hidden"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "72px",
    height: "72px",
    viewBox: "0 0 100 100",
    id: "check",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    id: "color"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#000",
    d: "m61.5 23.3-8.013-8.013-25.71 25.71-9.26-9.26-8.013 8.013 17.42 17.44z"
  })), /*#__PURE__*/React.createElement("g", {
    id: "line"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "10",
    strokeWidth: "5",
    d: "m10.5 39.76 17.42 17.44 33.58-33.89-8.013-8.013-25.71 25.71-9.26-9.26z"
  })), /*#__PURE__*/React.createElement("g", {
    id: "line"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "none",
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "10",
    strokeWidth: "1",
    d: "m10.5 39.76 17.42 17.44 33.58-33.89-8.013-8.013-25.71 25.71-9.26-9.26z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "white-wrapper hidden"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    height: "150px",
    xmlns: "http://www.w3.org/2000/svg",
    id: "white-circle"
  }, /*#__PURE__*/React.createElement("circle", {
    strokeLinecap: "round",
    cx: "50",
    cy: "50",
    r: "29",
    strokeWidth: "2",
    fill: "white",
    strokeDasharray: "315",
    strokeDashoffset: "315"
  })))), props.children);
}