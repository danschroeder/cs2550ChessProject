JSON Documentation

Include a plain-text file in your zip file that explains 
How I used JSON:
I used JSON to take a snapshot of all the relevant objects (listed below) needed to save data for a game. 

- game  
- whiteTeam
- blackTeam

1. I generated sample game data using the toJSON button/function which displays the current game data in JSON in the console. (This does not store the JSON or modify any files at all though it easily could and likely will eventually)
2. I sent a GET request to my sample data (located in the main project folder named gamedata.txt)
3. I captured the response text using JSON.parse() method
4. I assigned the various JSON objects to their corresponding JavaScript Objects
5. I reloaded the game board to show the newly loaded JSON game data

