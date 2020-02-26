// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)
(function(){

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using the 'speak' method or either helloSpeaker's or byeSpeaker's
  // 'speak' method.
  // See Lecture 50, part 1
  for (var index = 0; index < names.length; index++) {
  
    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var name = names[index];
    var firstLetter = name.charAt(0).toLowerCase();
  
    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter == "j") {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

  // Part #2 of Assignment.  Use map function to print names and pass it a delegate function.
  var newNames = names.map(createSpeakName);
  for (var index = 0; index < newNames.length; index++){
    console.log(newNames[index]);
  }

  var speakReducer = (acc, val) => { 
    if(val.charAt(0).toLowerCase() == "j"){
      acc.bye.push(byeSpeaker.speakSimple(val));
    } else {
      acc.hello.push(helloSpeaker.speakSimple(val)); 
    }
    // Note: Previously had this in here, which would fill both arrays with ALL names prefixed with Hello/Goodbye respectively
    // However, based on re-reading the final sentence of the assignment:
    // "The end result should be that the list prints out 3 times. The 3rd time, it will print each group of greetings separately"
    //  acc.hello.push(helloSpeaker.speakSimple(val)); 
    //  acc.bye.push(byeSpeaker.speakSimple(val));
      
    return acc;
  };

  var messages = names.reduce(speakReducer, { hello: [], bye: []});

  for (var index = 0; index < messages.hello.length; index++){
    console.log(messages.hello[index]);
  }
  
  for (var index = 0; index < messages.bye.length; index++){
    console.log(messages.bye[index]);
  }
  
  // Per guidelines, the function passed into the map function should not be an inline function, 
  // i.e., separate it into its own named function and pass it into the map function as a value.
  function createSpeakName(name){
    var firstLetter = name.charAt(0).toLowerCase();
  
    if (firstLetter == "j") {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }

})();
