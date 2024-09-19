# SBA 308: JavaScript Fundamentals
## Objectives
- Employ basic JavaScript syntax accurately.
- Implement **control flow structures** such as conditionals and loops effectively
- Use **arrays** and **objects** to organize and manage data.
- Develop **functions** to create `reusable` code.
- Utilize **loops** and **iteration** to navigate through data collections.
- Implement **error handling** to manage potential code failures gracefully.

## Instructions
- You will create a script that `gathers data`, `processes` it, and then outputs a consistent result as described by a specification. 
- This is a very typical situation in industry, and this particular scenario has been modified from a real application. 
 - The data you will use is provided below.
- You will be provided with four different types of data:

## Part 1: Data Structures

- **CourseInfo**– Information about the course (`course ID and name`).

```javascript
{
  "id": number,
  "name": string,
}
```

- **AssignmentGroup** – A group of assignments related to the course, including details like `assignment names`, `due dates`, and `total possible points`.

```javascript
{
  "id": number,
  "name": string,
  // the ID of the course the assignment group belongs to
  "course_id": number,
  // the percentage weight of the entire assignment group
  "group_weight": number,
  "assignments": [AssignmentInfo],
}
```

- Each `AssignmentInfo` object within the assignments array looks like this:

```javascript
{
  "id": number,
  "name": string,
  // the due date for the assignment
  "due_at": Date string,
  // the maximum points possible for the assignment
  "points_possible": number,
}
```

- **LearnerSubmissions** – Data from students, showing their submissions for the assignments (`submission date` and `score`).

```javascript
{
    "learner_id": number,
    "assignment_id": number,
    "submission": {
      "submitted_at": Date string,
      "score": number
    }
}
```

## Goal
- Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:

```javascript
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
```

## Some few Instructions:
- If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. 
- Similar data validation should occur elsewhere within the program.
- You should also account for potential errors in the data that your program receives. 
- What if `points_possible` is 0? You `cannot divide by zero`. 
- What if a value that you are expecting to be a number is instead a `string`? 
- Use `try/catch` and other logic to handle these types of errors gracefully.
- If an assignment is `not yet due`, `do not include` it in the results or the average. 
- Additionally, if the `learner’s submission is late `(submitted_at is past due_at), `deduct 10 percent` of the total points possible from their score for that assignment.
- Create a function named `getLearnerData()` that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an `array of objects` as described above.
You may use as many helper functions as you see fit.


## Part 2: Validation and Utility Functions

1. `validateAssignmentGroup` – Checks if the `AssignmentGroup` belongs to the `CourseInfo`. It compares `AssignmentGroup.course_id` with `CourseInfo.id`. If they don't match, it throws an error.

```javascript

function validateAssignmentGroup(course, AssignmentGroup) {
    if (AssignmentGroup.course_id !== course.id) {
        throw new Error(`Assignment group does not belong to the provided course.`);
    }
}

```

2. `validateLearnerSubmissions` – Ensures that the `score` in each submission is a `number` and is not `invalid (NaN)`.

```javascript
function validateLearnerSubmissions(submission) {
    if (typeof submission.score !== "number" || isNaN(submission.score)) {
        throw new Error(`Invalid submission score data`);
    }
}

```
3. `applyLatePenalty` – Checks if a submission is `late` and applies a `10% penalty` to the score if it is submitted after the due date.

```javascript

function applyLatePenalty(submissionDate, dueDate, score, pointsPossible) {
    const submitted = new Date(submissionDate);
    const due = new Date(dueDate);
    
    if (submitted > due) {
        // 10% penalty for late submission
        return score - 0.1 * pointsPossible;
    }
    return score;
}

```


## Part 3: The Main Function

- The `getLearnerData` function processes all of the learner submission data for a given course and assignment group.

```javascript

function getLearnerData(course, ag, submissions) {
  /// Validate Assignment Group ///////
  validateAssignmentGroup(course, ag);

  ///// Iterate Through Submissions ////

  submissions.forEach((submission) => {
    const { learner_id, assignment_id, submission: { submitted_at, score } } = submission;
    const assignment = AssignmentGroup.assignments.find(a => a.id === assignment_id);
    
    if (new Date(assignment.due_at) > new Date()) {
        return; // Skip if the assignment is not due yet
    }
    
    validateLearnerSubmissions(submission.submission);
    
    if (assignment.points_possible === 0) {
        return;
    }
    
    const adjustedScore = applyLatePenalty(submitted_at, assignment.due_at, score, assignment.points_possible);
    
    if (!learnerScores[learner_id]) {
        learnerScores[learner_id] = {
            id: learner_id,
            totalPointsEarned: 0,
            totalPointsPossible: 0
        };
    }
    
    learnerScores[learner_id].totalPointsEarned += adjustedScore;
    learnerScores[learner_id].totalPointsPossible += assignment.points_possible;
    
    learnerScores[learner_id][assignment.id] = adjustedScore / assignment.points_possible;
});

////// Calculate Final Results  ////////
Object.keys(learnerScores).forEach(learner_id => {
    const learner = learnerScores[learner_id];
    learner.avg = learner.totalPointsEarned / learner.totalPointsPossible;
    result.push(learner);
});
return result;

};

```
