"use strict";

$(document).ready(function () {
    $(".retro_title").lettering();
    generateProfiles();
});

$(document).ready(function () {
    animation();
}, 1000);


jQuery(function () {
    var navBar = {
        hasScrolledClass: false,

        elements: [],

        init: function (elements) {
            this.elements = elements;
        },

        add: function () {
            if (!this.hasScrolledClass) {
                this.elements.forEach(function (element) {
                    element.addClass("page_scrolled");
                });
            }

            this.hasScrolledClass = true;
        },

        remove: function () {
            if (this.hasScrolledClass) {
                this.elements.forEach(function (element) {
                    element.removeClass("page_scrolled");
                });
            }
            this.hasScrolledClass = false;
        }
    }
    
    navBar.init([$(".slide_bar_container"), $(".navbar")]);
    
    function scrollManager() {
        var scrollThreshold = 400;
        var yOffset = 0;
        var currYOffset = window.pageYOffset;
        if(yOffset + scrollThreshold < currYOffset) {
            navBar.add();
        } else {
            navBar.remove();
        }
    }
    
    window.onscroll = function(e) {
        scrollManager();
    }
});

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

function generateProfiles() {
    var $genericBio = $(".bio_container").detach();
    let $bioCardsContainer = $(".bio_cards_container");
    $.each(global_data.bios, function (index, bio) {
        if (bio.name == "filler") {
            let $newBio = $genericBio.clone(true, true, true);
            $newBio.find("button").css("visibility", "hidden");
            $bioCardsContainer.append($newBio);
        } else {
            let $newBio = $genericBio.clone(true, true, true);
            $newBio.find("img").attr("src", bio.imgPath);
            $newBio.find("p.bio_title").html("<strong>" + bio.funTitle + "</strong>");
            $newBio.find("p.hidden_information_description").text(bio.description);
            $newBio.find("p.hidden_information_position").text(bio.position);
            $newBio.find("p.hidden_information_name").text(bio.name);

            $newBio.find("button").css("border-color", bio.color);
            $newBio.click(bioSwapEventHandler);
            $bioCardsContainer.append($newBio);
        }
    })
}

function bioSwapEventHandler() {
    let $parent = $(this).parent();
    let $bounced = $($parent).find(".flipOutY");
    if (($bounced).length > 0) {
        $.each($bounced, function (containerNo, container) {
            console.log(container);
            $(container).addClass("flipInY");
            $(container).removeClass("flipOutY");
        });
    }
    $(this).toggleClass("flipOutY");
    let $description = $(".bio_description_container");
    $($description).find(".bio_content_picture").removeClass("flipInY");

    $($description).find("img").attr("src", $(this).find("img").attr("src"));
    $($description).find(".bio_content_description_name").text($(this).find(".hidden_information_name").text());
    $($description).find(".bio_content_description_position").text($(this).find(".hidden_information_position").text());
    $($description).find(".bio_content_description_bio").text($(this).find(".hidden_information_description").text());
    $($description).find(".bio_content_description").css("background-color", $(this).find(".bio_button").css("border-color"));
    $($description).find(".bio_content_picture_container").css("border-color", $(this).find(".bio_button").css("border-color"));
    console.log($($description).find(".bio_content_picture"));
    
    $($description).find(".bio_content_picture").addClass("flipInY");
}
