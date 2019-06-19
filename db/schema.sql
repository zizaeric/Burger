-- Create a database called burgers_db --
CREATE DATABASE burgers_db;
USE burgers_db;

-- Create a table called burgers --
CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT, 
    burger_name VARCHAR(255) NOT NULL,
    devoured BOOLEAN default 0,
    PRIMARY KEY (id)
);