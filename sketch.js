var WAIT_STATE = 0;
var PLAY = 1;
var END = 2;
var SERVE_STATE = 3;
var life = 185;
var energy = 185;
var score = 0;
var gameState = WAIT_STATE;
var playerName, playButton, playButtonImg, restartButton, restartButtonImage, forest;
var logo, waitLogo, logoImg, ninjaText, waitNinjaText, ninjaTextImg, rivalText, waitRivalText, rivalTextImg;
var nameInput, life, lifeImage, energy, energyImage, energyshow;
var backgroundImg, chick, chickImg, cat, catImg, invisibleGround;
var coinImg, diamondImg, grainImg, cucumberImg, rockImg, woodImg, thornImg;
var rulesButton2, rulesButton1, mute_btn1, mute_btn2;
var coin, diamond, energyGiver, grain, cucumber, rock, wood, thorn;
var coins, diamonds, grains, cucumbers, rocks, woods, thorns;
var backgroundMusic, jumpSound, dieSound, checkpointS, scoreS, eatS;

function preload(){
  backgroundImg = loadImage("./assets/ninja_background.png");
  logoImg = loadImage("./assets/Game Logo.png");
  ninjaTextImg = loadImage("./assets/Ninja Title.png");
  rivalTextImg = loadImage("./assets/Rivals.png");
  chickImg = loadAnimation("./assets/chick1.png","./assets/chick2.png","./assets/chick3.png");
  catImg = loadAnimation("./assets/cat1.png","./assets/cat2.png","./assets/cat3.png");
  lifeImage = loadImage("./assets/life symbol (bar).png");
  energyImage = loadImage("./assets/energy symbol (bar).png");
  coinImg = loadImage("./assets/Coin (score).png");
  diamondImg = loadImage("./assets/diamond (score).png");
  grainImg = loadImage("./assets/grain (energy).png");
  cucumberImg = loadImage("./assets/cucumber (energy).png");
  rockImg = loadImage("./assets/rock (obstacle).png");
  woodImg = loadImage("./assets/wood (obstacle).png");
  thornImg = loadImage("./assets/thorn obstacle.png");
  backgroundMusic = loadSound('./assets/sound1.mp3');
  jumpSound =  loadSound('./assets/jump.mp3');
  dieSound = loadSound('./assets/die.mp3');
  checkpointS = loadSound('./assets/checkpoint.mp3');
  scoreS = loadSound('./assets/air.wav');
  eatS =  loadSound('./assets/eating_sound.mp3');
}

