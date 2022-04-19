# get all themes
DELIMITER $$
CREATE PROCEDURE Themes_get_all (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);

    #get from both purchased and unpurchased themes
    SELECT * FROM
    (
        SELECT 'Unpurchased' Caption, themes.ThemeID, Name, Details, PrimaryColor, BackgroundColor, BtnTextColor, IsDark, Cost, RequiredLevel
        FROM Themes
        WHERE ThemeID NOT IN (SELECT ThemeID FROM ThemesPurchased WHERE StudentID = theStudentID)
        UNION ALL
        SELECT 'Purchased' Caption, themes.ThemeID, Name, Details, PrimaryColor, BackgroundColor, BtnTextColor, IsDark, Cost, RequiredLevel
        FROM Themes 
        INNER JOIN ThemesPurchased 
        ON Themes.ThemeID = ThemesPurchased.ThemeID 
        WHERE studentID = theStudentID
    ) subquery
    ORDER BY RequiredLevel asc, FIELD(Caption, 'Unpurchased', 'Purchased');
END$$
DELIMITER ;

CALL Themes_get_all('email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')


# get all pruchased themes
DELIMITER $$
CREATE PROCEDURE Themes_purchased (sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get student id
    DECLARE theStudentID int;
    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);

    #get purchased themes
    SELECT themes.ThemeID, Name, Details, PrimaryColor, BackgroundColor, BtnTextColor, IsDark, Cost, RequiredLevel
    FROM Themes 
    INNER JOIN ThemesPurchased 
    ON Themes.ThemeID = ThemesPurchased.ThemeID 
    WHERE studentID = theStudentID;
END$$
DELIMITER ;

CALL Themes_purchased('email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')



# student purchase a theme
DELIMITER $$
CREATE PROCEDURE Themes_purchased_add (tID int ,sEmail varchar(255), sPassword varchar(60))
BEGIN
    #get values
    DECLARE theStudentID int;
    DECLARE numCoins int;
    DECLARE itemCost int;
    DECLARE sLevel int;
    DECLARE itemLevel int;

    SET theStudentID = (SELECT StudentID FROM students WHERE email = sEmail AND password = sPassword LIMIT 1);
    SET numCoins = (SELECT Coins FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemCost = (SELECT Cost FROM Themes WHERE ThemeID = tID LIMIT 1);
    SET sLevel = (SELECT Level FROM Students WHERE StudentID = theStudentID LIMIT 1);
    SET itemLevel = (SELECT RequiredLevel FROM Banners WHERE BannerID = tID LIMIT 1);


    # check if can afford
    IF (numCoins >= itemCost AND sLevel >= itemLevel) then 
        # update students coins
        UPDATE students set coins = (numCoins-itemCost) WHERE StudentID = theStudentID;
    ELSE
        SELECT(400) AS 'Error';
    END IF;
    IF (numCoins >= itemCost AND sLevel >= itemLevel) then 
        #add purchased theme to table
        INSERT IGNORE INTO ThemesPurchased (ThemeID,StudentID) 
        VALUES (tID,theStudentID);
    ELSE
        ROLLBACK;
    END IF;
    
END$$
DELIMITER ;

CALL Themes_purchased_add(1,'email2@email.com','$2b$10$frqy1S4DXpzTiM9H2MvdiO5z7NVW8AKSEf7dPt7j5XfGZI5QISJ5K')
