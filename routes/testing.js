var curr_user = {
  completed_courses: ["COMP1511", "COMP1531", "COMP2521", "COMP1521"]
}

//GET COURSE OBJECT FROM DATABASE
var c_course = 
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


function list_compulsory(compulsory_array) {

  compulsory_array.forEach( function(c_course) {

      if(typeof c_course == 'object') {
        list_prereqs(c_course);
      } else if(!my_courses.includes(c_course)) {
        console.log(c_course);
      }    
  });

}

function list_one_of(one_of_array) {

  one_of_array.forEach(function(option) { 
    if(typeof option == 'object') {
      list_prereqs(option);
    } else if(my_courses.includes(option)) {
      console.log(option); 
    }
  });

}


function list_prereqs( course ) {

  if(course.compulsory) {
    list_compulsory(course.compulsory);
  }
    
  if(course.one_of) {
    list_one_of(course.one_of);
  } else {
    has_completed_one = 1;
  }

  
}


list_prereqs( networks_course )
