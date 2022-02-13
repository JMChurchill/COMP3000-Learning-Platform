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

# add student to a class
DELIMITER $$
CREATE PROCEDURE add_student_to_class(classDetailsID int,studentID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    # check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = classDetailsID) THEN
            INSERT INTO classes(ClassDetailsID,StudentID)
            VALUES(classDetailsID,studentID);
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;

# execute
CALL add_student_to_class (1, 1, "testEmail", "password")
CALL add_student_to_class (1, 1, "email2@email.com", "password")

# get students from class
DELIMITER $$
CREATE PROCEDURE get_students_by_class (classID int, sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #check student is in class
    IF EXISTS (SELECT * FROM classes WHERE StudentID = theStudentID AND ClassDetailsID = classID) THEN
    SELECT * FROM classes INNER JOIN students ON students.StudentID = classes.StudentID WHERE classes.ClassDetailsID = classID;# join with student name
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL get_students_by_class ("1", "email@email.com", "password")

# get students from class - testing
DELIMITER $$
CREATE PROCEDURE get_all_students ()
BEGIN
    SELECT * FROM students;# join with student name
END$$
DELIMITER ;

CALL get_all_students ()

# create student
DELIMITER $$
CREATE PROCEDURE create_student (fName varchar(60),lName varchar(60), sEmail varchar(255), sPassword varchar(60))
BEGIN
    INSERT INTO students (Email,FirstName,LastName,Password) VALUES(sEmail,fName,lName,sPassword);
END$$
DELIMITER ;

# execute
CALL create_student ("firstname", "lastname", "email2@email.com", "password")

# update student
DELIMITER $$
CREATE PROCEDURE update_student (oEmail varchar(255),oPassword varchar(60),nfName varchar(60),nlName varchar(60), nEmail varchar(255), nPassword varchar(60))
BEGIN
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = oEmail AND password = oPassword LIMIT 1);
    IF EXISTS (SELECT * FROM students WHERE email = oEmail AND password = oPassword) THEN
        UPDATE students SET Email = nEmail, FirstName = nfName, LastName = nlName, Password = nPassword WHERE studentID = theStudentID AND password = oPassword LIMIT 1;
    ELSE
    ROLLBACK;
    END IF;
END$$
DELIMITER ;

# execute
CALL update_student ( "email2@email.com", "password", "changedFirst", "changedLast", "email2@email.com", "password")

# delete student
DELIMITER $$
CREATE PROCEDURE delete_student (sEmail varchar(255),sPassword varchar(60))
BEGIN
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    IF EXISTS (SELECT * FROM students WHERE email = sEmail AND password = sPassword) THEN
        DELETE FROM students WHERE studentID = theStudentID;
    ELSE
    ROLLBACK;
    END IF;
END$$
DELIMITER ;

# execute 
CALL delete_student ( "email2@email.com", "password")

# create teacher
DELIMITER $$
CREATE PROCEDURE create_teacher (fName varchar(60),lName varchar(60), tEmail varchar(255), tPassword varchar(60),pNumber varchar(13))
BEGIN
    INSERT INTO teachers (Email,FirstName,LastName,Password,PhoneNumber) VALUES(tEmail,fName,lName,tPassword,pNumber);
END$$
DELIMITER ;

# execute
CALL create_teacher ("firstname", "lastname", "email2@email.com", "password","01234666345")

# update teacher
DELIMITER $$
CREATE PROCEDURE update_teacher (oEmail varchar(255),oPassword varchar(60),nfName varchar(60),nlName varchar(60), nEmail varchar(255), nPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = oEmail AND password = oPassword LIMIT 1);
    IF EXISTS (SELECT * FROM teachers WHERE email = oEmail AND password = oPassword) THEN
        UPDATE teachers SET Email = nEmail, FirstName = nfName, LastName = nlName, Password = nPassword WHERE teacherID = theTeacherID;
    ELSE
    ROLLBACK;
    END IF;
END$$
DELIMITER ;

# execute
CALL update_teacher ( "email2@email.com", "password", "changedFirst2", "changedLast2", "email2@email.com", "password")

# delete teacher
DELIMITER $$
CREATE PROCEDURE delete_teacher (tEmail varchar(255),tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    IF EXISTS (SELECT * FROM teachers WHERE email = tEmail AND password = tPassword) THEN
        DELETE FROM teachers WHERE teacherID = theTeacherID;
    ELSE
    ROLLBACK;
    END IF;
END$$
DELIMITER ;

# execute 
CALL delete_teacher ( "email2@email.com", "password")



# not ran ///////////////////////////////////////////////////////
# assign activity (to student)
DELIMITER $$
CREATE PROCEDURE assign_activity(studentID int, taskType int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    INSERT INTO assignments
    (TeacherID, StudentID, TaskType)
    VALUES(theTeacherID, studentID, taskType)
END$$
DELIMITER ;

#
#  QUIZ
#
# create quiz
DELIMITER $$
CREATE PROCEDURE create_quiz(quizName text, taskID int)
BEGIN 
    INSERT INTO quizzes
    (QuizName, TaskID)
    VALUES(quizName, taskID)
END$$
DELIMITER ;

# add quiz question
DELIMITER $$
CREATE PROCEDURE add_quiz_question(quizID int, question text, answer text)
BEGIN 
    INSERT INTO quizquestions
    (QuizID, Question, Answer)
    VALUES(quizID, question, answer)
END$$
DELIMITER ;

# add quiz options
DELIMITER $$
CREATE PROCEDURE add_question_options(questionID int, theOption text)
BEGIN 
    INSERT INTO quizoptions
    (QuestionID, TheOption)
    VALUES(questionID, theOption)
END$$
DELIMITER ;

#
# WORD LINK
#
# create word link
DELIMITER $$
CREATE PROCEDURE create_word_link(wordLinkName text, taskID int)
BEGIN 
    INSERT INTO wordlink
    (WordLinkName, TaskID)
    VALUES(wordLinkName, taskID)
END$$
DELIMITER ;

# add word
DELIMITER $$
CREATE PROCEDURE add_quiz_question(wordLinkID int, definition text, answer text)
BEGIN 
    INSERT INTO words
    (WordLinkID, Definition, Answer)
    VALUES(wordLinkID, definition, answer)
END$$
DELIMITER ;

#
# Flashcards
#
# create flash card deck
DELIMITER $$
CREATE PROCEDURE create_flashcard_deck(name text, studentID int)
BEGIN 
    INSERT INTO flashcarddeck
    (Name, StudentID)
    VALUES(name, StudentID)
END$$
DELIMITER ;
# add flash card to deck
DELIMITER $$
CREATE PROCEDURE add_quiz_question(deckID int, question text, answer text)
BEGIN 
    INSERT INTO flashcards
    (DeckID, Question, Answer)
    VALUES(deckID, question, answer)
END$$
DELIMITER ;



