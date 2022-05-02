import React from "react";
import $ from "jquery";
import "./style.css"

export default function Scroller(props){    

    // TODO: add caching so it's not constantly recalculating body window
    // I can't just declare it up here because on initial
    // load it sees the DOM has a height of zero.

    $(window).on('scroll', function() {
        // get content element height
        // get distance of element height from top of page
        // get scroll distance
        // get % of scroll distance / (el height  + dis from top)

        console.log('the four')
        const bodyEl = $(".body-content");
        console.log(bodyEl.height())
        console.log(bodyEl.get(0).getBoundingClientRect().bottom)
        console.log(bodyEl.get(0).getBoundingClientRect().y * -1)
        
        const bottomOfContent = bodyEl.get(0).getBoundingClientRect().bottom + (bodyEl.get(0).getBoundingClientRect().y * -1);
        const scrollDistance = $(window).scrollTop();
        console.log('scrollDistance')
        console.log(bottomOfContent)
        console.log(scrollDistance)
        // var elDistanceToTop = window.pageYOffset + el.getBoundingClientRect().top
        
        const baseHeight = bodyEl.height();
        // const baseHeight = $(window).height();
        const currentHeight = $(".body-content").scrollTop() + baseHeight
        // console.log(currentHeight)
        const scrollPercentage =  ((scrollDistance)/(bottomOfContent)*100);
        console.log('scrollPercentage')
        console.log(scrollPercentage)

        // I hate this but I don't understand dasharray-offset enough to do better.
        const magicNumber = 315;
        const magicMultiplier = 1.55;
        const circleFill = 159;
        const offSet = magicNumber-(scrollPercentage*magicMultiplier)
        $("#circle-lol").attr("stroke-dashoffset", `${offSet > 0 ? offSet : 0}px`);
        
        if(scrollPercentage > 1) $(".white-wrapper").removeClass('hidden').addClass('pop-in-initial');

        const circleProgression = parseInt($("#circle-lol").attr("stroke-dashoffset"));
        if(circleProgression <= circleFill) {
            $(".checkmark").removeClass('hidden').addClass('pop-in');
            $("#circle-lol").addClass('grey-out');
        }

        if(circleProgression > circleFill) {
            $(".checkmark").addClass('hidden').removeClass('pop-in');
            $("#circle-lol").removeClass('grey-out');
        }
    });
    
    return(
        <div className="body-content">
            <div className="check-mark-wrapper">
                <div className="circle-background"></div>
                <div className="circle-wrapper">
                    <svg viewBox="0 0 100 100" height="150px" xmlns="http://www.w3.org/2000/svg" id="circle-wrapper">
                        <circle id="circle-lol" strokeLinecap="round"  
                        cx="50" cy="50" r="25" strokeWidth="2" fill="none" strokeDasharray="315" strokeDashoffset="315" />
                    </svg>
                </div>
                <div className="checkmark hidden">
                    <svg width="72px" height="72px" viewBox="0 0 100 100" id="check" xmlns="http://www.w3.org/2000/svg">
                        <g id="color">
                        <path fill="#000" d="m61.5 23.3-8.013-8.013-25.71 25.71-9.26-9.26-8.013 8.013 17.42 17.44z"/>
                        </g>
                        <g id="line">
                        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" d="m10.5 39.76 17.42 17.44 33.58-33.89-8.013-8.013-25.71 25.71-9.26-9.26z"/>
                        </g>
                        <g id="line">
                        <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1" d="m10.5 39.76 17.42 17.44 33.58-33.89-8.013-8.013-25.71 25.71-9.26-9.26z"/>
                        </g>
                    </svg>
                </div>
                <div className="white-wrapper hidden">
                    <svg viewBox="0 0 100 100" height="150px" xmlns="http://www.w3.org/2000/svg" id="white-circle">
                        <circle strokeLinecap="round"  
                        cx="50" cy="50" r="29" strokeWidth="2" fill="white" strokeDasharray="315" strokeDashoffset="315" />
                    </svg>
                </div>
            </div>
            {props.children}
        </div>
    )
}