function setup(){
  createCanvas(windowWidth, windowHeight);

   forest = createSprite(width/2, height/2);
   forest.addImage(backgroundImg);
   forest.scale = 1.26; 

    waitLogo = createImg('./assets/Game Logo.png')
    waitLogo.position(windowWidth-1150, windowHeight-710,);
    waitLogo.size(300, 200);

    waitNinjaText = createImg('./assets/Ninja Title.png');
    waitNinjaText.position(windowWidth-935, windowHeight-710);
    waitNinjaText.size(180, 175);

    waitRivalText = createImg('./assets/Rivals.png');
    waitRivalText.position(windowWidth-935, windowHeight-635);
    waitRivalText.size(215,150)

    nameInput = createInput("").attribute("placeholder", "Enter your name");
    nameInput.position(windowWidth-870, windowHeight-360);
    nameInput.class("customInput");

    playerName = nameInput.value();

    playButton = createImg('./assets/playBtn.png');
    playButton.position(windowWidth-880, windowHeight-295);
    playButton.size(245,80);
  
    chick = createSprite(windowWidth-510,windowHeight-230, 1,1);
    chick.addAnimation("chickRunning",chickImg);
    chick.scale = 1.05;
    chick.setCollider("circle", 0,0, 50)
    chick.visible = false;

    cat = createSprite(windowWidth-1200, windowHeight-315, 1,1);
    cat.addAnimation("catRunning",catImg);
    cat.scale= 0.95;
    cat.visible = false;
    cat.setCollider("circle", 0, 0, 165);

    energyshow = createSprite(width-915, height-678, 1, 1);
    energyshow.addImage(energyImage);
    energyshow.scale = 0.08;
    energyshow.visible = false;

    Logo = createSprite(windowWidth-186, windowHeight-707, 1, 1);
    Logo.addImage("title",logoImg);
    Logo.scale = 0.125;
    Logo.visible = false;

    NinjaText = createSprite(windowWidth-80, windowHeight-715, 1, 1);
    NinjaText.addImage("ninjaTitle", ninjaTextImg);
    NinjaText.scale = 0.06;
    NinjaText.visible = false;

    RivalText = createSprite(windowWidth-65, windowHeight-670, 1,1);
    RivalText.addImage("rivalTitle", rivalTextImg);
    RivalText.scale = 0.4;
    RivalText.visible = false;

    invisibleGround = createSprite(0, windowHeight-175, width*2, 10);
    invisibleGround.visible = false;

    restartButton = createImg('./assets/reset button.png');
    restartButton.position(windowWidth-1475, windowHeight-675);
    restartButton.size(70,70);
    restartButton.hide();

    rulesButton1 = createImg('./assets/rules button.png');
    rulesButton1.position(windowWidth-250, windowHeight-740);
    rulesButton1.size(175, 70);

    rulesButton2 = createImg('./assets/rules button.png');
    rulesButton2.position(windowWidth-450, windowHeight-740);
    rulesButton2.size(175, 70);
    rulesButton2.hide();

    closeButton = createImg('./assets/close button.png');
    closeButton.position(windowWidth-1420, windowHeight-745);
    closeButton.size(70,70);
    closeButton.hide();

    mute_btn1 = createImg('./assets/mute.png');
    mute_btn1.position(windowWidth-350,windowHeight-740);
    mute_btn1.size(70,70);
    mute_btn1.mouseClicked(mute);
    mute_btn1.hide()

    mute_btn2 = createImg('./assets/mute.png');
    mute_btn2.position(windowWidth-400,windowHeight-737);
    mute_btn2.size(70,70);
    mute_btn2.mouseClicked(mute);

    coins = new Group ();
    diamonds = new Group ();
    energyGivers = new Group ();
    grains  = new Group ();
    cucumbers = new Group ();
    rocks = new Group ();
    woods = new Group ();
    thorns = new Group ();

    backgroundMusic.play();
    backgroundMusic.setVolume(0.2);

}

