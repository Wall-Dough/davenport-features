var currentFeature = null; // The currently visible feature (i.e. array corresponding to jQuery object)

// Breakpoint for mobile styles
var mobileWidth = 852;

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
        $("#descriptions").append(span);


        // Add hotspot
        var hotspot = document.createElement("span");
        hotspot.setAttribute("class", "hotspot");
        $(this).append(hotspot);

        $(this).attr("class", "img" + hotspotArray[refId].img.toString());

        // Adds the hotspot to the hotspot styles
        var position = "{left:" + (hotspotArray[refId].left / images[hotspotArray[refId].img].width * 100).toString()
            + "%; top:" + (hotspotArray[refId].top / images[hotspotArray[refId].img].height * 100).toString() + "%;}";
        styles += "#features #" + refId + " .hotspot" + position;

        // Adds the hotspot to the mobile styles
        mobileStyles += "#featuresWrapper.mobile #features-images." + refId + "{left:-" + hotspotArray[refId].left.toString() + "px;top:-" + hotspotArray[refId].top.toString() + "px;}" +
            "#featuresWrapper.mobile #" + refId + " .hotspot {left:" + hotspotArray[refId].left.toString() + "px; top:" + hotspotArray[refId].top.toString() + "px;}";

        /*  The rollover event
            Allows for additional classes (e.g. bottom, right, etc.) */
        $(this).mouseenter(function () {
            $("#featuresWrapper").attr("class", "mobile");
            $("#features-images").attr("class", $(this).attr("id"));
            hideTooltip(currentFeature);
            currentFeature = $(this);
            var description = $("#descriptions #" + $(this).attr("id"));
            description[0].style.top = $(this).children(".hotspot").css("top");
            description[0].style.left = $(this).children(".hotspot").css("left");
            // If in mobile view, move tooltip to middle of window
            if (($(window).width() <= mobileWidth) && ($("#featuresWrapper").attr("class") == "mobile")) {
                description[0].style.left = "";
                description[0].style.top = parseInt($("#featuresWrapper").css("height")) / 2;
            }
            description.attr("class", "visible");
        });

        $(this).mouseleave(function () {
            hideTooltip(currentFeature);
        });

        // Adds mouseenter and mouseleave events for the descriptions
        $("#descriptions #" + refId).mouseenter(function() {
            $("#overlays #" + $(this).attr("id")).mouseenter();
        });

        $("#descriptions #" + refId).mouseleave(function() {
            $("#overlays #" + $(this).attr("id")).mouseleave();
        });
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
