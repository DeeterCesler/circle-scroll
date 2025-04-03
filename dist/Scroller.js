import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "./style.css";
export default function Scroller(props) {
  const bodyElRef = useRef(null);
  const bottomOfContentRef = useRef(null);
  const scrollPercentAcceleratorRef = useRef(null);
  useEffect(() => {
    // Cache the body element and initial calculations once the component mounts
    bodyElRef.current = $(".body-content");
    bottomOfContentRef.current = bodyElRef.current.get(0).getBoundingClientRect().height + bodyElRef.current.offset().top;
    scrollPercentAcceleratorRef.current = 1 + bodyElRef.current.offset().top / bottomOfContentRef.current;
    const handleScroll = () => {
      const scrollDistance = $(window).scrollTop() + $(window).height() - bodyElRef.current.offset().top;
      const scrollPercentage = Math.min(scrollDistance * scrollPercentAcceleratorRef.current / bottomOfContentRef.current * 100, 100);
      const magicMultiplier = 2;
      const magicNumber = 200;
      const circleFill = 40;
      const offSet = Math.max(-40, magicNumber - scrollPercentage * magicMultiplier);
      const checkedOffset = offSet >= magicNumber ? magicNumber : offSet + circleFill;
      $("#circle-lol").attr("stroke-dashoffset", `${checkedOffset}%`);
      if (offSet < magicNumber - circleFill) {
        $(".white-wrapper").removeClass('hidden').addClass('pop-in-initial');
        if ($(".checkmark").hasClass('hidden')) {
          $(".x-mark").removeClass('hidden').addClass('pop-in-initial');
        }
      }
      const circleProgressionPercentage = parseInt($("#circle-lol").attr("stroke-dashoffset"));
      if (circleProgressionPercentage <= circleFill && $(".checkmark").hasClass('hidden')) {
        $(".checkmark").removeClass('hidden').addClass('pop-in');
        $(".x-mark").addClass('hidden');
        $("#circle-lol").addClass('grey-out');
      }
      if (circleProgressionPercentage > circleFill) {
        $(".checkmark").addClass('hidden').removeClass('pop-in');
        $("#circle-lol").removeClass('grey-out');
      }
    };
    $(window).on('scroll', handleScroll);

    // Cleanup function to remove the scroll listener
    return () => {
      $(window).off('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return /*#__PURE__*/React.createElement("div", {
    className: "body-content"
  }, /*#__PURE__*/React.createElement("a", {
    href: props.link,
    style: {
      maxHeight: 80
    }
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
    width: "82px",
    height: "82px",
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
    className: "x-mark hidden"
  }, /*#__PURE__*/React.createElement("svg", {
    id: "x-icon",
    fill: "#000",
    width: "40px",
    height: "40px",
    viewBox: "0 0 460.775 460.775",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
  }))), /*#__PURE__*/React.createElement("div", {
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
  }))))), props.children);
}