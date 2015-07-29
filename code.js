var currentFeature = null; // The currently visible feature (i.e. array corresponding to jQuery object)

if ($("#features").length > 0) {
    $("#features ol li").children("a").each(function () {
        "use strict";

        // Allows for link behavior
        $(this)[0].setAttribute("href", "javascript: void(0);");

        /*  The rollover event
            Allows for additional classes (e.g. bottom, right, etc.) */
        $(this).mouseenter(function () {
            var labelClass;
            var descriptionClass;
            if (currentFeature !== null) {
                labelClass = currentFeature.children(".token").children(".label")[0].getAttribute("class");
                descriptionClass = currentFeature.children(".description")[0].getAttribute("class");
                labelClass = labelClass.replace(" visible", "");
                descriptionClass = descriptionClass.replace(" visible", "");
                currentFeature.children(".token").children(".label")[0].setAttribute("class", labelClass);
                currentFeature.children(".description")[0].setAttribute("class", descriptionClass);
            }
            currentFeature = $(this);
            labelClass = currentFeature.children(".token").children(".label")[0].getAttribute("class");
            descriptionClass = currentFeature.children(".description")[0].getAttribute("class");
            labelClass += " visible";
            descriptionClass += " visible";
            currentFeature.children(".token").children(".label")[0].setAttribute("class", labelClass);
            currentFeature.children(".description")[0].setAttribute("class", descriptionClass);
        });
        // TODO: Responsive!
    });
}
