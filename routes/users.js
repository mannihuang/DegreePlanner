var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var courses = [];

var cs1511 = {
  name: "Introduction to Computing",
  code: "COMP1511",
  pre_req: null
};

var cs1521 = {
  name: "Computer System",
  code: "COMP1521",
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
  pre_req: {
    WAM: 0.0,
    UoC: 0,
    compul: [cs1511],
    one_of: []
  }
};

var cs3331 = {
  name: "Network",
  code: "COMP3331",
  pre_req: {
    WAM: 0.0,
    UoC: 0,
    compul: [],
    one_of: [[cs2521], [cs1521, cs1511], [cs1521, cs2521]]
  }
};

var db_courses = [cs1511, cs1521, cs2521, cs3331]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('planner', {chosen_courses: courses, av_courses: db_courses});
});

router.post('/addCourse', function(req, res, next) {
  var added = false;
  var choice = req.body.courseCode;
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
  res.redirect('/users');
});

router.post('/delCourse', function(req, res, next) {
  var choice = req.body.courseCode;
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].code === choice) {
      courses.splice(i, 1);
      break;
    }
  }
  res.redirect('/users');
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
