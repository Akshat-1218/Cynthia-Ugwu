if(window.innerWidth > 768){
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
}
if(window.innerWidth <= 768){
    document.querySelector("#mini-circle").style.display = "none";
}

var timeout;

function animateFirstPage(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y : '-10',
        duration:1.2,
        opacity:0,
        ease: Expo.easeInOut,
    })

    tl.to(".bounding-elem",{
        y:0,
        ease: Expo.easeInOut,
        duration:1.4,
        stagger:0.2,
        delay:-1
    })

    tl.from("#hero-footer",{
        y:-10,
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut,
        delay:-1
    })
}

function circleSqueeze(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8,1.2,dets.clientX-xprev);
        yscale = gsap.utils.clamp(0.8,1.2,dets.clientY-yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMove(xscale,yscale);

        timeout = setTimeout(function(){
            this.document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
        },100)
    })
}
function circleMove(xscale,yscale){
    window.addEventListener("mousemove" , function(dets){
        this.document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}
if(window.innerWidth > 768){
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var rotdiff = 0;
    elem.addEventListener("mousemove",function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;

        rotdiff = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,rotdiff)
        })
    })
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3
        })
    })
})
}
circleMove();
circleSqueeze();
animateFirstPage();