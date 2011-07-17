c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("./IMGS/sphere1.dae");
c3dl.addModel("./IMGS/newSphere.dae");
c3dl.addModel("./IMGS/gameover.dae");
c3dl.addModel("./IMGS/plane3D.dae");

//Wall Contstants
var initialWall1X = -70;
var initialWall1Y = -220;
var initialWall1Z = 0;
var initialWall2X = -215;
var initialWall2Y = -50;
var initialWall2Z = 0;
var initialWall3X = 145;
var initialWall3Y = -47;
var initialWall3Z = 0;
var initialWall4X = -70;
var initialWall4Y = 185;
var initialWall4Z = 0;
var initialWall5X = -70;
var initialWall5Y = -3;
var initialWall5Z = 300;

/*var initialWall1X = -60;
var initialWall1Y = -90;
var initialWall1Z = -10;
var initialWall2X = -165;
var initialWall2Y = -40;
var initialWall2Z = -10;
var initialWall3X = 115;
var initialWall3Y = -37;
var initialWall3Z = -10;
var initialWall4X = -40;
var initialWall4Y = 155;
var initialWall4Z = -10;
var initialWall5X = -60;
var initialWall5Y = 7;
var initialWall5Z = 140;*/

//End

var wall = new Array(6);
var lives = new Array(3);//will indicate lives remaining in the game
var ball;
var timeGap = 0;
var scn;
var lifescn;
var cam;
var ballGenerateTimeGap = 0;
var totalBallCount=0;
var mistakeCount = 0;//more than 3 mistakes means GAME OVER
var currentFreePosition=0;  //As the name says
var positionFound=0;    // Flag to check whether a position is found to insert a ball
var currentFreePosition2;
var positionFindingCounter=0;
var effect;
var max_limit=25;	//ballArray Max LIMIT
var ballArray = new Array(32);
var alphabetPositionToRemove = 0;
var explode;
var explosionOn = 0;
var ballExplodePosition = [];
var collisionObjects = [];
var collisionTimeLinearVelocity1;
var collisionTimeLinearVelocity2;
var collisionIndexCounter = 0;
var noOfObjectCollided = 0;
var objectCollidedMod;
var alphabetListLength=26;	//alphabetList MAX LIMIT
var alphabetArrayMaster = new Array(26);
var referenceArray=new Array(26);
var canvas2d;
var density;
var randomNumber1 = 0;
var randomNumber2 = 0;
var randomNumber3 = 0;
var tempObjectToDel = 0; //Object location for temporarily delteing the objects for testing purpose
var i;
var scorefield;
var levelfield
var score=0;
var ballGenerationRate = 600;

var isGenerating = 0;
var difficultyLevel = 1;


/*function ballAddition(currentFreePosition2)
{
  randomNumber1=Math.round(c3dl.getRandom(0, 25));	//from 1 to 26, coz 0 is creating UNKNOWN problem
  referenceArray[randomNumber1].push(currentFreePosition2);
  ballArray[currentFreePosition2]=new c3dl.Collada();
  ballArray[currentFreePosition2].isBall=1;
  ballArray[currentFreePosition2].ownCollisionIndex= collisionIndexCounter++;
  ballArray[currentFreePosition2].lastCollisionIndex=-7;
  ballArray[currentFreePosition2].init("./IMGS/sphere1.dae");
  switch(randomNumber1)
  {
	case 0:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 1:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereB.png");
		break;
	case 2:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereC.png");
		break;
	case 3:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereD.png");
		break;
	case 4:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereE.png");
		break;
	case 5:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 6:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 7:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 8:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 9:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 10:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 11:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 12:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 13:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;		
	case 14:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 15:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 16:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 17:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 18:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 19:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 20:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 21:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 22:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 23:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 24:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 25:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
  }
  if (randomNumber1!=0)
	randomNumber1/=100;
  //var pos = randomNumber1 * 150;
  //ballArray[currentFreePosition2].setPosition([pos,pos,pos]);
  randomNumber2=Math.random()/10;
  randomNumber3=Math.random()/10;
  ballArray[currentFreePosition2].setLinearVel(new Array(randomNumber1-randomNumber2,randomNumber2-randomNumber3,randomNumber3-randomNumber1));
  
  ballArray[currentFreePosition2].setPosition([(randomNumber1-randomNumber2)*1000,(randomNumber2-randomNumber3)*1000,100])
  //ballArray[currentFreePosition2].setLinearVel(new Array(-0.06, 0.02, 0.03));
  ballArray[currentFreePosition2].setPickable(false);
  scn.addObjectToScene(ballArray[currentFreePosition2]);
  ++totalBallCount;
 }*/

