-- users table
-- CREATE TABLE Users (ID int NOT NULL AUTO_INCREMENT, Email varchar(255) UNIQUE, Name varchar(60),Password varchar(60) NOT NULL, PRIMARY KEY (ID))


-- Students table
CREATE TABLE Students (
    StudentID int NOT NULL AUTO_INCREMENT, 
    Email varchar(255) UNIQUE NOT NULL, 
    FirstName varchar(60) NOT NULL, 
    LastName varchar(60) NOT NULL,
    Password varchar(60) NOT NULL, 
    PRIMARY KEY (StudentID)
    );

-- Teachers table
CREATE TABLE Teachers (
    TeacherID int NOT NULL AUTO_INCREMENT, 
    Email varchar(255) UNIQUE NOT NULL, 
    FirstName varchar(60) NOT NULL, 
    LastName varchar(60) NOT NULL,
    PhoneNumber varchar(13) NOT NULL, -- +44 7911 123456
    Password varchar(60) NOT NULL, 
    PRIMARY KEY (TeacherID)
    );

-- Class Details table
CREATE TABLE ClassDetails (
    ClassDetailsID int NOT NULL AUTO_INCREMENT, 
    Name varchar(60) NOT NULL, 
    YearGroup int,
    TeacherID int NOT NULL,
    PRIMARY KEY (ClassDetailsID),
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
    );

-- Classes table
CREATE TABLE Classes (
    StudentID int NOT NULL, 
    ClassDetailsID int NOT NULL, 
    PRIMARY KEY (StudentID, ClassDetailsID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (ClassDetailsID) REFERENCES ClassDetails(ClassDetailsID)
    );

-- Achievements table
CREATE TABLE Achievements (
    AchievementID int NOT NULL AUTO_INCREMENT, 
    Name varchar(60) NOT NULL, 
    XP int NOT NULL,
    ToUnlock text NOT NULL,
    PRIMARY KEY (AchievementID)
    );

-- Students Achievements table
CREATE TABLE StudentsAchievements (
    StudentID int NOT NULL, 
    AchievementID int NOT NULL, 
    PRIMARY KEY (StudentID, AchievementID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (AchievementID) REFERENCES Achievements(AchievementID)
    );


-- Flashcard Deck table
CREATE TABLE FlashCardDeck (
    DeckID int NOT NULL AUTO_INCREMENT, 
    Name varchar(60) NOT NULL, 
    StudentID int NOT NULL,
    PRIMARY KEY (DeckID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
    );

-- Flashcards table
CREATE TABLE FlashCards (
    CardID int NOT NULL AUTO_INCREMENT, 
    DeckID int NOT NULL, 
    Question text NOT NULL, 
    Answer text NOT NULL, 
    PRIMARY KEY (CardID),
    FOREIGN KEY (DeckID) REFERENCES FlashCardDeck(DeckID)
    );

-- Assignments table
CREATE TABLE Assignments (
    TaskID int NOT NULL AUTO_INCREMENT, 
    TeacherID int NOT NULL, 
    StudentID int NOT NULL, 
    -- TaskName text NOT NULL, 
    TaskType varchar(60) NOT NULL,
    PRIMARY KEY (TaskID),
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
    );

-- Quizzes table
CREATE TABLE Quizzes (
    QuizID int NOT NULL AUTO_INCREMENT, 
    QuizName text NOT NULL, 
    TaskID int NOT NULL, 
    PRIMARY KEY (QuizID),
    FOREIGN KEY (TaskID) REFERENCES Assignments(TaskID)
    );

-- Quiz questions table
CREATE TABLE QuizQuestions (
    QuestionID int NOT NULL AUTO_INCREMENT, 
    QuizID int NOT NULL, 
    Question text NOT NULL, 
    Answer text NOT NULL, 
    PRIMARY KEY (QuestionID),
    FOREIGN KEY (QuizID) REFERENCES Quizzes(QuizID)
    );

-- Quiz Options table
CREATE TABLE QuizOptions (
    QuizOptionsID int NOT NULL AUTO_INCREMENT, 
    QuestionID int NOT NULL, 
    TheOption text NOT NULL, 
    PRIMARY KEY (QuizOptionsID),
    FOREIGN KEY (QuestionID) REFERENCES QuizQuestions(QuestionID)
    );

-- Word Links table
CREATE TABLE WordLinks (
    WordLinkID int NOT NULL AUTO_INCREMENT, 
    WordLinkName text NOT NULL, 
    TaskID int NOT NULL, 
    PRIMARY KEY (WordLinkID),
    FOREIGN KEY (TaskID) REFERENCES Assignments(TaskID)
    );

-- Words table
CREATE TABLE Words (
    WordID int NOT NULL AUTO_INCREMENT, 
    Definition text NOT NULL, 
    Answer text NOT NULL, 
    WordLinkID int NOT NULL, 
    PRIMARY KEY (WordID),
    FOREIGN KEY (WordLinkID) REFERENCES WordLinks(WordLinkID)
    );




