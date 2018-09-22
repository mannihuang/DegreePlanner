var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {

  //GET THE USER IN SESSION
  var curr_user = {
    completed_courses: ["COMP1511", "COMP1531", "COMP2521", "COMP1521"]
  }

  //GET COURSE OBJECT FROM DATABASE
  var curr_course = 
  {
    course_code: "COMP3331",
    one_of: [
              { compulsory: ["COMP1921"] },
              { compulsory: ["COMP1927"] },
              { compulsory: ["MTRN3500"] },
              { compulsory: ["COMP1521", "MTRN3500"] }, 
              { compulsory: ["COMP1521", "COMP2521"] }, 
            ]
  }

  function check_compulsory(compulsory_array) {
    var has_completed_all = 1;  
    compulsory_array.forEach( function(c_course) {
  
        if(typeof c_course == 'object') {
          has_completed_all = check_prereq(c_course);
        } else if(!curr_user.completed_courses.includes(c_course)) {
          has_completed_all = 0; 
        }    
    });
    return has_completed_all;
  }
  
  function check_one_of(one_of_array) {
    var has_completed_one = 0;
    one_of_array.forEach(function(option) { 
      if(typeof option == 'object') {
        has_completed_one = check_prereq(option);
      } else if(curr_user.completed_courses.includes(option)) {
        has_completed_one = 1; 
      }
    });
    return has_completed_one;
  }
  
  
  function check_prereq(course) {
  
    var has_completed_all = 1;
    
    if(course.compulsory) {
      has_completed_all = check_compulsory(course.compulsory);
  
    }
  
    var has_completed_one = 0;
    if(course.one_of) {
      has_completed_one = check_one_of(course.one_of);
    } else {
      has_completed_one = 1;
    }
    return has_completed_all && has_completed_one;
  
  }
  

  can_undertake = check_prereq(curr_course);

  res.render('course', { course: curr_course, user: curr_user, can_undertake: can_undertake });
});

module.exports = router;