function endScene(event)
{
    scn.stopScene();
}

function gameOver()
{
    scn.removeObjectFromScene(lives[2]);
	/*var gameovermsg=new c3dl.Collada();
	gameovermsg.init("./IMGS/gameover.dae");
	gameovermsg.setTexture("./IMGS/gameover.png");
	gameovermsg.scale([0.07,0.07,0.07]);
	gameovermsg.yaw(0.01);
	gameovermsg.yaw(Math.PI);
	gameovermsg.setAngularVel([0.001,0,0]);
	gameovermsg.setEffect(effect);
	gameovermsg.setPosition([0,0,-200]);
	scn.addObjectToScene(gameovermsg);*/
    scorefield.innerHTML = "GAME   OVER!! Your score: " + score;
    //scn.stopScene();
    scn.removeAllBalls();
    scn.setKeyboardCallback(endScene);
}

function checkCollision(time)
{
	//Collision Detection Segment
    timeGap += time;
    if(time > 50)
    {		 
		collisionObjects = scn.getCollision();
		noOfObjectCollided=collisionObjects.length;
		if(noOfObjectCollided != 0)
		{   
                        if (noOfObjectCollided % 2 != 0)
			{
				 noOfObjectCollided--;
				 objectCollidedMod=1;
			}
                        else
          			objectCollidedMod = 0;

			for (i=0;i<noOfObjectCollided;i+=2)
			{   			
				collisionTimeLinearVelocity1=collisionObjects[i].getLinearVel();
				collisionTimeLinearVelocity2=collisionObjects[i+1].getLinearVel();
				if (collisionObjects[i].isBall==1)      
				{
					if (collisionObjects[i].lastCollisionIndex!=collisionObjects[i+1].ownCollisionIndex)
					{                                    
						collisionObjects[i].setLinearVel([collisionTimeLinearVelocity2[0],collisionTimeLinearVelocity2[1],-collisionTimeLinearVelocity2[2]]);
						collisionObjects[i+1].setLinearVel([collisionTimeLinearVelocity1[0],collisionTimeLinearVelocity1[1],-collisionTimeLinearVelocity1[2]]);
						collisionObjects[i+1].lastCollisionIndex=collisionObjects[i].ownCollisionIndex;
						collisionObjects[i].lastCollisionIndex=collisionObjects[i+1].ownCollisionIndex;
					}
                                }
			}
			if (objectCollidedMod==1)
			{
			  collisionTimeLinearVelocity1=collisionObjects[noOfObjectCollided-1].getLinearVel();
			  collisionObjects[noOfObjectCollided-1].setLinearVel([-collisionTimeLinearVelocity1[0],-collisionTimeLinearVelocity1[1],-collisionTimeLinearVelocity1[2]]);
			}
		}             
		timeGap = 0;
    }
}

