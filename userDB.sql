DROP DATABASE userDB if EXISTS userDB

CREATE DATABASE userDB

-- create table to contain user information
CREATE TABLE userInfo (
    uuID VARCHAR(255)
    username VARCHAR(30)
    -- salted pw + salt value using 2a format
    saltedPass BINARY(60)
) if NOT EXISTS userInfo
