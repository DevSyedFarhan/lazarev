function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function navAnim(){
    let nav = document.querySelector("nav");

nav.addEventListener("mouseenter", function(){
    let tl = gsap.timeline()
    tl.to("#nav-btm",{
        height: "20vh",
    })
    tl.to("#nav-p2 h5",{
        display : "block",
    })
    tl.to("#nav-p2 h5 span",{
        y:0,
        delay : -.5,
        stagger : {
            amount : .7,
        }
    })
})
nav.addEventListener("mouseleave", function(){
    let tl = gsap.timeline()
    tl.to("#nav-p2 h5 span",{
        y:20,
        stagger : {
            amount : .1,
        }
    })
    tl.to("#nav-p2 h5",{
        display : "none",
    })
    tl.to("#nav-btm",{
        height: "0",
    })

})
}


function elemanim(){
let relem = document.querySelectorAll(".right-elem");

relem.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        gsap.to(elem.childNodes[3],{
            opacity : 1,
            scale : 1,
        })
    })
    elem.addEventListener("mouseleave", function(){
        gsap.to(elem.childNodes[3],{
            opacity : 0,
            scale : 0,
        })
    })
    elem.addEventListener("mousemove", function(dets){
        gsap.to(elem.childNodes[3], {
            x: dets.x - elem.getBoundingClientRect().x - 60,
            y: dets.y - elem.getBoundingClientRect().y - 140
        })
    })
})
}

function page3Animation(){
    
let page3Center = document.querySelector(".page3-center");
let video = document.querySelector("#page3>video")

page3Center.addEventListener("click", function(){
    video.play()
    gsap.to(video,{
        transform: "scaleX(1) scaleY(1)",
        opacity : 1,
        ease : Power1,
        borderRadius : 0,
    })
})
video.addEventListener("click", function(){
    video.pause()
    gsap.to(video,{
        ease : Power1,
        borderRadius : "30px",
        transform: "scaleX(.7) scaleY(0)",
        opacity : 0,
    })
})
}

function videoanim(){
    let sections = document.querySelectorAll(".sec-right");

sections.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        elem.childNodes[3].style.opacity = 1;
        elem.childNodes[3].play()
    })
    elem.addEventListener("mouseleave", function(){
        elem.childNodes[3].style.opacity = 0;
        elem.childNodes[3].load()
    })
})
}

function btmanim(){
    gsap.from(".btm6 h4", {
        x: 0,
        duration: 2,
        stagger:{
            amount: -2
        },
        scrollTrigger: {
            trigger : ".btm6",
            scroller : "#main",
            start : "top 80%",
            end : "top -10%",
            scrub : true,
        }
    })
}

function loader(){
    let tl = gsap.timeline();

tl.from("#page1",{
    opacity: 0,
    duration:1,
    ease: Power1,
})
tl.from("#page1",{
    transform: "scaleX(0.7) scaleY(.2)",
    duration: 1,
    delay: -1,
    ease: Power1,
})
tl.from("nav",{
    opacity: 0,
    duration: 0.5,
    ease: Power1,
})
tl.from("#page1 h1, #page1 p, #page1 div",{
    opacity: 0,
    duration: 0.5,
    stagger: .1,
    ease: Power1,
})
}

loco();
loader()
page3Animation();
navAnim();
elemanim();
videoanim();
btmanim();
