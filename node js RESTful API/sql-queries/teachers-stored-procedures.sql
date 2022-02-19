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

# add student to a class
DELIMITER $$
CREATE PROCEDURE add_student_to_class(cDetailsID int,studentID int, tEmail varchar(255), tPassword varchar(60))
BEGIN 
    DECLARE theTeacherID int;
    SET theTeacherID = (SELECT TeacherID FROM teachers WHERE email = tEmail AND password = tPassword LIMIT 1);
    # check if teacher owns class
    IF EXISTS (SELECT * FROM classdetails WHERE TeacherID = theTeacherID AND ClassDetailsID = cDetailsID) THEN
            INSERT INTO classes(ClassDetailsID,StudentID)
            VALUES(cDetailsID,studentID);
    ELSE
    ROLLBACK;
    # return error code
    END IF;
END$$
DELIMITER ;

# execute
CALL add_student_to_class (1, 1, "testEmail", "password")
CALL add_student_to_class (1, 1, "email2@email.com", "password")

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
        SELECT classes.StudentID, FirstName,LastName FROM classes INNER JOIN students ON students.StudentID = classes.StudentID WHERE classes.ClassDetailsID = 24;# join with student name
    ELSE
        ROLLBACK;
    END IF;
END$$
DELIMITER ;

CALL teacher_get_students_by_class ("1", "email@email.com", "password")