function ballGenerate(time)
{
    //alert("isGenerating is made 1");

    if (totalBallCount<=max_limit && mistakeCount <= 2)
    {
        //alert(time);
    ballGenerateTimeGap += time;
    //alert(ballGenerateTimeGap + "," + ballGenerationRate);
    //levelDependantExponentialOffset = ballGenerationRate * Math.exp(-(difficultyLevel - 1));
    var a = 2 * Math.log(difficultyLevel + 1);
    //alert(a);
    levelDependantExponentialOffset = ballGenerationRate / a;
    if(ballGenerateTimeGap >= levelDependantExponentialOffset)
        {            
            ballGenerateTimeGap=0;
            positionFound=0;
            //alert("bye");

            for(positionFindingCounter=currentFreePosition;positionFindingCounter<max_limit;++positionFindingCounter) 
                {
                 // alert("i = " + positionFindingCounter + " total ball count = " + totalBallCount);
                   if (!ballArray[positionFindingCounter].visible)
                   {
                //        alert("in");                            
                            currentFreePosition=positionFindingCounter;
                            positionFound=1;
                            isGenerating = 1;
                            timeAtBallGenerate = Date.now();
                            ballAddition(currentFreePosition);
                            //alert("add");
                            break;
                    }						
                }
                //alert("currentFreePosition : " + currentFreePosition + "  " + positionFound);
            if (positionFound==0)
            {
                for(positionFindingCounter=0;positionFindingCounter<currentFreePosition;++positionFindingCounter)
                {
                        if (!ballArray[positionFindingCounter].visible)
                        {
                                timeAtBallGenerate = Date.now();
                                ballAddition(positionFindingCounter);
                               currentFreePosition=positionFindingCounter;
                                positionFound=1;
                                isGenerating = 1;
                                //alert("add");
                                break;
                        }
                }
            }
                //alert("currentFreePosition : " + currentFreePosition + "  " + positionFound);
                if (positionFound==0)
                {
                     gameOver();
                }

        }
    }
    else
    {
      gameOver();
    }
    checkCollision(time);
    drawHud();
    //isGenerating = 0;
}

function ballAddition(currentFreePosition2)
{
    //alert("hi");
    randomNumber1=Math.round(c3dl.getRandom(0, 4));	//from 1 to 26, coz 0 is creating UNKNOWN problem
    referenceArray[randomNumber1].push(currentFreePosition2);
    ballArray[currentFreePosition2].ownCollisionIndex= collisionIndexCounter++;
    ballArray[currentFreePosition2].lastCollisionIndex=-7;
      switch(randomNumber1)
  {
	case 0:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 1:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereB.png");
		break;
	case 2:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereC.png");
		break;
	case 3:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereD.png");
		break;
	case 4:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereE.png");
		break;
	case 5:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 6:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 7:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 8:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 9:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 10:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 11:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 12:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 13:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;		
	case 14:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 15:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 16:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 17:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 18:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 19:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 20:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 21:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 22:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 23:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 24:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
	case 25:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.png");
		break;
  }
  if (randomNumber1!=0)
        randomNumber1/=100;
  //ballArray[currentFreePosition2].setPosition([pos,pos,pos]);
  randomNumber2=Math.random()/10;
  randomNumber3=Math.random()/10;
  //alert("isGenerating is made 0");
  //var levelDependantVelocityOffset = 5 * (1 - Math.exp(-(difficultyLevel - 1)));
  var levelDependantVelocityOffset = 6 * Math.log(difficultyLevel);
  ballArray[currentFreePosition2].setPosition([(randomNumber1-randomNumber2)*5000,(randomNumber2-randomNumber3)*5000,100])
  ballArray[currentFreePosition2].setLinearVel([(randomNumber1-randomNumber2)* levelDependantVelocityOffset,(randomNumber2-randomNumber3) * levelDependantVelocityOffset,(randomNumber3-randomNumber1)*levelDependantVelocityOffset ]);
  //var r = ballArray[currentFreePosition2].getLinearVel();
  //alert(r[0] + "," + r[1] + "," + r[2]);
  //ballArray[currentFreePosition2].setLinearVel(new Array(-0.06, 0.02, 0.03));
  //ballArray[currentFreePosition2].setLinearVel([randomNumber1-randomNumber2,randomNumber2-randomNumber3,randomNumber3-randomNumber1]);
  //ballArray[currentFreePosition2].setPickable(false);
  ballArray[currentFreePosition2].visible = true;
  //var t = Date.now() - timeAtBallGenerate;
  //ballArray[currentFreePosition2].update(t);
  //alert(t);
  //t += time;
  //checkCollision(t);
  //ballArray[currentFreePosition2].update(0);
  //scn.addObjectToScene(ballArray[currentFreePosition2]);
  totalBallCount++;
  isGenerating = 0;
}

