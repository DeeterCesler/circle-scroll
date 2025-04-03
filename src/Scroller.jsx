import React from "react";
import $ from "jquery";
import "./style.css"

export default function Scroller(props){    

    // TODO: add caching so it's not constantly recalculating body window
    // I can't just declare it up here because on initial
    // load it sees the DOM has a height of zero.

    $(window).on('scroll', function() {

        const bodyEl = $(".body-content");

        const bottomOfContent = bodyEl.get(0).getBoundingClientRect().height + bodyEl.offset().top;
        
        // the percentage of catch-up - the accelerator: 
        const scrollPercentAccelerator = 1 + bodyEl.offset().top / bottomOfContent;

        const scrollDistance = $(window).scrollTop() + $(window).height() - bodyEl.offset().top;
        const scrollPercentage =  Math.min(((scrollDistance * scrollPercentAccelerator)/bottomOfContent)*100, 100);

        /*  
            I hate this but I don't understand dasharray-offset enough to do better.

            0% read is 200% stroke offset.
            100% read is 40% stroke offset.
            As the user reads, 200% offset goes down to 40% offset.
        */

        const magicMultiplier = 2; // because e.g. 50% read * 2.4 => 120%, making the stroke offset halfway
        const magicNumber = 200;
        const circleFill = 40;
        const offSet = Math.max(-40, magicNumber-(scrollPercentage*magicMultiplier));

        const checkedOffset = offSet >= magicNumber ? magicNumber : offSet + (circleFill);
        $("#circle-lol").attr("stroke-dashoffset", `${checkedOffset}%`);
        
        if(offSet < magicNumber - circleFill) {
            $(".white-wrapper").removeClass('hidden').addClass('pop-in-initial');
            $(".x-mark").removeClass('hidden').addClass('pop-in-initial');
        }

        const circleProgressionPercentage = parseInt($("#circle-lol").attr("stroke-dashoffset"));
        if(circleProgressionPercentage <= circleFill && $(".checkmark").hasClass('hidden')) {
            $(".checkmark").removeClass('hidden').addClass('pop-in');
            $(".x-mark").addClass('hidden').removeClass('pop-in');
            $("#circle-lol").addClass('grey-out');
        }

        // this is a separate if-check to prevent adding the class repeatedly
        if (circleProgressionPercentage > circleFill && $(".checkmark").hasClass('pop-in')) {
            $(".checkmark").addClass('hidden').removeClass('pop-in');
            $(".x-mark").removeClass('hidden').addClass('pop-in');
            $("#circle-lol").removeClass('grey-out');
        }
    });
    
    return(        
        <div className="body-content">
            <a href={props.link} style={{maxHeight: 80}}>
                <div className="check-mark-wrapper">
                    <div className="circle-background"></div>
                    <div className="circle-wrapper">
                        <svg viewBox="0 0 100 100" height="150px" xmlns="http://www.w3.org/2000/svg" id="circle-wrapper">
                            <circle id="circle-lol" strokeLinecap="round"  
                            cx="50" cy="50" r="25" strokeWidth="2" fill="none" strokeDasharray="200%" strokeDashoffset="200%" />
                        </svg>
                    </div>
                    <div className="checkmark hidden">
                        <svg width="82px" height="82px" viewBox="0 0 100 100" id="check" xmlns="http://www.w3.org/2000/svg">
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
                    <div className="x-mark hidden">
                        <svg id="x-icon" fill="#000" width="40px" height="40px" viewBox="0 0 460.775 460.775" xmlns="http://www.w3.org/2000/svg">
                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                        </svg>
                    </div>
                    <div className="white-wrapper hidden">
                        <svg viewBox="0 0 100 100" height="150px" xmlns="http://www.w3.org/2000/svg" id="white-circle">
                            <circle strokeLinecap="round"  
                            cx="50" cy="50" r="29" strokeWidth="2" fill="white" strokeDasharray="315" strokeDashoffset="315" />
                        </svg>
                    </div>
                </div>
            </a>
            {props.children}
        </div>
    )
}
