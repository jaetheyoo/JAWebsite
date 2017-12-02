"use strict";

$(document).ready(function () {
    $(".retro_title").lettering();
    generateProfiles();
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
    console.log(this);
    let $parent = $(this).parent();
    let $bounced = $($parent).find(".bounceOutLeft");
    if (($bounced).length > 0) {
        console.log(($bounced).length);
        $.each($bounced, function (containerNo, container) {
            console.log(container);
            $(container).addClass("bounceInLeft");
            $(container).removeClass("bounceOutLeft");
        });
    }
    $(this).toggleClass("bounceOutLeft");
    let $description = $(".bio_description_container");
    $($description).find("img").attr("src", $(this).find("img").attr("src"));
    $($description).find(".bio_content_description_name").text($(this).find(".hidden_information_name").text());
    $($description).find(".bio_content_description_position").text($(this).find(".hidden_information_position").text());
    $($description).find(".bio_content_description_bio").text($(this).find(".hidden_information_description").text());
    $($description).find(".bio_content_description").css("background-color", $(this).find(".bio_button").css("border-color"));
    $($description).find(".bio_content_picture_container").css("border-color", $(this).find(".bio_button").css("border-color"));
    
}
