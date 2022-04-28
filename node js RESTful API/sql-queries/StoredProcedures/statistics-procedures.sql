 # get monthly signups
DELIMITER $$
CREATE PROCEDURE Monthly_signups ()
BEGIN
    SELECT CONCAT(UPPER(DATE_FORMAT(SignUpDate, '%b')),'-',year(SignUpDate)) AS Month, count(*) AS Num
    FROM studentsignups
    GROUP BY CONCAT(UPPER(DATE_FORMAT(SignUpDate, '%b')),'-',year(SignUpDate));
END$$
DELIMITER ;

 # get total users by month
DELIMITER $$
CREATE PROCEDURE Monthly_signups ()
BEGIN
    /* SELECT CONCAT(UPPER(DATE_FORMAT(SignUpDate, '%b')),'-',year(SignUpDate)) AS Month, count(*) AS Num
    FROM studentsignups
    GROUP BY CONCAT(UPPER(DATE_FORMAT(SignUpDate, '%b')),'-',year(SignUpDate)); */
    SELECT *  SUM(Num) OVER FROM studentsignups,
    (SELECT CONCAT(UPPER(DATE_FORMAT(SignUpDate, '%b')),'-',year(SignUpDate)) AS Month, count(*) AS Num
    FROM studentsignups
    GROUP BY CONCAT(UPPER(DATE_FORMAT(SignUpDate, '%b')),'-',year(SignUpDate))) AS montly;
END$$
DELIMITER ;