function initLife(canvasName)
{
    /*lifescn = new c3dl.Scene();
    lifescn.setCanvasTag(canvasName);
    var renderer2 = new c3dl.WebGL();
    renderer2.createRenderer(this);
    lifescn.setRenderer(renderer2);
    lifescn.setAmbientLight([0,0,0,1]);
    lifescn.init(canvasName);

    if(renderer2.isReady())
    {
        var cam = new c3dl.OrbitCamera();
        cam.setFarthestDistance(1000);
        cam.setClosestDistance(60);
        cam.setPosition([0.0,0.0,0.0]);
        cam.setOrbitPoint([0.0, 0.0, 0.0]);
        cam.setDistance(400);
        lifescn.setCamera(cam);

        var diffuse = new c3dl.PositionalLight();
        diffuse.setName('diffuse');
        diffuse.setPosition([300,0,0]);
        diffuse.setDiffuse([1,1,1,1]);
        diffuse.setOn(true);
        lifescn.addLight(diffuse);

        var diffuse2 = new c3dl.PositionalLight();
        diffuse2.setName('diffuse');
        diffuse2.setPosition([0,0,-300]);
        diffuse2.setDiffuse([1,1,1,1]);
        diffuse2.setOn(true);
        lifescn.addLight(diffuse2);

        for(var i = 0; i < 3;++i)
        {
            lives[i] = new c3dl.Collada();
            lives[i].isBall = 0;
            lives[i].ownCollisionIndex = -99;
            lives[i].setPosition(new Array(0,0,0));
            lives[i].init("./IMGS/newSphere.dae");
            lives[i].setTexture("./IMGS/smile.png");
            lives[i].setPickable(false);
            lives[i].setAngularVel([0,0.005,0]);
            lifescn.addObjectToScene(lives[i]);
        }

        lives[0].setPosition([-300,0,0]);
        //lives[0].setLinearVel([0.1,0,0]);
        lives[1].setPosition([300,0,0]);

        //var posi = lives[1].getPosition();
        //scorefield.innerHTML = "live 0: " + posi[0];

        lifescn.setBackgroundColor([0,0,255,1]);
        lifescn.setCollision(false);
        lifescn.startScene();
    }*/
    for(var i = 0; i < 3;++i)
    {
        lives[i] = new c3dl.Collada();
        lives[i].isBall = 0;
        lives[i].ownCollisionIndex = -99;
        lives[i].setPosition(new Array(10,0,-100));
        lives[i].init("./IMGS/sphere1.dae");
        lives[i].setTexture("./IMGS/heart.png");
        lives[i].setPickable(false);
        lives[i].setAngularVel([0,0.005,0]);
        scn.addObjectToScene(lives[i]);
    }
    lives[0].setPosition([-360,220,0]);
    lives[1].setPosition([-410,220,0]);
    lives[2].setPosition([-460,220,0]);
}

