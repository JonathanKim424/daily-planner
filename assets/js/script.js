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
    var rowID;
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = {};
        $(".row").each(function() {
            rowID = $(this).attr("id");
            tasks[rowID] = {};
        });
    }

    $(".row").each(function() {
        rowID = $(this).attr("id");
        $("#" + tasks[rowID].taskID).text(tasks[rowID].text);
    });
};

var saveTask = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

$("button").on("click", function() {
    var rowID = $(this).closest(".row").attr("id");
    var taskID = $("#" + rowID).children("textarea").attr("id");
    var taskText = $("#" + taskID).val().trim();
    tasks[rowID] = {
        taskID: taskID,
        text: taskText
    };
    saveTask();
})

currentDate();
loadTasks();