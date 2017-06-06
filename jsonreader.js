(function(window) {
  //JSON reader by Kyle Robles for Shopstyle
  //Import jQuery functionality and establish base variables of TRUECOUNT, FALSECOUNT, and the base URL
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var JSON_URL = 'http://api.viki.io/v4/videos.json?app=100250a&per_page=10&page=';
  var TRUECOUNT = 0;
  var FALSECOUNT = 0;

  function readJSON(file) {
    //Function to read through response array for the current JSON
    for (let i = 0; i < file.response.length; i++){
      if (file.response[i].flags.hd === true) {
        //Increment # of responses with flags.hd set as true
        TRUECOUNT++;
      } else if (file.response[i].flags.hd === false) {
        //Increment # of response with flags.hd set as false
        FALSECOUNT++;
      }
    };
  };


  function getFile(index) {
    //Recursive function to read through JSON files using jQuery's getJSON
    $.getJSON(JSON_URL + index, function(data){
      console.log("Reading through JSON files...");
      readJSON(data);
      if (data.more){
        //Check if more field is true in order to access the next data set
        getFile(index+1);
      } else if (!data.more) {
        //Show the final tally of flags set to true and false
        console.log("Number of responses with flags.hd set to true: " + TRUECOUNT);
        console.log("Number of responses with flags.hd set to false: " + FALSECOUNT);
        //Reset variables after data is shown
        TRUECOUNT = 0;
        FALSECOUNT = 0;
      }
    });
  };

  function mainLoop() {
    //Main Loop to initiate read JSON file
      getFile(1);
  };


  App.mainLoop = mainLoop;
  App.readJSON = readJSON;
  window.App = App;
})(window);
