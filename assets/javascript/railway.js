$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBV7ltGTDOw4yEyDVk-1YgQlRm7sJrB2lA",
        authDomain: "station-agent.firebaseapp.com",
        databaseURL: "https://station-agent.firebaseio.com",
        projectId: "station-agent",
        storageBucket: "",
        messagingSenderId: "839443847910"
    };
    firebase.initializeApp(config);

        // a variable to reference the database
        var database = firebase.database();

        // variables to define trains

        var trainName = "";
        var destination = "";
        var firstTrain = ""; //hh:mm am/pm May render differently on different browsers.
        //Observation: Firebase automatically logs hh:mm as HH:mm
        var frequency = 0; // a number to define minutes
        var nextArrival = "" //hh:mm am/pm. Calculated
        var minutesAway = 0 //Calculated via Firebase data and moment.js.

        //varibales for the interval updates
        var timeNumber; //sets number counter for the interval timer.
        var intervalId; //holds the interval ID when the run function executes

    //Global functions

    function run() {
        timeNumber = 60;   
        console.log(timeNumber);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        timeNumber--;
        console.log(timeNumber);
        if (timeNumber === 0) {
            stop();
        } 
    }

    function stop(){
        clearInterval(intervalId);
        displayTable();
    }
    //calculates the minutes away and next arrival times for trains.
    function arrivalCalc(){

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;

        // Minutes Until Train
        minutesAway = frequency - tRemainder;

        // Next Train Arrival
        nextArrival = moment().add(minutesAway, "minutes").format("LT");
    }

    function displayTable(){

        //empty out the contents of the current table body
        $("tbody").empty();
        //orders train info by date added and takes snapshot of data.
        database.ref("/trains").orderByChild("dateAdded").startAt(1).on("child_added", function(childSnapshot) {

            console.log(childSnapshot.val().trainName);  //monitoring purposes only
            console.log(childSnapshot.val().destination); //monitoring purposes only
            console.log(childSnapshot.val().frequency); //monitoring purposes only
            console.log(childSnapshot.val().firstTrain); //monitoring purposes only

            frequency = childSnapshot.val().frequency;
            firstTrain = childSnapshot.val().firstTrain;

            arrivalCalc();

            console.log("MINUTES TILL TRAIN: " + minutesAway); //monitoring purposes only
            console.log("Next Arrival: " + nextArrival); //monitoring purposes only

            var tBody = $("tbody");
            var tRow = $("<tr>");

            var trainTd = $("<td>").text(childSnapshot.val().trainName);
            var destinationTd = $("<td>").text(childSnapshot.val().destination);
            var frequencyTd = $("<td>").text(childSnapshot.val().frequency);
            var arrivalTd = $("<td>").text(nextArrival);
            var minAwayTd = $("<td>").text(minutesAway);

            tRow.append(trainTd, destinationTd, frequencyTd, arrivalTd, minAwayTd);
            tBody.append(tRow); 

        },  function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
        run();
    }
        
    $("#train-info").on("submit", function(event){
        event.preventDefault(); //prevents premature submission

        //pull data values from form
        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        firstTrain = $("#first-train").val().trim();

        //push values to Firebase
        database.ref("/trains").push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrain: firstTrain,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        //Clear the input data in the form.
        $("#train-name").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#first-train").val("");

        //Clears current interval and calls for train table to be redrawn.
        stop();
    });
    //Draw the initial table body upon opening the application using existing Firebase data.
    displayTable();
});   
