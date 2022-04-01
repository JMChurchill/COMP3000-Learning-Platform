# Create Module
DELIMITER $$
CREATE PROCEDURE modules_create (mName text,tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    INSERT INTO Modules
    (ModuleName, TeacherID)
    VALUES(mName, theTeacherID);
END$$
DELIMITER ;


# Delete Module
DELIMITER $$
CREATE PROCEDURE modules_delete (mID int,tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    DELETE FROM Modules WHERE TeacherID = theTeacherID AND ModuleID = mID;
END$$
DELIMITER ;

# Update Module
DELIMITER $$
CREATE PROCEDURE modules_update (mID text, nMName text, tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    UPDATE Modules
    SET ModuleName = nMName
    WHERE TeacherID = theTeacherID AND ModuleID = mID;
END$$
DELIMITER ;

# View Modules by id
DELIMITER $$
CREATE PROCEDURE modules_view_by_teacher (tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    SELECT ModuleID, ModuleName FROM Modules WHERE TeacherID = theTeacherID;
END$$
DELIMITER ;

CALL modules_view_by_teacher("teacher","password")


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

    #SELECT QuizID, QuizName, ModuleName FROM quizzes 
    #INNER JOIN teachers ON quizzes.TeacherID = teachers.TeacherID 
    #INNER JOIN modules ON modules.ModuleID = quizzes.ModuleID
    #WHERE teachers.email = tEmail AND teachers.password = tPassword;
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
    #SELECT QuizID, QuizName, ModuleName FROM quizzes 
    #LEFT JOIN modules ON modules.ModuleID = quizzes.ModuleID
    #INNER JOIN quizassignments ON quizassignments.QuizID = quizzes.QuizID
    #WHERE quizzes.TeacherID = 8 AND quizassignments.classID = 25;

    #old
    #BEGIN 
    #SELECT QuizID, QuizName, ModuleName FROM quizzes 
    #INNER JOIN teachers ON quizzes.TeacherID = teachers.TeacherID 
    #LEFT JOIN modules ON modules.ModuleID = quizzes.ModuleID
    #WHERE teachers.email = tEmail AND teachers.password = tPassword;
    #END

END$$
DELIMITER ;

# execute
CALL quiz_all_by_teacher_classID ("teacher", "password",2)


#create indivisual assignment
DELIMITER $$
CREATE PROCEDURE assignment_quiz_create_indivisual(sID int,qID int,tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    #check student in teachers class
    IF EXISTS (SELECT * FROM classes 
    INNER JOIN classdetails ON classes.ClassDetailsID = classdetails.ClassDetailsID
    WHERE StudentID = sID AND TeacherID = theTeacherID) THEN
    #does not attempt to insert if duplicate
        INSERT IGNORE INTO quizassignments(StudentID, QuizID)
        VALUES (sID,qID);
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL assignment_quiz_create_indivisual(1,1,"email","password")

#create class assignment
DELIMITER $$
CREATE PROCEDURE assignment_quiz_create_class(cID int,qID int,dDate DATE, qXp int, qCoins int,tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    #check is teachers class
    IF EXISTS (SELECT * FROM classes
    INNER JOIN ClassDetails ON classes.classdetailsID = classdetails.classDetailsID 
    WHERE ClassDetails.TeacherID = theTeacherID AND classes.classDetailsID = cID) THEN
        #check if exists
        IF EXISTS (SELECT * FROM QuizClassAssignments 
            WHERE ClassDetailsID = cID AND QuizID = qID) THEN
            UPDATE QuizClassAssignments
            SET DueDate = dDate, xp = qXp, coins = qCoins
            WHERE ClassDetailsID = cID AND QuizID = qID; 
        ELSE
        #does not attempt to insert if duplicate
            INSERT IGNORE INTO QuizClassAssignments(ClassDetailsID, QuizID, DueDate, Xp,Coins)
            VALUES (cID,qID,dDate,qXp,qCoins);
        END IF;
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL assignment_quiz_create_class(1,1,"date-here",100,"email","password")


DELIMITER $$
CREATE PROCEDURE assignment_quiz_delete(sID int,qID int,tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    #check student in teachers class
    IF EXISTS (SELECT * FROM classes 
    INNER JOIN classdetails ON classes.ClassDetailsID = classdetails.ClassDetailsID
    WHERE StudentID = sID AND TeacherID = theTeacherID) THEN
        DELETE FROM quizassignments
        WHERE StudentID = sID AND QuizID = qID;
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL assignment_quiz_delete(1,1,"email","password")




