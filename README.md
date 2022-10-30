# Simple-ERC20-coin-platform-with-game-written-on-Typescript-and-Solidity

It uses Atlas cloud and to run it at your computer, you have to create .env file and write : 
'DB_CONN_STRING=mongodb+srv://yourusername:yourpassword@cluster0.ryhcakl.mongodb.net/Shila?retryWrites=true&w=majority'
on it.

To run it at Docker container, at the client folder, you must type : docker build -t react-docker-front. 
After react-docker image is created, just type : docker run -it -p 4000:3000 react-docker-front. 
And then at the back folder, you must type : docker build -t react-docker-back. 
After react-docker image is created, just type : docker run -it -p 3000:3000 react-docker-back.

It is executed and shortly explained on : https://www.youtube.com/watch?v=oku3CdyFYik
