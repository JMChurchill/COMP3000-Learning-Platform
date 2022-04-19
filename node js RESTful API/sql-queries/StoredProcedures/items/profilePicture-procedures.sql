# get all profile pictures
DELIMITER $$
CREATE PROCEDURE ProfilePic_get_all (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);

    #get from both purchased and unpurchased themes
    SELECT * FROM
    (
        SELECT 'Unpurchased' Caption, ProfilePictures.ProfilePictureID, Name, Details, Image, Cost, RequiredLevel
        FROM ProfilePictures
        WHERE ProfilePictureID NOT IN (SELECT ProfilePictureID FROM ProfilePicturesPurchased WHERE StudentID = theStudentID)
        UNION ALL
        SELECT 'Purchased' Caption, ProfilePictures.ProfilePictureID, Name, Details, Image, Cost, RequiredLevel
        FROM ProfilePictures 
        INNER JOIN ProfilePicturesPurchased 
        ON ProfilePictures.ProfilePictureID = ProfilePicturesPurchased.ProfilePictureID 
        WHERE studentID = theStudentID
    ) subquery
    ORDER BY RequiredLevel asc, FIELD(Caption, 'Unpurchased', 'Purchased');
END$$
DELIMITER ;

CALL ProfilePic_get_all('email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')


# get all pruchased profile pictures
DELIMITER $$
CREATE PROCEDURE ProfilePic_purchased (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);

    #get purchased themes
    SELECT ProfilePictures.ProfilePictureID, Name, Details, Image, Cost, RequiredLevel
    FROM ProfilePictures 
    INNER JOIN ProfilePicturesPurchased 
    ON ProfilePictures.ProfilePictureID = ProfilePicturesPurchased.ProfilePictureID 
    WHERE studentID = theStudentID;
END$$
DELIMITER ;

CALL ProfilePic_purchased('email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')



# student purchase a profile picture
DELIMITER $$
CREATE PROCEDURE ProfilePic_purchased_add (pID int ,sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get values
    DECLARE theStudentID int;
    DECLARE numCoins int;
    DECLARE itemCost int;
    DECLARE sLevel int;
    DECLARE itemLevel int;

    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    SET numCoins = (SELECT Coins FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemCost = (SELECT Cost FROM ProfilePictures WHERE ProfilePictureID = pID LIMIT 1);
    SET sLevel = (SELECT Level FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemLevel = (SELECT RequiredLevel FROM ProfilePictures WHERE ProfilePictureID = pID LIMIT 1);

    # check if can afford
    IF (numCoins >= itemCost AND sLevel >= itemLevel) then 
        # update students coins
        UPDATE students set coins = (numCoins-itemCost) WHERE StudentID = theStudentID;
    ELSE
        SELECT(400) AS 'Error';
    END IF;
    IF (numCoins >= itemCost AND sLevel >= itemLevel) then 
        #add purchased profile picture to table
        INSERT IGNORE INTO ProfilePicturesPurchased (ProfilePictureID,StudentID) 
        VALUES (pID,theStudentID);
    ELSE
        ROLLBACK;
    END IF;
    
END$$
DELIMITER ;

CALL ProfilePic_purchased_add(1,'email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')
