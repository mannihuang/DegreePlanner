var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var courses = [];
var db_courses = ['COMP1511', 'COMP1521', 'COMP1531', 'COMP2521', 'COMP2511', 'COMP2041']

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('planner', {chosen_courses: courses, av_courses: db_courses});
});

router.post('/addCourse', function(req, res, next) {
  var added = false;
  var choice = req.body.courseCode;
  for (var i = 0; i < courses.length; i++) {
    if (courses[i] === choice) {
      added = true;
      break;
    }
  }
  if (added === false) {
    courses.push(req.body.courseCode);
  }
  res.redirect('/users');
});

module.exports = router;
