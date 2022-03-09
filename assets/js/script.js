var containerEl = document.querySelector(".container");
var tasks = {};

var currentDate = function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    var currHour = moment().hour();
    for (var i = 9; i < 18; i++) {
        $("#ta" + i).removeClass("past present future");
        if (currHour === i) {
            $("#ta" + i).addClass("present");
        }
        if (currHour < i) {
            $("#ta" + i).addClass("future")
        }
        if (currHour > i) {
            $("#ta" + i).addClass("past")
        }
    }
};

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = {
            textID: [],
            text: []
        };
    }

    $.each(tasks, function(list, arr) {
        arr.forEach(function(task) {
        })
    })
};

var saveTask = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

$("button").on("click", function() {
    var taskID = $(this).closest("textarea").attr("id");

    console.log(taskID);
    // saveTask();
})

var taskHandler = function(event) {
    var targetEl = event.target;


};

currentDate();

containerEl.addEventListener("click", taskHandler);