function draw() {
     background(189);
     image(backgroundImg, 0,0, windowWidth, windowHeight);
  
  if (gameState === WAIT_STATE){
    waitLogo.visible = true;
    waitNinjaText.visible = true;
    waitRivalText.visible = true;
    playButton.mouseClicked(clickPlay);
    rulesButton1.mouseClicked(rulesOfGame1);
    fill("white");
    textSize(23);
    text("mute", windowWidth-388, windowHeight-650);
  }

   else if(gameState === PLAY){

    drawSprites();
      showLife();
      showEnergy();
      spawnObstacles();
      spawnScoreables();
      spawnEnergy();

      if (score != 0 && score % 10 === 0){
        checkpointS.play();
      }
       energy -= 0.3;
       if (energy <= 0){
         dieSound.play();
         gameOver ();
         gameState = END;
       }

       if (life <= 0){
        dieSound.play();
        gameOver ();
        gameState = END;
      }
       if (coins.isTouching(chick)) {
        coins.destroyEach();
        score += 1;
        scoreS.play();
      }
      else if (diamonds.isTouching(chick)) {
        diamonds.destroyEach();
        score += 2;
        scoreS.play();
      }

      if(grains.isTouching(chick)){
        eatS.play();
        grains.destroyEach();
        energy = 150
      }
      else if(cucumbers.isTouching(chick)){
        eatS.play();
        cucumbers.destroyEach();
        energy = 185;
      }

      if(rocks.isTouching(chick)){
        dieSound.play();
        rocks.destroyEach();
        life = life-62;
      }
      else if(woods.isTouching(chick)){
        dieSound.play();
        woods.destroyEach();
        life = life-62;
      }
      else if(thorns.isTouching(chick)){
          dieSound.play();
          thorns.destroyEach();
          life = life-62;
      }

      if(rocks.isTouching(cat) && cat.y > windowHeight-450){
        cat.velocityY = -14
        jumpSound.play();
      }
      if(woods.isTouching(cat) && cat.y > windowHeight-450){
        cat.velocityY = -14
        jumpSound.play();
      }
      if(thorns.isTouching(cat) && cat.y > windowHeight-450){
        cat.velocityY = -14
        jumpSound.play();
      }

      restartButton.mouseClicked(restart);

      forest.velocityX = -(4 + 3*score/10)

      if(forest.x < width/4 ){
      forest.x = width/2;
      };  

      push()
      stroke("green");
      fill("yellow");
      rect(width-1475, height-750, 275, 50);
      fill("Brown");
      textSize(30);
      text("Your Score :", width-1460, height-715);
      fill("cyan")
      text(score, width-1290, height-715);
      fill("white");
      textSize(23);
      noStroke();
      text("Restart Game", windowWidth- 1398, windowHeight-635);
      fill("white");
      textSize(23);
      noStroke();
      text("mute", windowWidth-340, windowHeight-650);
      pop()

      chick.visible = true;
      cat.visible = true;
      energyshow.visible = true;
      Logo.visible = true;
      NinjaText.visible = true;
      RivalText.visible = true;
      restartButton.show();
      mute_btn1.show()


      if (keyDown("space")  && chick.y > windowHeight-250){
        chick.velocityY = -14;
        jumpSound.play();
      }
        chick.velocityY = chick.velocityY + 0.7;
        cat.velocityY = cat.velocityY + 0.7;
  
        chick.collide(invisibleGround);
        cat.collide(invisibleGround);
    }

    else if(gameState === SERVE_STATE){
      Logo.visible = true;
      NinjaText.visible = true;
      RivalText.visible = true;
      closeButton.show();
      closeButton.mouseClicked(restart);
      forest.visible =false;
      waitNinjaText.hide();
      waitRivalText.hide();
      waitLogo.hide ();

      fill("white");
      stroke("Black");
      rect(windowWidth- 1350, windowHeight-740, 1170, 500);
      fill("green");
      textSize(45);
      text("                                         The Rules", windowWidth-1400, height-700);
      fill("red");
      stroke("white");
      textSize(30);
      text("1. Enter your name in box correctly.", windowWidth-1335, height-665);
      text("2. You are the chick in the game.", windowWidth-1335, height-630);
      text("3. Press on the Space Bar Key to make the chick jump.", windowWidth-1335, height-595);
      text("4. Do not hit the obstacles(obstacles are the rocks, the woods and thorny bushes).", windowWidth-1335, height-560);
      text("5. If you hit the obstacles, the life will decrease.", windowWidth-1335, height-525);
      text("6. You will get only 3 lives, if they will finish, the game will end.", windowWidth-1335, height-490);
      text("7. Also, your energy will decrease slowly.", windowWidth-1335, height-455);
      text("8. To regain your energy, collect the boosters(boosters are the cucumbers and grains).", windowWidth-1335, height-420);
      text("9. If your energy will finish, your game would be over.", windowWidth-1335, height-385);
      text("10. Your score will increase after collecting coins & diamonds.", windowWidth-1335, height-350);
      fill("blue")
      text("                                                         ENJOY THE GAME !", windowWidth-1400, height-300);
    }

    else if (gameState === END){
      energy = 0;
      life = 0;
      forest.velocityX = 0;
      restartButton.hide ();
      mute_btn1.hide ();
    }
}

function showLife() {
  push();
  image(lifeImage, width- 930, height- 725, 25, 25);
  fill("white");
  rect(width -900, height -725, 185, 20);
  fill("#f50057");
  rect(width -900, height -725, life, 20);
  noStroke();
  pop();
}