function canvasMain(canvasName){

    scorefield=document.getElementById("score");
    levelfield = document.getElementById("difficultyLevel");
    c3dl.debug.setVisible(true);
    c3dl.Collada.prototype.ownCollisionIndex=-2;
    c3dl.Collada.prototype.lastCollisionIndex=-2;
    c3dl.Collada.prototype.isBall=-2;

    var myCanvas= document.getElementById("tutorial");

    c3dl.Scene.prototype.myLeftWallXValue;
    c3dl.Scene.prototype.myRightWallXValue;
    c3dl.Scene.prototype.myTopWallYValue;
    c3dl.Scene.prototype.myBottomWallYValue;
    c3dl.Scene.prototype.myFrontWallZValue;
    c3dl.Scene.prototype.myRearWallZValue;

    c3dl.frontWallLimit = -120;
    timeGap = 0;
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    renderer.createRenderer(this);
    scn.setRenderer(renderer);
    scn.setAmbientLight([0,0,0,1]);
    scn.myLeftWallXValue = myCanvas.width / 2 - 30;
    scn.myRightWallXValue = -myCanvas.width / 2 + 30;
    scn.myTopWallYValue = myCanvas.height / 2 - 10;
    scn.myBottomWallYValue = -myCanvas.height / 2 + 10;
    scn.myFrontWallZValue = -200;
    scn.myRearWallZValue = 175;
    scn.init(canvasName);
    
    if(renderer.isReady() )
    {
     /************Walls*********/
    initWalls();
    /*FREE CAMERA SETUP
    cam = new c3dl.FreeCamera();
    cam.setPosition(new Array(200.0, 300.0, 500.0));
    cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
    scn.setCamera(cam);*/
        
    //Orbital Camera Setup
    var cam = new c3dl.OrbitCamera();
    cam.setFarthestDistance(1000);
    cam.setClosestDistance(60);
    cam.setPosition([0.0,0.0,0.0]);
    cam.setOrbitPoint([0.0, 0.0, -200.0]);
    cam.setDistance(400);
    scn.setCamera(cam);
    
    var diffuse = new c3dl.PositionalLight();
    diffuse.setName('diffuse');
    diffuse.setPosition([0,0,-300]);
    diffuse.setDiffuse([.3,.3,.3,1]);
    diffuse.setOn(true);
    scn.addLight(diffuse);

    var diffuse2 = new c3dl.PositionalLight();
    diffuse2.setName('diffuse');
    diffuse2.setPosition([-300,0,0]);
    diffuse2.setDiffuse([.3,.8,.3,1]);
    diffuse2.setOn(true);
    scn.addLight(diffuse2);

    var diffuse3 = new c3dl.PositionalLight();
    diffuse3.setName('diffuse');
    diffuse3.setPosition([0,-300,0]);
    diffuse3.setDiffuse([1,.6,1,.8]);
    diffuse3.setOn(true);
    scn.addLight(diffuse3);


    //scn.setAmbientLight(new Array(0.3,0.3,0.3,1));
    scn.setCollision(true);
    effect = new c3dl.Effect();
    effect.init(c3dl.effects.GOOCH);
    //scn.setBackgroundColor([0.451,0.784,0.467]);
    scn.setBackgroundColor([0,0,255,1]);
    
    for(var i = 0; i < max_limit; ++i) //add all the balls to the scene but dont render them.
    {
    	ballArray[i]=new c3dl.Collada();
  		ballArray[i].isBall=1;
  		ballArray[i].init("./IMGS/sphere1.dae");
                ballArray[i].setTexture("./IMGS/sphereA.png");
  		ballArray[i].visible = false;
  		ballArray[i].setPickalbe = false;
                scn.addObjectToScene(ballArray[i]);
    }
    //alert(ballArray[0].visible);

    //add the particle system
    explode = new c3dl.ParticleSystem();
    explode.setMinVelocity([-8,-8,-8]);
    explode.setMaxVelocity([8,8,8]);
    explode.setMinLifetime(0.5);
    explode.setMaxLifetime(1.6);
    explode.setMinColor([0.5,0.4,0.0,0.5]);
    explode.setMaxColor([1,0.6,0,1]);
    explode.setMaxSize(7);
    explode.setSrcBlend(c3dl.ONE);
    explode.setDstBlend(c3dl.ONE);
    explode.setTexture("./IMGS/flare.jpg");
    explode.setAcceleration([2,2,0]);
    explode.setEmitRate(0);
    explode.init(50);
    scn.addObjectToScene(explode);

    //life indicator
    /*for(var i = 0; i < 3;++i)
    {
        lives[i] = new c3dl.Collada();
        lives[i].init("./IMGS/heart2.dae");
        lives[i].isBall = 0;
        //lives[i].setPosition(new Array((i + 1)*100,0,0));
        lives[i].setAngularVel(new Array(0,0.001,0));
        scn.addObjectToScene(lives[i]);
    }
    lives[0].setPosition([0,0,0]);
    //lives[1].setPosition([-50,0,0]);
    //lives[2].setPosition([500,0,0]);*/
    
    canvas2d=document.getElementById('hud');
    density=canvas2d.getContext('2d');
    
	//Creating 2d array alphabet master
	for(i=0;i<alphabetListLength;++i)
		referenceArray[i]=[];	
		
	initLife("life");
    
    scn.setUpdateCallback(synchronizedCallback);
    scn.setKeyboardCallback(kbdCheck);
    //scn.setMouseCallback(mouseUp,mouseDown, mouseMove);
    scn.startScene();

 }
}

