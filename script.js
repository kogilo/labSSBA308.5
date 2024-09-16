// Plan 
    // -01- Input Data Validation - make sure that `AssignmentGroup` belong to `CourseInfo`,
    // throw error if incorrect data type and handle division by zero, if `points_possible` is zero.
   // 02 - Deadlines and penalties: 
    // - If the assignment is not yet due, exclude it
    // - If the learner submission is late, deduct 10% from his/her result.
// 03 - Calculate average score: calculate the weighted average for learner score. Assignments with more points should weight more.

// 04- Return the output in the following format"


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