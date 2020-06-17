/******


Consumer in ndnjs
@author: Junior DONGO


***************/


var readline = require('readline');
var Face = require('.').Face;
var Name = require('.').Name;
var Blob = require('.').Blob;
var Interest = require('.').Interest;
var Data = require('.').Data;

var SafeBag = require('.').SafeBag;
var KeyChain = require('.').KeyChain;
var KeyType = require('.').KeyType;
var ChronoSync2013 = require('.').ChronoSync2013;
var UnixTransport = require('.').UnixTransport;

var face = new Face(new UnixTransport());	

function onData(interest, data) {
  console.log("Received " + data.getName().toUri());
  console.log(data.getContent().buf().toString('binary'));
  face.close();
}

function onTimeout(interest) {
  console.log("Time out for interest " + interest.getName().toUri());
  face.close();  // This will cause the script to quit.
};


// Gives the posibility to type the name for the interest
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the name of the interest: ", function(word) {
  var name = new Name(word);
  //name.append(word);
  var inter = new Interest();
    inter.setName(name);
    inter.setInterestLifetimeMilliseconds(1000);
    //var prefix = name.toUri(); 

  console.log("Express interest for: " + name.toUri());
  face.expressInterest(inter, onData, onTimeout);

  rl.close();
});


//face.expressInterest(new Name("/upec/test/ping"), onData, onTimeout);

