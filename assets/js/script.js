var currentDayEl = document.querySelector("#currentDay");

var currentDate = function() {
    currentDayEl.textContent = moment().format("dddd, MMMM Do");
};

var currentHour = function() {
    var currHour = moment().hour();
    var textareaEl;

    if (currHour < 9) {
        for (var i = 9; i < 18; i++) {
            textareaEl = document.querySelector("#ta" + i);
            textareaEl.className = "col-lg-9 description future";
        }
    }
    else if (currHour >= 9 && currHour <= 17) {
        for (var i = 9; i < 18; i++) {
            textareaEl = document.querySelector("#ta" + i);
            if (currHour < i) {
                textareaEl.className = "col-lg-9 description future";
            }
            if (currHour === i) {
                textareaEl.className = "col-lg-9 description present";
            }
        }
    }
}

currentDate();
currentHour();