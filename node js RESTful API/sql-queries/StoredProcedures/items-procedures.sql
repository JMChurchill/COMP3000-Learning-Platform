# get all unpurchased shop items
DELIMITER $$
CREATE PROCEDURE items_get_unpurchased (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #get unpurchesed items
    SELECT Items.ItemID, Items.Name, Details, Image, Cost, ItemsType.Name AS 'Type' FROM Items 
    INNER JOIN ItemsType ON Items.TypeID = ItemsType.TypeID
    WHERE ItemID NOT IN (SELECT ItemID FROM ItemsPurchased WHERE StudentID = theStudentID);

END$$
DELIMITER ;

CALL items_get_unpurchased ("email@email.com", "password")


# get purchased themes
DELIMITER $$
CREATE PROCEDURE items_get_students_themes (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #get purchased themes
    SELECT ItemID, Name, Details, Image FROM ItemsPurchased 
    INNER JOIN Items ON ItemsPurchased.ItemID = Items.ItemID 
    INNER JOIN ON Items.TypeID = ItemType.TypeID
    WHERE ItemType.Name = "Theme" AND StudentID = theStudentID;

END$$
DELIMITER ;

CALL items_get_students_themes ("email@email.com", "password")


# get purchased profile pictures
DELIMITER $$
CREATE PROCEDURE items_get_students_profile_pictures (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #get purchased profile picture 
    SELECT Items.ItemID, Items.Name, Details, Image FROM ItemsPurchased 
    INNER JOIN Items ON ItemsPurchased.ItemID = Items.ItemID 
    INNER JOIN ItemsType ON Items.TypeID = ItemsType.TypeID
    WHERE ItemsType.Name = "ProfilePicture" AND StudentID = theStudentID;

END$$
DELIMITER ;

CALL items_get_students_profile_pictures ("email2@email.com", "$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K")

# get purchased banners students from class
DELIMITER $$
CREATE PROCEDURE items_get_students_banners (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #get purchased banners
    SELECT ItemID, Name, Details, Image FROM ItemsPurchased 
    INNER JOIN Items ON ItemsPurchased.ItemID = Items.ItemID 
    INNER JOIN ON Items.TypeID = ItemType.TypeID
    WHERE ItemType.Name = "Banner" AND StudentID = theStudentID;

END$$
DELIMITER ;

CALL items_get_students_banners ("email@email.com", "password")