function showEnergy() {
  push();
  fill("white");
  rect(width-900, height-692, 185, 20);
  fill("#ffc400");
  rect(width-900, height-692, energy, 20);
  noStroke();
  pop();
}

function gameOver() {
    swal({
      title: `Game Over`,
      text: `Your score is: \n ${score}`,
      imageUrl:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Play Again"
    },
    function(isConfirm){
      if(isConfirm) {
        window.location.reload();
      };
    });
}

function restart(){
  window.location.reload()
}

function clickPlay () {
  waitNinjaText.hide();
  waitRivalText.hide();
  nameInput.hide();
  playButton.hide ();
  rulesButton1.hide();
  mute_btn2.hide();
  waitLogo.hide();

  gameState = PLAY;
}

function rulesOfGame1 () {
  gameState = SERVE_STATE;
  waitLogo.visible = false;
  waitNinjaText.visible = false;
  waitRivalText.visible = false;
  nameInput.hide();
  playButton.hide ();
  rulesButton1.hide();
  mute_btn2.hide()
}

function rulesOfGame2() {
  gameState = SERVE_STATE;
  RivalText.visible = false;
  NinjaText.visible = false;
  Logo.visible = false;
  energyshow.visible = false;
  chick.visible = false;
  cat.visible = false;
  rulesButton2.hide();
  restartButton.hide();
  mute_btn1.hide
}

function mute()
{
  if(backgroundMusic.isPlaying())
     {
      backgroundMusic.stop();
     }
     else{
      backgroundMusic.play();
     }
}

function spawnScoreables (){
  if (World.frameCount % 113.5 === 0) {
    var coin = createSprite(windowWidth-10,windowHeight-225,10,10);
    coin.addImage(coinImg);
    coin.scale=0.11;
    coin.velocityX = -(4 + 3*score/10)
    coin.lifetime = 295;
    coins.add(coin);
    }

    if (World.frameCount % 467 === 0) {
      var diamond = createSprite(windowWidth-10,windowHeight-225,10,10);
      diamond.addImage(diamondImg);
      diamond.scale=0.12;
      diamond.velocityX = -(4 + 3*score/10)
      diamond.lifetime = 295;
      diamonds.add(diamond);
      }
}

function spawnEnergy (){
  if (World.frameCount % 520 === 0) {
    var grain = createSprite(windowWidth-10,windowHeight-225,10,10);
    grain.addImage(grainImg);
    grain.scale=0.15;
    grain.velocityX = -(4 + 3*score/10)
    grain.lifetime = 295;
    grains.add(grain);
    }

    if (World.frameCount % 811.5 === 0) {
      var cucumber = createSprite(windowWidth-10,windowHeight-225,10,10);
      cucumber.addImage(cucumberImg);
      cucumber.scale=0.035;
      cucumber.velocityX = -(4 + 3*score/10)
      cucumber.lifetime = 295;
      cucumbers.add(cucumber);
      }
}

function spawnObstacles (){
  if (World.frameCount % 214.5 === 0) {
    var rock = createSprite(windowWidth-20,windowHeight-220,10,10);
    rock.addImage(rockImg);
    rock.setCollider("circle",0,0,90);
    rock.scale=0.18;
    rock.velocityX = -(4 + 3*score/10)
    rock.lifetime = 380;
    rocks.add(rock);
    }
    if (World.frameCount % 287.5 === 0) {
      var wood = createSprite(windowWidth-20,windowHeight-218,10,10);
      wood.addImage(woodImg);
      wood.scale=0.1;
      wood.setCollider("circle", 0,0, 380);
      wood.velocityX = -(4 + 3*score/10)
      wood.lifetime = 380;
      woods.add(wood);
      }
      if (World.frameCount % 359.5 === 0) {
        var thorn = createSprite(windowWidth-20,windowHeight-220,10,10);
        thorn.addImage(thornImg);
        thorn.scale=0.18;
        thorn.setCollider("circle", 0,0, 200);
        thorn.velocityX = -(4 + 3*score/10)
        thorn.lifetime = 380;
        thorns.add(thorn);
        }
}