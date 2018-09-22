var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var jsdom = require('jsdom');

var courses = [];

var cs1511 = {
  name: "Introduction to Computing",
  code: "COMP1511",
  outline: "An introduction to problem-solving via programming, which aims to have students develop proficiency in using a high level programming language. Topics: algorithms, program structures (statements, sequence, selection, iteration, functions), data types (numeric, character), data structures (arrays, tuples, pointers, lists), storage structures (memory, addresses), introduction to analysis of algorithms, testing, code quality, teamwork, and reflective practice. The course includes extensive practical work in labs and programming projects.",
  pre_req: null
};

var cs1521 = {
  name: "Computer System",
  code: "COMP1521",
  outline: "This course provides a programmer's view on how a computer system executes programs, manipulates data and communicates. It enables students to become effective programmers in dealing with issues of performance, portability, and robustness. It is typically taken in the semester after completing COMP1511, but could be delayed and taken later. It serves as a foundation for later courses on networks, operating systems, computer architecture and compilers, where a deeper understanding of systems-level issues is required. Topics: Introduction to the systems-level view of computing, number representation, machine-level programming, representing high-level programs in machine code, memory, input/output, system architectures, operating systems, networks, parallelism/concurrency, communication/synchronisation. Labs and assignment work in C and machine code.",
  pre_req: {
    WAM: 0.0,
    UoC: 0,
    compul: [cs1511],
    one_of: []
  }
};

var cs2521 = {
  name: "Data Structures and Algo",
  code: "COMP2521",
  outline: "The goal of this course is to deepen students' understanding of data structures and algorithms and how these can be employed effectively in the design of software systems. We anticipate that it will generally be taken in the second year of a program, but since its only pre-requisite is COMP1511, is it possible to take it in first year. It is an important course in covering a range of core data structures and algorithms that will be used in context in later courses.Topics: An introduction the structure, analysis and usage of a range of fundamental data types and the core algorithms that operate on them, including: algorithm analysis, sorting, searching, trees, graphs, files, algorithmic strategies, analysis and measurement of programs. Labs and programming assignments in C, using a range of Unix tools.",
  pre_req: {
    WAM: 0.0,
    UoC: 0,
    compul: [cs1511],
    one_of: []
  }
};



var db_courses = [cs1511, cs1521, cs2521]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Welcome',chosen_courses: courses, av_courses: db_courses});
});

router.post('/addCourse', function(req, res, next) {
  var added = false;
  var choice = req.body.courseCode;
  console.log(choice);
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].code === choice) {
      added = true;
      break;
    }
  }
  if (added === false) {
    for (var i = 0; i < db_courses.length; i++) {
      if (choice === db_courses[i].code && check_prereq(courses, db_courses[i]) === true) {
        courses.push(db_courses[i]);
        //db_courses.splice(i, 1);
        break;
      }
    }
  }
  res.redirect('/');
});

router.post('/delCourse', function(req, res, next) {
  var choice = req.body.courseCode;
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].code === choice) {
      courses.splice(i, 1);
      break;
    }
  }
  res.redirect('/');
});

function check_prereq(my_courses, choice) {
  if (choice.pre_req === null) {
    return true;
  }
  
  var check_compul = false;
  var check_oneof = false;
  
  var count = 0;
  for (var i = 0; i < choice.pre_req.compul.length; i++) {
    if (my_courses.includes(choice.pre_req.compul[i])) {
      count++;
    }
  }
  check_compul = (count === choice.pre_req.compul.length);
  
  //console.log(choice.pre_req.one_of[0]);
  //console.log(choice.pre_req.one_of[1]);
  //console.log(choice.pre_req.one_of[2]);
  
  if (choice.pre_req.one_of.length === 0) {
    check_oneof = true;
  } else {
    count = 0;
    for (var i = 0; i < choice.pre_req.one_of.length; i++) {
      for (var j = 0; j < choice.pre_req.one_of[i].length; j++) {
        if (my_courses.includes(choice.pre_req.one_of[i][j])) {
          count++;
        }
        //console.log(choice.pre_req.one_of[i][j]);
      }
      if (count === choice.pre_req.one_of[i].length) {
        check_oneof = true;
        break;
      }
    }
  }
  
  return (check_compul === true) && (check_oneof === true);
}

module.exports = router;
