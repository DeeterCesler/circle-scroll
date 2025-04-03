import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "./style.css";
export default function Scroller({
  link,
  children,
  checkmarkIcon,
  xMarkIcon,
  iconColor = "#000"
}) {
  const bodyElRef = useRef(null);
  const bottomOfContentRef = useRef(null);
  const [showWhite, setShowWhite] = useState(false);
  const [showX, setShowX] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isGreyed, setIsGreyed] = useState(false);
  const recalculateValues = () => {
    if (bodyElRef.current) {
      bottomOfContentRef.current = bodyElRef.current.get(0).getBoundingClientRect().height + bodyElRef.current.offset().top;
    }
  };
  useEffect(() => {
    // Cache the body element and initial calculations once the component mounts
    bodyElRef.current = $(".body-content");
    recalculateValues();
    const handleScroll = () => {
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();
      const contentOffset = bodyElRef.current.offset().top;
      const contentHeight = bodyElRef.current.get(0).getBoundingClientRect().height;

      // Calculate how far we've scrolled relative to the content
      const scrollDistance = scrollTop + windowHeight - contentOffset;
      const totalScrollableDistance = contentHeight;

      // Calculate percentage, ensuring we reach 100% when we hit the bottom
      const scrollPercentage = Math.min(scrollDistance / totalScrollableDistance * 100, 100);
      const magicMultiplier = 2;
      const magicNumber = 200;
      const circleFill = 40;
      const offSet = Math.max(-40, magicNumber - scrollPercentage * magicMultiplier);
      const checkedOffset = offSet >= magicNumber ? magicNumber : offSet + circleFill;
      $("#circle-lol").attr("stroke-dashoffset", `${checkedOffset}%`);
      if (offSet < magicNumber - circleFill) {
        setShowWhite(true);
        setShowX(true);
      }
      const circleProgressionPercentage = parseInt($("#circle-lol").attr("stroke-dashoffset"));
      if (circleProgressionPercentage <= circleFill) {
        setShowX(false);
        setShowCheckmark(true);
        setIsGreyed(true);
      }
      if (circleProgressionPercentage > circleFill) {
        setShowCheckmark(false);
        setIsGreyed(false);
      }
    };
    const handleResize = () => {
      recalculateValues();
      handleScroll(); // Recalculate scroll position after resize
    };
    $(window).on('scroll', handleScroll);
    $(window).on('resize', handleResize);

    // Cleanup function to remove the event listeners
    return () => {
      $(window).off('scroll', handleScroll);
      $(window).off('resize', handleResize);
    };
  }, []);
  const renderCheckmark = () => {
    if (checkmarkIcon) {
      return /*#__PURE__*/React.createElement("div", {
        className: `checkmark ${!showCheckmark ? 'hidden' : ''}`
      }, typeof checkmarkIcon === 'string' && checkmarkIcon.endsWith('.svg') ? /*#__PURE__*/React.createElement("img", {
        src: checkmarkIcon,
        alt: "Checkmark",
        width: "82",
        height: "82"
      }) : checkmarkIcon);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: `checkmark ${!showCheckmark ? 'hidden' : ''}`
    }, /*#__PURE__*/React.createElement("svg", {
      width: "82px",
      height: "82px",
      viewBox: "0 0 100 100",
      id: "check",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("g", {
      id: "color"
    }, /*#__PURE__*/React.createElement("path", {
      fill: iconColor,
      d: "m61.5 23.3-8.013-8.013-25.71 25.71-9.26-9.26-8.013 8.013 17.42 17.44z"
    }))));
  };
  const renderXMark = () => {
    if (xMarkIcon) {
      return /*#__PURE__*/React.createElement("div", {
        className: `x-mark ${!showX ? 'hidden' : ''}`
      }, typeof xMarkIcon === 'string' && xMarkIcon.endsWith('.svg') ? /*#__PURE__*/React.createElement("img", {
        src: xMarkIcon,
        alt: "X Mark",
        width: "40",
        height: "40"
      }) : xMarkIcon);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: `x-mark ${!showX ? 'hidden' : ''}`
    }, /*#__PURE__*/React.createElement("svg", {
      id: "x-icon",
      fill: iconColor,
      width: "40px",
      height: "40px",
      viewBox: "0 0 460.775 460.775",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
    })));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "body-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scroller-container"
  }, /*#__PURE__*/React.createElement("a", {
    href: link
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
    strokeDashoffset: "200%",
    className: isGreyed ? 'grey-out' : ''
  }))), renderCheckmark(), renderXMark(), /*#__PURE__*/React.createElement("div", {
    className: `white-wrapper ${!showWhite ? 'hidden' : ''}`
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
  })))))), children);
}