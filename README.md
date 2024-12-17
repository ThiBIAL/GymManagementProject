# GymManagement

Follow this README to acces to the website; 

A gym needs a web-base system for organization, which will be used by clients, administrators, front desk and coaches. 

# First Step 

Put your password of SQL in the file 'database.js' in the line 3. This file is ./backend/config/database.js

# Second Step 

Create the database 'gym_db' in SQL to acces to the database with the line : 'CREATE DATABASE gym_db;'

# Thrid Step 

Install the depencies and the package (if you don't have it) to be able to acces to the website : 
'npm install express'
'npm install express bcrypt sequelize mysql2 body-parser cors'
'npm install multer'
...

# Final Step 
    1. Open VS-terminal or CMD-terminal and tape 
        'cd .\GymManagement\backend\'
        'node index.js'
        Go in the backend file to launch the backend. 
    2. Open an other VS-terminal or CMD-terminal and tape
        'cd .\GymManagement\'
        'npm run serve'
        To launch in the server
    3. You should have a link to the website :
        'Local:   http://localhost:8081/ '
