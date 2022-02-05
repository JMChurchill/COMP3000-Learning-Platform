-- create class (using email and password to get teacher id)
DELIMITER $$
CREATE PROCEDURE create_class (cName varchar(60), cYearGroup int, tEmail varchar(255), tPassword varchar(60))
BEGIN
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    INSERT INTO classdetails 
    (Name,YearGroup,TeacherID)
    VALUES(cName,cYearGroup,theTeacherID);
END$$
DELIMITER ;

-- execute
CALL create_class ("Class1", 3, "testEmail", "password")

-- add student to a class
DELIMITER $$
CREATE PROCEDURE add_student_to_class(classDetailsID int,studentID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    -- check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = classDetailsID) THEN
            INSERT INTO classes
            VALUES(classDetailsID,studentID);
    ELSE
    ROLLBACK;
    -- return error code
    END IF;
END$$
DELIMITER ;

-- execute
CALL add_student_to_class (1, 1, "testEmail", "password")






-- not ran ///////////////////////////////////////////////////////
-- assign activity (to student)
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

-- create quiz
DELIMITER $$
CREATE PROCEDURE create_quiz(quizName text, taskID int)
BEGIN 
    INSERT INTO quizzes
    (QuizName, TaskID)
    VALUES(quizName, taskID)
END$$
DELIMITER ;

--
--  QUIZ
--
-- add quiz question
DELIMITER $$
CREATE PROCEDURE add_quiz_question(quizID int, question text, answer text)
BEGIN 
    INSERT INTO quizquestions
    (QuizID, Question, Answer)
    VALUES(quizID, question, answer)
END$$
DELIMITER ;

-- add quiz options
DELIMITER $$
CREATE PROCEDURE add_question_options(questionID int, theOption text)
BEGIN 
    INSERT INTO quizoptions
    (QuestionID, TheOption)
    VALUES(questionID, theOption)
END$$
DELIMITER ;

--
-- WORD LINK
--
-- create word link
DELIMITER $$
CREATE PROCEDURE create_word_link(wordLinkName text, taskID int)
BEGIN 
    INSERT INTO wordlink
    (WordLinkName, TaskID)
    VALUES(wordLinkName, taskID)
END$$
DELIMITER ;

-- add word
DELIMITER $$
CREATE PROCEDURE add_quiz_question(wordLinkID int, definition text, answer text)
BEGIN 
    INSERT INTO words
    (WordLinkID, Definition, Answer)
    VALUES(wordLinkID, definition, answer)
END$$
DELIMITER ;

--
-- Flashcards
--
-- create flash card deck
DELIMITER $$
CREATE PROCEDURE create_flashcard_deck(name text, studentID int)
BEGIN 
    INSERT INTO flashcarddeck
    (Name, StudentID)
    VALUES(name, StudentID)
END$$
DELIMITER ;
-- add flash card to deck
DELIMITER $$
CREATE PROCEDURE add_quiz_question(deckID int, question text, answer text)
BEGIN 
    INSERT INTO flashcards
    (DeckID, Question, Answer)
    VALUES(deckID, question, answer)
END$$
DELIMITER ;



