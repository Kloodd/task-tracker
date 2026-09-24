USE TaskTracker;
GO

-- Users table
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);
GO

-- Tasks table
CREATE TABLE Tasks (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(100) NOT NULL,
    Description VARCHAR(500) NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    DueDate DATE NULL,
    CreatedBy INT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Tasks_Users
     FOREIGN KEY (CreatedBy)
      REFERENCES Users(Id),

    CONSTRAINT CK_Tasks_Status
     CHECK (Status IN ('Pending', 'In Progress', 'Completed'))
);
GO