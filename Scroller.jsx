import React from "react";
import $ from "jquery";
import "./style.css"

export default function Scroller(props){    

    // TODO: add caching so it's not constantly recalculating body window
    // I can't just declare it up here because on initial
    // load it sees the DOM has a height of zero.

    $(window).on('scroll', function() {
        const maxHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        
        const baseHeight = $(window).height();
        const currentHeight = $(window).scrollTop() + baseHeight
        const scrollPercentage = ((currentHeight-baseHeight)/(maxHeight-baseHeight)*100);

        const magicNumber = 315;
        const magicMultiplier = 1.8;
        const circleFill = 159;
        $("#circle-lol").attr("stroke-dashoffset", `${magicNumber-(scrollPercentage*magicMultiplier)}px`);
        
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
        <div>
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
