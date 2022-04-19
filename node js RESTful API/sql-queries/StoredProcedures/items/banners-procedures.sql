# get all banners
DELIMITER $$
CREATE PROCEDURE Banners_get_all (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);

    #get from both purchased and unpurchased banners
    SELECT * FROM
    (
        SELECT 'Unpurchased' Caption, Banners.BannerID, Name, Details, Image, Cost, RequiredLevel
        FROM Banners
        WHERE BannerID NOT IN (SELECT BannerID FROM BannersPurchased WHERE StudentID = theStudentID)
        UNION ALL
        SELECT 'Purchased' Caption, Banners.BannerID, Name, Details, Image, Cost, RequiredLevel
        FROM Banners 
        INNER JOIN BannersPurchased 
        ON Banners.BannerID = BannersPurchased.BannerID 
        WHERE studentID = theStudentID
    ) subquery
    ORDER BY RequiredLevel asc, FIELD(Caption, 'Unpurchased', 'Purchased');
END$$
DELIMITER ;

CALL Banners_get_all('email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')


# get all pruchased banners
DELIMITER $$
CREATE PROCEDURE Banners_purchased (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);

    #get purchased banners
    SELECT Banners.BannerID, Name, Details, Image, Cost, RequiredLevel
    FROM Banners 
    INNER JOIN BannersPurchased 
    ON Banners.BannerID = BannersPurchased.BannerID 
    WHERE studentID = theStudentID;
END$$
DELIMITER ;

CALL Banners_purchased('email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')



# student purchase a banner
DELIMITER $$
CREATE PROCEDURE Banners_purchased_add (bID int ,sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get values
    DECLARE theStudentID int;
    DECLARE numCoins int;
    DECLARE itemCost int;
    DECLARE sLevel int;
    DECLARE itemLevel int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    SET numCoins = (SELECT Coins FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemCost = (SELECT Cost FROM Banners WHERE BannerID = bID LIMIT 1);
    SET sLevel = (SELECT Level FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemLevel = (SELECT RequiredLevel FROM Banners WHERE BannerID = bID LIMIT 1);

    # check if can afford
    IF (numCoins >= itemCost AND sLevel >= itemLevel) then 
        # update students coins
        UPDATE students set coins = (numCoins-itemCost) WHERE StudentID = theStudentID;
    ELSE
        SELECT(400) AS 'Error';
    END IF;
    IF (numCoins >= itemCost AND sLevel >= itemLevel) then 
        #add purchased banner to table
        INSERT IGNORE INTO BannersPurchased (BannerID,StudentID) 
        VALUES (bID,theStudentID);
    ELSE
        ROLLBACK;
    END IF;
    
END$$
DELIMITER ;

CALL Banners_purchased_add(1,'email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')
