// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var courseSchema = new mongoose.Schema({
    name: String,
    code: String,
    prereq: {
      WAM: Number,
      UOC: Number,
      degree: [String],
    },
    compPreReq: [String],
    optPreReq: [String],
    coReq: [String]
  });

  var Course = mongoose.model('Course', courseSchema);

  var comp1511 = new Course({
    name: "Introduction to programming",
    code: "COMP1511",
    compPreReq: [],
    optPreReq: []
  });

  comp1511.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var comp1911 = new Course({
    name: "Computing 1A",
    code: "COMP1911",
    compPreReq: [],
    optPreReq: []
  });

  comp1911.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var math1081 = new Course({
    name: "Discrete Mathematics",
    code: "MATH1081",
    compPreReq: [],
    optPreReq: ["MATH1131", "MATH1141", "MATH1151"]
  });

  math1081.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var math1131 = new Course({
    name: "Mathematics 1A",
    code: "MATH1131",
    compPreReq: [],
    optPreReq: []
  });

  math1131.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var math1141 = new Course({
    name: "Higher Mathematics 1A",
    code: "MATH1141",
    compPreReq: [],
    optPreReq: []
  });

  math1141.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var math1231 = new Course({
    name: "Mathematics 1B",
    code: "MATH1231",
    compPreReq: [],
    optPreReq: ["MATH1131", "MATH1231"]
  });

  math1231.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var math1241 = new Course({
    name: "Higher Mathematics 1B",
    code: "MATH1241",
    compPreReq: [],
    optPreReq: ["MATH1131", "MATH1141"]
  });

  math1131.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var comp1521 = new Course({
    name: "Computer Systems Fundamentals",
    code: "COMP1521",
    compPreReq: [],
    optPreReq: ["COMP1511", "COMP1911", "COMP1917"]
  });

  comp1521.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var comp1531 = new Course({
    name: "Software Engineering Fundamentals",
    code: "COMP1531",
    compPreReq: [],
    optPreReq: ["COMP1511", "COMP1921", "COMP1917"]
  });

  comp1531.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var comp2511 = new Course({
    name: "Object-Oriented Design and Programming",
    code: "COMP2511",
    compPreReq: [],
    optPreReq: ["COMP1927", ["COMP1531", "COMP2521"], ["SENG1031", "COMP2521"]]
  });

  comp2511.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var comp2521 = new Course({
    name: "Data Structures and Fundamentals",
    code: "COMP2521",
    compPreReq: [],
    optPreReq: ["COMP1511", "COMP1917", "COMP1921"]
  });

  comp2521.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var comp3121 = new Course({
    name: "Algorithms and Programming Techniques",
    code: "COMP3121",
    compPreReq: [],
    optPreReq: ["COMP1927", "COMP2521", "COMP1921"]
  });

  comp3121.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });

  var comp3900 = new Course({
    name: "Computer Science Project",
    code: "COMP3900",
    compPreReq: ["COMP1531"],
    optPreReq: ["COMP2521", "COMP1927"]
  });

  comp3900.save(function (err,res){
    if (err) return console.log("save failure");
    console.log(res.name);
  });




/*  Course.find(function (err, res){
    if (err) return console.log("find failure")
  */
});
