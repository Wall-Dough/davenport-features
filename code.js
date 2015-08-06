var currentFeature = null; // The currently visible feature (i.e. array corresponding to jQuery object)

// Breakpoint for mobile styles
var mobileWidth = 852;
var mouseOver = false;

// Initializes the mobile hotspot and tooltip styles to be added later
var styles = "";
var mobileStyles = "@media only screen and (max-width: " + mobileWidth.toString() + "px) {";

var images = {
    0 : {
        id: "img0",
        width: 738,
        height: 529
    }
};

var hotspotArray = {
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
    $("#descriptions #" + feature.attr("id")).removeAttr("class");
    currentFeature = null;
}

function is_mobile() {
    return ($(window).width() <= mobileWidth) && ($("#featuresWrapper").attr("class") == "mobile");
}

function is_small() {
    return $(window).width() <= mobileWidth;
}

function showDescription(hotspot) {
    $("#featuresWrapper").attr("class", "mobile");
    $("#features-images").attr("class", hotspot.attr("id"));
    hideTooltip(currentFeature);
    currentFeature = hotspot;
    var descriptionQuery = "#descriptions #" + hotspot.attr("id");
    var description = $(descriptionQuery);
    description[0].style.top = hotspot.children(".hotspot").css("top");
    description[0].style.left = hotspot.children(".hotspot").css("left");
    description[0].style.width = "";
    // If in mobile view, move tooltip to middle of window
    if (is_mobile()) {
        description[0].style.left = "";
        description[0].style.top = parseInt($("#featuresWrapper").css("height")) / 2;
        description[0].style.width = parseInt($("#featuresWrapper").css("width")) - (parseInt(description.css("padding")) * 2);
    }

    description.attr("class", "visible");
}

function hotspot_mouseover(hotspot) {
    if (is_small()) {
        return;
    }
    showDescription(hotspot);
}

function hotspot_mouseout() {
    if (is_small()) {
        return;
    }
    hideTooltip(currentFeature);
}

function hotspot_mousedown(hotspot) {
    if (is_small()) {
        showDescription(hotspot);
    }
}

if ($("#featuresWrapper").length > 0) {
    // Create and add the descriptions box
    var descriptionsBox = document.createElement("section");
    descriptionsBox.setAttribute("id", "descriptions");
    descriptionsBox.setAttribute("style", "display: none;");
    $("#featuresWrapper").prepend(descriptionsBox);

    $("#overlays").children("a").each(function () {
        "use strict";

        var refId = $(this).attr("id");

        // Allows for link behavior
        $(this).attr("href", "javascript: void(0);");

        // Grab description
        var description = $(this).children(".description")[0].innerHTML;

        // Remove description
        $(this).children(".description").remove();

        // Add description to descriptions box
        var span = document.createElement("span");
        span.setAttribute("id", refId);
        span.innerHTML = description;
        var closeButton = document.createElement("span");
        closeButton.setAttribute("class", "close");
        $(closeButton).click(function () {
            hideTooltip(currentFeature);
        });
        $(span).prepend(closeButton);
        $("#descriptions").append(span);


        // Add hotspot
        var newHotspot = document.createElement("span");
        newHotspot.setAttribute("class", "hotspot");
        $(this).append(newHotspot);

        $(this).attr("class", "img" + hotspotArray[refId].img.toString());

        // Adds the hotspot to the hotspot styles
        var position = "{left:" + (hotspotArray[refId].left / images[hotspotArray[refId].img].width * 100).toString()
            + "%; top:" + (hotspotArray[refId].top / images[hotspotArray[refId].img].height * 100).toString() + "%;}";
        styles += "#features #" + refId + " .hotspot" + position;

        // Adds the hotspot to the mobile styles
        mobileStyles += "#featuresWrapper.mobile #features-images." + refId + "{left:-" + hotspotArray[refId].left.toString() + "px;top:-" + hotspotArray[refId].top.toString() + "px;}" +
            "#featuresWrapper.mobile #" + refId + " .hotspot {left:" + hotspotArray[refId].left.toString() + "px; top:" + hotspotArray[refId].top.toString() + "px;}";

        /*  The rollover event */
        $(this)[0].addEventListener("mouseover", function (e) {
            hotspot_mouseover($(this));
        });

        $(this)[0].addEventListener("mousedown", function (e) {
            hotspot_mousedown($(this));
        });

        $(this)[0].addEventListener("mouseout", function (e) {
            hotspot_mouseout();
        });

        // Adds mouseenter and mouseleave events for the descriptions
        $("#descriptions #" + refId)[0].addEventListener("mouseover", function (e) {
            hotspot_mouseover($("#overlays #" + $(this).attr("id")));
        });

        $("#descriptions #" + refId)[0].addEventListener("mousedown", function (e) {
            hotspot_mousedown($("#overlays #" + $(this).attr("id")));
        });

        $("#descriptions #" + refId)[0].addEventListener("mouseout", function (e) {
            hotspot_mouseout();
        });
    });

    $("#features")[0].addEventListener("mouseover", function (e) {
        if (is_small()) {
            hideTooltip(currentFeature);
        }
    });

    descriptionsBox.removeAttribute("style");

    // Adds the mobile styles to the document head
    mobileStyles += "}";
    var mobileStyleElement = document.createElement("style");
    mobileStyleElement.innerHTML = styles + mobileStyles;
    document.head.appendChild(mobileStyleElement);

    $("#expand").click(function () {
        $("#featuresWrapper").removeAttr("class");
    });
}