function synchronizedCallback(time)
{
    //scorefield.innerHTML += time + " ";
    difficultyLevel = Math.round(score / 20) + 1;
    levelfield.innerHTML = "Level : "+ difficultyLevel;
    if(isGenerating == 0)
    {
        //alert("hi");
        ballGenerate(time);
    }
}

function drawHud(){
    
  var my_gradient = density.createLinearGradient(0, 0, 900, 20);
  my_gradient.addColorStop(0, "green");
  my_gradient.addColorStop(0.5, "yellow");  
  my_gradient.addColorStop(1, "red");
  density.fillStyle = my_gradient;
  //density.fillRect(50, -390, 0, 0);
  drawhealth();
  /*density.fillStyle="black";
  density.fillRect(0,0,150,200);
  density.fillStyle="green";
  density.strokeStyle="green";
  drawhealth();*/
}

function drawhealth(){
 /* if(totalBallCount <= 4)
    density.fillStyle="yellow";
  else if(totalBallCount <= 9)
    density.fillStyle="orange";
  else if(totalBallCount <= 13)
    density.fillStyle="red";*/
//canvas2d.width = canvas2d.width;
//density.fillRect(50,400-totalBallCount*50,0,0);
density.clearRect(0,0,900,50);
density.fillRect(0,0,totalBallCount*900/max_limit,50);
}

//function to initialize the walls
function initWalls()
{
	 for(var i = 0; i < 5; i++)
 	{
 		wall[i] = new c3dl.Collada();
 		wall[i].init("./IMGS/plane3D.dae");
 		wall[i].isBall = 0;
                wall[i].lastCollisionIndex=-8;
                //scn.addObjectToScene(wall[i]);
 	}
        wall[0].ownCollisionIndex=-1;   //Bottom Wall
        wall[1].ownCollisionIndex=-2;   //Right Wall
        wall[2].ownCollisionIndex=-3;   //Left Wall
        wall[3].ownCollisionIndex=-4;   //Up Wall
        wall[4].ownCollisionIndex=-5;   //Rear Wall
        
 	wall[0].setPosition(new Array(initialWall1X,initialWall1Y,initialWall1Z));
 	wall[1].setPosition(new Array(initialWall2X,initialWall2Y,initialWall2Z));
 	wall[2].setPosition(new Array(initialWall3X,initialWall3Y,initialWall3Z));
 	wall[3].setPosition(new Array(initialWall4X,initialWall4Y,initialWall4Z));
 	wall[4].setPosition(new Array(initialWall5X,initialWall5Y,initialWall5Z));

 	
 	wall[0].roll(Math.PI * ( 0 / 180));
 	wall[1].roll(Math.PI * (90 / 180));
 	wall[2].roll(Math.PI * (90 / 180 ));
 	wall[4].roll(Math.PI * (1 / 180 ));
 	
 	//wall[0].pitch(Math.PI * ( 9 / 180));
 	wall[2].pitch( - Math.PI * ( 2 / 180));
 	
 	//wall[1].yaw(Math.PI * (20 / 180));
 	wall[4].pitch(Math.PI * (90 / 180));

        //Generating front wall which is basically a point located far away
        //all collision physics is handled manually in scene.js using the wall's
        //ownCollisionIndex property only
        /*wall[5] = new c3dl.Collada();
        wall[5].init("./IMGS/sphereImproved.dae");
        wall[5].ownCollisionIndex = -6;
        wall[5].isBall = 0;
        wall[5].lastCollisionIndex = -8;
        scn.addObjectToScene(wall[5]);
        wall[5].setPosition(new Array(1000.0,1000.0,1000.0));*/
}
//initWall END

