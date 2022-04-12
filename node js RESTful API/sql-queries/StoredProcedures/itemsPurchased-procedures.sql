# get all purchased items
DELIMITER $$
CREATE PROCEDURE items_purchased_get (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    #get all purchased items 
    SELECT Items.ItemID, Items.Name, Items.Details, Items.Image, ItemsType.Name FROM ItemsPurchased 
    INNER JOIN Items ON ItemsPurchased.ItemID = Items.ItemID 
    INNER JOIN Itemstype ON Items.TypeID = ItemsType.TypeID
    WHERE ItemsPurchased.StudentID = theStudentID;

END$$
DELIMITER ;

CALL items_purchased_get ("email@email.com", "password")

/* #Purchase an item
DELIMITER $$
CREATE PROCEDURE items_purchased_add (iID int,sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    DECLARE numCoins int;
    DECLARE itemCost int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    SET numCoins = (SELECT Coins FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemCost = (SELECT Cost FROM Items WHERE ItemID = iID LIMIT 1);
    IF(numCoins > itemCost)then 
    (    #get all purchased items 
        INSERT INTO ItemsPurchased (ItemID,StudentID) 
        VALUES (iID,theStudentID);
    )
    ELSE
        (SELECT(400); ROLLBACK;)
    END IF;

    #get all purchased items 
    #INSERT INTO ItemsPurchased (ItemID,StudentID) 
    #VALUES (iID,theStudentID);

END$$
DELIMITER ;

CALL Items_purchased_add ("email@email.com", "password") */






#Purchase an item
DELIMITER $$
CREATE PROCEDURE items_purchased_add (iID int,sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    DECLARE numCoins int;
    DECLARE itemCost int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    SET numCoins = (SELECT Coins FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemCost = (SELECT Cost FROM Items WHERE ItemID = iID LIMIT 1);
    IF (numCoins > itemCost) then 
        # add item to purchased table 
        UPDATE students set coins = (numCoins-itemCost) WHERE StudentID = theStudentID;
    ELSE
        SELECT(400) AS 'Error';
    END IF;
    IF (numCoins > itemCost) then 
        INSERT IGNORE INTO ItemsPurchased (ItemID,StudentID) 
        VALUES (iID,theStudentID);
    ELSE
        ROLLBACK;
    END IF;


END$$
DELIMITER ;

CALL items_purchased_add(1,"e@email.com","password")
