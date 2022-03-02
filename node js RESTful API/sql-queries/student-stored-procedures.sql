
# get the students classes
DELIMITER $$
CREATE PROCEDURE get_students_classes (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #check student is in class
SELECT ClassDetails.Name, ClassDetails.ClassDetailsID, ClassDetails.YearGroup, teachers.FirstName, teachers.LastName FROM classes INNER JOIN ClassDetails ON ClassDetails.classDetailsID = classes.classDetailsID INNER JOIN teachers ON classdetails.TeacherID = teachers.TeacherID  WHERE classes.studentID = theStudentID;# join with student name
END$$
DELIMITER ;

CALL get_students_classes ("email@email.com", "password")



# get the students assignments
DELIMITER $$
CREATE PROCEDURE assignments_by_students (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);

    SELECT quizassignments.QuizID, QuizName, FirstName, LastName, ModuleName
    FROM quizassignments 
    INNER JOIN quizzes 
    ON quizassignments.QuizID = quizzes.QuizID 
    LEFT JOIN modules 
    ON quizzes.ModuleID = modules.ModuleID 
    INNER JOIN teachers 
    ON quizzes.TeacherID = teachers.TeacherID 
    WHERE quizassignments.studentID = theStudentID;

END$$
DELIMITER ;

CALL assignments_by_students ("email@email.com", "password")