
# Create quiz
DELIMITER $$
CREATE PROCEDURE quiz_create(QuizTitle text, mID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    #START TRANSACTION
        INSERT INTO quizzes(QuizName, TeacherID, ModuleID)
        VALUES (QuizTitle, theTeacherID, mID);
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


# delete quiz
DELIMITER $$
CREATE PROCEDURE quiz_delete(qID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    DELETE FROM quizzes WHERE QuizID = qID AND TeacherID = theTeacherID;
END$$
DELIMITER ;

#execute
CALL quiz_delete(1,"email","password")



#get answers by quiz id
DELIMITER $$
CREATE PROCEDURE quiz_answers_by_id(quiz_ID int)
BEGIN 
    SELECT QuestionID,QuizID,Answer FROM quizquestions WHERE QuizID = quiz_ID;
END$$
DELIMITER ;

CALL quiz_answers_by_id(35)


# get all teachers quizzes
DELIMITER $$
CREATE PROCEDURE quiz_all_by_teacher(tEmail varchar(255), tPassword varchar(60))
BEGIN 

    #get student id
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);

    SELECT QuizID, QuizName, ModuleName FROM quizzes 
    LEFT JOIN modules ON modules.ModuleID = quizzes.ModuleID
    WHERE quizzes.TeacherID = theTeacherID;
END$$
DELIMITER ;


# get all teachers quizzes by class id - fix
DELIMITER $$
CREATE PROCEDURE quiz_all_by_teacher_classID(cID int,tEmail varchar(255), tPassword varchar(60))
BEGIN 

    #get student id
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);

    SELECT quizzes.QuizID, QuizName, ModuleName, DueDate FROM quizzes 
    LEFT JOIN modules ON modules.ModuleID = quizzes.ModuleID
    LEFT JOIN quizclassassignments ON quizclassassignments.QuizID = quizzes.QuizID
    WHERE quizzes.TeacherID = theTeacherID;

END$$
DELIMITER ;

# execute
CALL quiz_all_by_teacher_classID ("teacher", "password",2)


# add quiz submission
DELIMITER $$
CREATE PROCEDURE quiz_submission_add (qID int, qScore int,nXp int, nLevel int, nCoins int, sEmail varchar(255), sPassword varchar(60))
BEGIN
    #DECLARE TotalXp int;
    DECLARE TotalCoins int;
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
        IF EXISTS (SELECT * FROM QuizSubmissions WHERE StudentID = theStudentID AND QuizID = qID) THEN
        ROLLBACK;
    ELSE
        #insert submission
        INSERT INTO QuizSubmissions(StudentID,QuizID,Score)
        VALUES (theStudentID, qID, qScore);
    END IF;
    #get xp
    #SET TotalXp = (SELECT Xp FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #get coins
    SET TotalCoins = (SELECT Coins FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #add to total
    UPDATE Students
    SET Xp = nXp, Coins = TotalCoins + nCoins, level = nLevel
    WHERE StudentID = theStudentID;
END$$
DELIMITER ;

CALL quiz_submission_add(1,1,"e@email.com","password")