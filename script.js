"use strict";

$(document).ready(function () {
    $(".retro_title").lettering();
});

$(document).ready(function () {
    animation();
}, 1000);



function animation() {
    var tMaxOptions = {
        onComplete: function () {
            $('.title_container').on("click", function () {
                animation();
            });
        },
        onStart: function () {
            $('.title_container').off();
        }
    };
        
    var title1 = new TimelineMax(tMaxOptions);

    title1.staggerFromTo(".retro_title span", 0.5, {
        ease: Back.easeOut.config(1.7),
        opacity: 0,
        bottom: -80
    }, {
        ease: Back.easeOut.config(1.7),
        opacity: 1,
        bottom: 0
    }, 0.05);

}