/*************************moving orbital camera***************************/

var isDragging = false; //tracks or not the user is currently dragging the mouse
var rotationStartCoords = [0,0]; //The mouse coordinates at the beginning of a rotation
var SENSITIVITY = 0.7;

//Called when the user releases the left mouse button.
//Records that the user is no longer dragging the mouse
function mouseUp(evt)
{
	if(evt.which == 1)
	{
		isDragging = false;
	}
}

//Called when the user presses the left mouse button.
//Records that the user may start to drag the mouse, along with the current X & Y
// coordinates of the mouse.
function mouseDown(evt)
{
	if(evt.which == 1)
	{
		isDragging = true;
		rotationStartCoords[0] = xevtpos(evt);
		rotationStartCoords[1] = yevtpos(evt);
	}
}

//Called when the mouse moves
//This function will only do anything when the user is currently holding
// the left mouse button.  It will determine how far the cursor has moved
// since the last update and will pitch and yaw the camera based on that
// amount and the sensitivity variable.
function mouseMove(evt)
{
	if(isDragging == true)
	{
                var cam = scn.getCamera();
		var x = xevtpos(evt);
		var y = yevtpos(evt);
		
		// how much was the cursor moved compared to last time
		// this function was called?
		var deltaX = x - rotationStartCoords[0];
                var deltaY = y - rotationStartCoords[1];

		cam.yaw(-deltaX * SENSITIVITY);
		cam.pitch(deltaY * SENSITIVITY);
		
		// now that the camera was updated, reset where the
		// rotation will start for the next time this function is 
		// called.
		rotationStartCoords = [x,y];
	}
}

//Calculates the current X coordinate of the mouse in the client window
function xevtpos(evt)
{
    return 2 * (evt.clientX / evt.target.width) - 1;
}

//Calculates the current Y coordinate of the mouse in the client window
function yevtpos(evt)
{
    return 2 * (evt.clientY / evt.target.height) - 1;
}

/*************************moving orbital camera***************************/


