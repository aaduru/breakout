## BreakOut

### Background

In the game, a layer of bricks lines the top of the screen. A ball travels across the screen, bouncing off the top and side walls of the screen. When a brick is hit, the ball bounces away and the brick is destroyed. The player loses a turn when the ball touches the bottom of the screen. To prevent this from happening, the player has a movable paddle to bounce the ball upward, keeping it in play.

### Functionality & MVP  

- [ ] Start the game and display the bricks and move the ball within the screen.
- [ ] Collision of the ball with the bricks (Will Be able to break the bricks on top of the screen).
- [ ] No of lives (The user will have 3 lives to play this game).
- [ ] No of levels (There will be three levels in the game, in each level the movable paddle size will decrease, the ball's speed will increase and no of rows of bricks will increase along with the bricks on each level).

In addition, this project will include:

- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, game instructions, and nav bar. The nav bar will have the name of the game and links to mu Github and  my LinkedIn accounts. The game instructions will have instructions of the game and keys used to play the game. The game board will have the bricks and the paddle and the ball.

![wireframes](./images/JavaScriptGame.png)

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- CSS for styling

The project will have the following files.

`game.js`: This is the main script file which will handle all the logic behind the screen. It will involve creation of the bricks, ball and paddle. It will also have functions which will move the ball, collision detection of the bricks and the ball and will have functions to create new lives and levels.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js`.   
- Get a green bundle with `webpack`
- Write the html page with required elements for nav bar, game board and the game instructions and give it basic styling.
- In the game.js script file, write functions to display the bricks, paddle and the ball. write function for the ball to move around.


**Day 2**: Write a collision function. This function will let the ball move around the three walls of the board ie the top, left and right. When the ball hits the brick the brick should disappear. create keyboard controls to move the paddle (ie the paddle should move to left and right based on the arrow keys)

**Day 3**: No of lives. A player can have only 3 lives. If a ball does not touch the paddle when it is travelling towards the bottom side of the screen the player loses a life. Create button to start the game.

**Day 4**: No of levels. There will three levels that the user has to play to win the game, each increasing with difficulty.

- create three levels with increased difficulty
- Have a styled `Canvas`, nice looking controls and title


### Bonus features

 Some anticipated updates are:

- [ ] In the increased difficulty level add bricks which have to be hit multiple times to be broken
- [ ] In the last level add 2 balls which the user has to control simultaneously.
