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
CREATE PROCEDURE assignment_quiz_delete(qID int, cID int,tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    #check is teachers class
    IF EXISTS (SELECT * FROM QuizClassAssignments INNER JOIN ClassDetails ON classdetails.classDetailsID = QuizClassAssignments.classDetailsID WHERE QuizClassAssignments.ClassDetailsID = cID AND classdetails.TeacherID = theTeacherID) THEN
        DELETE FROM QuizClassAssignments
        WHERE ClassDetailsID = cID AND QuizID = qID;
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL assignment_quiz_delete(1,1,"email","password")


/* #create indivisual assignment
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

CALL assignment_quiz_create_indivisual(1,1,"email","password") */