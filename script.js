// Plan 
    // -01- Create each data: 
    // -02- Input Data Validation - make sure that `AssignmentGroup` belong to `CourseInfo`,
    // throw error if incorrect data type and handle division by zero, if `points_possible` is zero.
   // 03 - Deadlines and penalties: 
    // - If the assignment is not yet due, exclude it
    // - If the learner submission is late, deduct 10% from his/her result.
// 04 - Calculate average score: calculate the weighted average for learner score. Assignments with more points should weight more.

// 05- Return the output in the following format"


/* 
{
    // the ID of the learner for which this data has been collected
    "id": number,
    // the learner’s total, weighted average, in which assignments
    // with more points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
    "avg": number,
    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
    <assignment_id>: number,
    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
}
    */

// -01- Create each data: 
// ====From STARTER CODE====

// The provided course information.
const courseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const assignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const learnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];


  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  

  // -02- Input Data Validation - make sure that `AssignmentGroup` belong to `CourseInfo`,
function validateAssignmentGroup(course, AssignmentGroup) {
    if (AssignmentGroup.course_id !== course.id) {
        throw new Error(`Assignment group does not belong to the provided course.`)

    }

}


// throw error if incorrect data type and handle division by zero, if `points_possible` is zero.

function validateLearnerSubmissions(submission) {
    if(typeof submission.score !== "number" || isNaN(submission.score)) {
        throw new Error(`Invalid submission score data`);
    }

}

// 03 - Deadlines and penalties: 
function applyLateSubmPenality(submissionDate, dueDate, score, pointsPossible) {
    const submitted = new Date(submissionDate);
    const due = new Date(dueDate);
    
    if (submitted > due) {
        // 10% penalty for late submission
        return score - 0.1 * pointsPossible;
      }
      return score;

}