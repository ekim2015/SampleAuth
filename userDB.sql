IF (EXISTS userDB)
BEGIN
    DROP DATABASE userDB
END

CREATE DATABASE userDB

-- create table to contain user information
IF (NOT EXISTS userInfo)
BEGIN
    CREATE TABLE userInfo (
        uuID VARCHAR(255)
        username VARCHAR(30)
        -- salted pw + salt value using 2a format
        saltedPass BINARY(60)
    )
END