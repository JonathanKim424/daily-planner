// init tasks object
var tasks = {};

// uses moment() to pull current date and hour
var currentDate = function() {
    // current date
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    // current hour
    var currHour = moment().hour();
    // loops through each textarea and assigns appropriate class dependant on hour
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

// loads tasks from localStorage
var loadTasks = function() {
    var rowID; //utility var
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if no localStorage exists, defaults empty object set
    if (!tasks) {
        tasks = {};
        $(".row").each(function() {
            rowID = $(this).attr("id");
            tasks[rowID] = {};
        });
    }

    /* cycles through each time-block, via "row" class and assigns text as per
    what is loaded in the tasks object */
    $(".row").each(function() {
        rowID = $(this).attr("id");
        $("#" + tasks[rowID].taskID).text(tasks[rowID].text);
    });
};

// saves current tasks{} object
var saveTask = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

/* audits task so that unsaved tasks are greyed out and saved
ones are confirmed as black */
var auditTask = function(taskID) {
    // function is given the textarea id based on either save or unfocus trigger
    var rowID = $("#" + taskID).closest(".row").attr("id");
    var currTxt = $("#" + taskID).val();
    var saveTxt = tasks[rowID].text;

    // pulls text value from given textarea and compares with saved value in the task object
    if (currTxt != saveTxt) {
        $("#" + taskID).css("color", "grey");
    }
    if (currTxt === saveTxt) {
        $("#" + taskID).css("color", "black");
    }
};

// event listener for clicks on save button
$("button").on("click", function() {
    // pulls id for row, and id and text from text area
    var rowID = $(this).closest(".row").attr("id");
    var taskID = $("#" + rowID).children("textarea").attr("id");
    var taskText = $("#" + taskID).val().trim();
    // updates task object parameters based on the rowID identifier
    // with textarea ID for utility and text for value
    tasks[rowID] = {
        taskID: taskID,
        text: taskText
    };
    // saves to localStorage
    saveTask();
    // audits task by forwarding textarea id
    auditTask(taskID);
});

// when textarea is clicked off, runs audit task
$("textarea").on("blur", function() {
    // sends textarea id of given target
    var taskID = $(this).attr("id");
    auditTask(taskID);
});

// every 30 min, runs currentDate() to update date and hour
setInterval(function() {
    currentDate();
}, (1000 * 60) * 30);

// initial execute for date and hour, as well as localStorage check
currentDate();
loadTasks();