//Keyboard event Handling
function kbdCheck(event){
  explosionOn=0;
  switch(event.keyCode) {//deterime the key
	case 65:
		if (referenceArray[0].length>0)
		{
			alphabetPositionToRemove=referenceArray[0].pop();
			explosionOn=1;
		}
		break;
	case 66:
		if (referenceArray[1].length>0)
		{
			alphabetPositionToRemove=referenceArray[1].pop();
			explosionOn=1;
		}
		break;
	case 67:
		if (referenceArray[2].length>0)
		{
			alphabetPositionToRemove=referenceArray[2].pop();
			explosionOn=1;
		}
		break;
	case 68:
		if (referenceArray[3].length>0)
		{
			alphabetPositionToRemove=referenceArray[3].pop();
			explosionOn=1;
		}
		break;
	case 69:
		if (referenceArray[4].length>0)
		{
			alphabetPositionToRemove=referenceArray[4].pop();
			explosionOn=1;
		}
		break;
	case 70:
		if (referenceArray[5].length>0)
		{
			alphabetPositionToRemove=referenceArray[5].pop();
			explosionOn=1;
		}
		break;
	case 71:
		if (referenceArray[6].length>0)
		{
			alphabetPositionToRemove=referenceArray[6].pop();
			explosionOn=1;
		}
		break;
	case 72:
		if (referenceArray[7].length>0)
		{
			alphabetPositionToRemove=referenceArray[7].pop();
			explosionOn=1;
		}
		break;
	case 73:
		if (referenceArray[8].length>0)
		{
			alphabetPositionToRemove=referenceArray[8].pop();
			explosionOn=1;
		}
		break;
	case 74:
		if (referenceArray[9].length>0)
		{
			alphabetPositionToRemove=referenceArray[9].pop();
			explosionOn=1;
		}
		break;
	case 75:
		if (referenceArray[10].length>0)
		{
			alphabetPositionToRemove=referenceArray[10].pop();
			explosionOn=1;
		}
		break;
	case 76:
		if (referenceArray[11].length>0)
		{
			alphabetPositionToRemove=referenceArray[11].pop();
			explosionOn=1;
		}
		break;
	case 77:
		if (referenceArray[12].length>0)
		{
			alphabetPositionToRemove=referenceArray[12].pop();
			explosionOn=1;
		}
		break;
	case 78:
		if (referenceArray[13].length>0)
		{
			alphabetPositionToRemove=referenceArray[13].pop();
			explosionOn=1;
		}
		break;
	case 79:
		if (referenceArray[14].length>0)
		{
			alphabetPositionToRemove=referenceArray[14].pop();
			explosionOn=1;
		}
		break;
	case 80:
		if (referenceArray[15].length>0)
		{
			alphabetPositionToRemove=referenceArray[15].pop();
			explosionOn=1;
		}
		break;
	case 81:
		if (referenceArray[16].length>0)
		{
			alphabetPositionToRemove=referenceArray[16].pop();
			explosionOn=1;
		}
		break;
	case 82:
		if (referenceArray[17].length>0)
		{
			alphabetPositionToRemove=referenceArray[17].pop();
			explosionOn=1;
		}
		break;
	case 83:
		if (referenceArray[18].length>0)
		{
			alphabetPositionToRemove=referenceArray[18].pop();
			explosionOn=1;
		}
		break;
	case 84:
		if (referenceArray[19].length>0)
		{
			alphabetPositionToRemove=referenceArray[19].pop();
			explosionOn=1;
		}
		break;
	case 85:
		if (referenceArray[20].length>0)
		{
			alphabetPositionToRemove=referenceArray[20].pop();
			explosionOn=1;
		}
		break;
	case 86:
		if (referenceArray[21].length>0)
		{
			alphabetPositionToRemove=referenceArray[21].pop();
			explosionOn=1;
		}
		break;
	case 87:
		if (referenceArray[22].length>0)
		{
			alphabetPositionToRemove=referenceArray[22].pop();
			explosionOn=1;
		}
		break;
	case 88:
		if (referenceArray[23].length>0)
		{
			alphabetPositionToRemove=referenceArray[23].pop();
			explosionOn=1;
		}
		break;
	case 89:
		if (referenceArray[24].length>0)
		{
			alphabetPositionToRemove=referenceArray[24].pop();
			explosionOn=1;
		}
		break;
	case 90:
		if (referenceArray[25].length>0)
		{
			alphabetPositionToRemove=referenceArray[25].pop();
			explosionOn=1;
		}
		break;
        default:
                if(mistakeCount <= 2)
                    scn.removeObjectFromScene(lives[mistakeCount]);
                ++mistakeCount;//user has typed a number or a symbol
                break;
  }
  if (explosionOn==1)
  {
	ballExplodePosition=ballArray[alphabetPositionToRemove].getPosition();
	ballArray[alphabetPositionToRemove].visible = false;
	//scn.removeObjectFromScene(ballArray[alphabetPositionToRemove]);
	//delete ballArray[alphabetPositionToRemove];
	explosionOn=1;
	--totalBallCount;
	explode.setPosition(ballExplodePosition);
	//explode.setEmitRate(1);
	explode.emit(30);
        ++score;
    scorefield.innerHTML="Score: " + score;    
    currentFreePosition=alphabetPositionToRemove;
  }
  else if(event.keyCode >= 65 && event.keyCode <= 90)
   {
       if(mistakeCount <= 2)
           scn.removeObjectFromScene(lives[mistakeCount]);
       mistakeCount++;//user has typed a letter that is not present in the current scene
   }
}