var currentFeature = null; // The currently visible feature (i.e. array corresponding to jQuery object)

var images = {
    0 : {
        id: "img0",
        width: 738,
        height: 529
    }
};

var tokenArray = {
    ref1 : {
        img  : 0,
        left : 95,
        top  : 435
    },
    ref2 : {
        img  : 0,
        left : 180,
        top  : 314
    },
    ref3 : {
        img  : 0,
        left : 272,
        top  : 436
    },
    ref4 : {
        img  : 0,
        left : 389,
        top  : 352
    },
    ref5 : {
        img  : 0,
        left : 477,
        top  : 175
    },
    ref6 : {
        img  : 0,
        left : 691,
        top  : 254
    },
    ref7 : {
        img  : 0,
        left : 233,
        top  : 257
    }
};

function hideTooltip(feature) {
    if (feature === null) {
        return;
    }
    var descriptionClass = currentFeature.children(".description")[0].getAttribute("class");
    descriptionClass = descriptionClass.replace(" visible", "");
    currentFeature.children(".description")[0].setAttribute("class", descriptionClass);
    currentFeature = null;
}

if ($("#features").length > 0) {
    $("#overlays").children("a").each(function () {
        "use strict";

        var refId = $(this)[0].getAttribute("id");

        // Allows for link behavior
        $(this)[0].setAttribute("href", "javascript: void(0);");

        var token = $(this).children(".token")[0];
        token.style.left = (tokenArray[refId].left / images[tokenArray[refId].img].width * 100).toString() + "%";
        token.style.top = (tokenArray[refId].top / images[tokenArray[refId].img].height * 100).toString() + "%";

        $(this)[0].setAttribute("class", "img" + tokenArray[refId].img.toString());

        /*  The rollover event
            Allows for additional classes (e.g. bottom, right, etc.) */
        $(this).mouseenter(function () {
            $("#features")[0].setAttribute("class", "mobile");
            $("#features-images")[0].setAttribute("class", $(this)[0].getAttribute("id"));
            hideTooltip(currentFeature);
            currentFeature = $(this);
            var descriptionClass = currentFeature.children(".description")[0].getAttribute("class");
            descriptionClass += " visible";
            currentFeature.children(".description")[0].setAttribute("class", descriptionClass);
        });

        $(this).mouseleave(function () {
            hideTooltip(currentFeature);
        });
    });
}
