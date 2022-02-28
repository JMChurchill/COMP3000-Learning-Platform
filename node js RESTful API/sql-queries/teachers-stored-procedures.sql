# get all teachers classes
DELIMITER $$
CREATE PROCEDURE get_classes_by_teacher (tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    SELECT classdetailsID, Name, YearGroup FROM classdetails WHERE TeacherID = theTeacherID;
END$$
DELIMITER ;

# execute
CALL get_classes_by_teacher ("teacher20@email.com", "password")

# create class (using email and password to get teacher id)
DELIMITER $$
CREATE PROCEDURE create_class (cName varchar(60), cYearGroup int, tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    IF EXISTS (SELECT * FROM teachers WHERE email = tEmail AND password = tPassword) THEN
        INSERT INTO classdetails 
        (Name,YearGroup,TeacherID)
        VALUES(cName,cYearGroup,theTeacherID);
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

# execute
CALL create_class ("Class1", 3, "testEmail", "password")

# update class (using email and password to get teacher id)
DELIMITER $$
CREATE PROCEDURE update_class (cDetailsID int, cName varchar(60), cYearGroup int, tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    IF EXISTS (SELECT * FROM teachers WHERE email = tEmail AND password = tPassword) THEN
        UPDATE classdetails 
        SET Name = cName, YearGroup = cYearGroup 
        WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID;
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

# execute
CALL update_class (1,"Class1", 3, "testEmail", "password")


# delete class
DELIMITER $$
CREATE PROCEDURE delete_class(cDetailsID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    # check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID) THEN
            Delete FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID;
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;

# execute
CALL delete_class (1, "email2@email.com", "password")


#search students
DELIMITER $$
CREATE PROCEDURE search_students (tEmail varchar(255), tPassword varchar(60), sTerm TEXT)
BEGIN
    IF EXISTS (SELECT * FROM teachers WHERE email = tEmail AND password = tPassword) THEN
        SELECT StudentID, Email, FirstName, LastName 
        FROM Students 
        WHERE Email LIKE CONCAT('%', sTerm , '%') 
        OR FirstName LIKE CONCAT('%', sTerm , '%') 
        OR LastName LIKE CONCAT('%', sTerm , '%');
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL search_students ("email2@email.com", "password", "e")


# get students from class
DELIMITER $$
CREATE PROCEDURE teacher_get_students_by_class (classID int, tEmail varchar(255), tPassword varchar(60))
BEGIN
    #get student id
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    #check student is in class
    IF EXISTS (SELECT * FROM classes INNER JOIN classdetails ON classdetails.ClassDetailsID = classes.ClassDetailsID WHERE TeacherID = 2 AND classes.ClassDetailsID=1) THEN
        SELECT classes.StudentID, FirstName,LastName FROM classes INNER JOIN students ON students.StudentID = classes.StudentID WHERE classes.ClassDetailsID = classID;# join with student name
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL teacher_get_students_by_class ("1", "email@email.com", "password")


# add student to a class
DELIMITER $$
CREATE PROCEDURE add_student_to_class(cDetailsID int,sID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    # check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID) THEN
            INSERT INTO classes(ClassDetailsID,StudentID)
            VALUES(cDetailsID,sID);
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;

# execute
CALL add_student_to_class (1, 1, "testEmail", "password")
CALL add_student_to_class (1, 1, "email2@email.com", "password")


#Remove student from class
DELIMITER $$
CREATE PROCEDURE remove_student_from_class(cDetailsID int,sID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    # check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID) THEN
            DELETE FROM classes
            WHERE StudentID = sID AND ClassDetailsID = cDetailsID;
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;

CALL remove_student_from_class (1, 1, "email2@email.com", "password")



# Create quiz
DELIMITER $$
CREATE PROCEDURE quiz_create(QuizTitle text, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    #START TRANSACTION
        INSERT INTO quizzes(QuizName, TeacherID)
        VALUES (QuizTitle, theTeacherID);
        # get the new quizzes id
        SELECT LAST_INSERT_ID();
    #COMMIT
END$$
DELIMITER ;

CALL quiz_create ("test", "email","password")


# add question to quiz
DELIMITER $$
CREATE PROCEDURE quiz_add_question(theQuizID int, nQuestion text, nDetails text, ans int)
BEGIN 
    #START TRANSACTION
        INSERT INTO quizquestions(QuizID, Question, Details,Answer)
        VALUES (theQuizID, nQuestion, nDetails, Answer);
        # get the new quizzes id
        SELECT LAST_INSERT_ID();
    #COMMIT
END$$
DELIMITER ;

# execute
CALL quiz_add_question (4,"1+1", "", 0)


# add option to quiz question
DELIMITER $$
CREATE PROCEDURE quiz_add_question_option(questID int, anOption text)
BEGIN 
    INSERT INTO quizoptions(QuestionID, TheOption)
    VALUES (questID, anOption);
END$$
DELIMITER ;

# execute
CALL quiz_add_question_option (2,"2")

# view quiz
DELIMITER $$
CREATE PROCEDURE quiz_view(quid_ID int)
BEGIN 
    SELECT * FROM quizzes WHERE QuizID = quid_ID;
    #SELECT * FROM quizquestions WHERE QuizID = quid_ID;
    #SELECT quizquestions.QuestionID, TheOption FROM QuizOptions 
    #INNER JOIN QuizQuestions 
    #ON quizquestions.QuestionID = QuizOptions.QuestionID
    #WHERE quizquestions.QuizID = quid_ID;
END$$
DELIMITER ;

# execute
CALL quiz_view (35)

# view quiz question
DELIMITER $$
CREATE PROCEDURE quiz_question_view(quid_ID int)
BEGIN 
    #SELECT * FROM quizzes WHERE QuizID = quid_ID;
    SELECT * FROM quizquestions WHERE QuizID = quid_ID;
    #SELECT quizquestions.QuestionID, TheOption FROM QuizOptions 
    #INNER JOIN QuizQuestions 
    #ON quizquestions.QuestionID = QuizOptions.QuestionID
    #WHERE quizquestions.QuizID = quid_ID;
END$$
DELIMITER ;

# execute
CALL quiz_question_view (35)

# view quiz question options
DELIMITER $$
CREATE PROCEDURE quiz_question_option_view(quiz_ID int, quest_ID int)
BEGIN 
    #SELECT * FROM quizzes WHERE QuizID = quid_ID;
    #SELECT * FROM quizquestions WHERE QuizID = quid_ID;
    SELECT quizquestions.QuestionID, TheOption FROM QuizOptions 
    INNER JOIN QuizQuestions 
    ON quizquestions.QuestionID = QuizOptions.QuestionID
    WHERE quizquestions.QuizID = quiz_ID AND quizquestions.QuestionID = quest_ID;
END$$
DELIMITER ;

# execute
CALL quiz_question_option_view (35,18)


/* # view quiz -- test
DELIMITER $$
CREATE PROCEDURE quiz_view(IN quid_ID int, OUT quizzes, OUT )
BEGIN 
    SELECT * FROM quizzes WHERE QuizID = quid_ID;
    SELECT * FROM quizquestions WHERE QuizID = quid_ID;
    SELECT * FROM QuizOptions 
    INNER JOIN QuizQuestions 
    ON quizquestions.QuestionID = QuizOptions.QuestionID
    WHERE quizquestions.QuizID = quid_ID;
END$$
DELIMITER ;

# execute
CALL quiz_view (35) */



#get answers by quiz id
DELIMITER $$
CREATE PROCEDURE quiz_answers_by_id(quiz_ID int)
BEGIN 
    SELECT QuestionID,QuizID,Answer FROM quizquestions WHERE QuizID = quiz_ID;
END$$
DELIMITER ;

CALL quiz_answers_by_id(35)


# get all quizzes
DELIMITER $$
CREATE PROCEDURE quiz_all_by_teacher(tEmail varchar(255), tPassword varchar(60))
BEGIN 
    SELECT QuizID, QuizName FROM quizzes 
    INNER JOIN teachers ON quizzes.TeacherID = teachers.TeacherID 
    WHERE teachers.email = tEmail AND teachers.password = tPassword;
END$$
DELIMITER ;

# execute
CALL quiz_all_by_teacher ("teacher", "password")
