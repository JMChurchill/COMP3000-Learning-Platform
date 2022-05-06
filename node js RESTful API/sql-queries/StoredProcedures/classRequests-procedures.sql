# send class request
DELIMITER $$
CREATE PROCEDURE class_request_send(cDetailsID int,sID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    # check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID) THEN
            INSERT INTO ClassRequests(ClassDetailsID,StudentID)
            VALUES(cDetailsID,sID);
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;

# send class request cancel
DELIMITER $$
CREATE PROCEDURE class_request_cancel(cDetailsID int,sID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    # check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID) THEN
        DELETE FROM ClassRequests WHERE StudentID = sID AND ClassDetailsID = cDetailsID;
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;


# accept class request
DELIMITER $$
CREATE PROCEDURE class_request_accept(cDetailsID int, sEmail varchar(255), sPassword varchar(60))
BEGIN 
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    # check if student is requested
    IF EXISTS (SELECT * FROM ClassRequests WHERE StudentID = theStudentID AND ClassDetailsID = cDetailsID) THEN
            INSERT IGNORE INTO Classes(ClassDetailsID,StudentID)
            VALUES(cDetailsID,theStudentID);
            DELETE FROM ClassRequests WHERE StudentID = theStudentID AND ClassDetailsID = cDetailsID;
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;

# decline class request
DELIMITER $$
CREATE PROCEDURE class_request_decline(cDetailsID int, sEmail varchar(255), sPassword varchar(60))
BEGIN 
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    # check if student is requested
    IF EXISTS (SELECT * FROM ClassRequests WHERE StudentID = theStudentID AND ClassDetailsID = cDetailsID) THEN
            DELETE FROM ClassRequests WHERE StudentID = theStudentID AND ClassDetailsID = cDetailsID;
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;



# student view their class requests
DELIMITER $$
CREATE PROCEDURE class_request_view_student(sEmail varchar(255), sPassword varchar(60))
BEGIN 
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    # check if student is requested
    SELECT ClassDetails.ClassDetailsID, DateSent, ClassDetails.Name AS 'ClassName', ClassDetails.YearGroup, Teachers.FirstName, Teachers.LastName FROM ClassRequests 
    INNER JOIN ClassDetails ON ClassDetails.ClassDetailsID = ClassRequests.ClassDetailsID 
    INNER JOIN Teachers ON ClassDetails.TeacherID = Teachers.TeacherID
    WHERE StudentID = theStudentID ORDER BY DateSent DESC;
END$$
DELIMITER ;


# teacher view their class requests
DELIMITER $$
CREATE PROCEDURE class_request_view_teacher(tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    
    SELECT Students.StudentID, Email, FirstName, LastName, ClassDetails.ClassDetailsID, ClassDetails.Name AS 'ClassName', ClassDetails.YearGroup, ClassRequests.DateSent FROM ClassRequests 
    INNER JOIN ClassDetails ON ClassRequests.ClassDetailsID = ClassDetails.ClassDetailsID
    INNER JOIN Students ON ClassRequests.StudentID = Students.StudentID
    WHERE ClassDetails.TeacherID = theTeacherID ORDER BY ClassDetails.Name ASC;
END$$
DELIMITER ;

