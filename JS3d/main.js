c3dl.addMainCallBack(canvasMain, "gameCanvas");
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
var gameStarted = 0;

function setCookie(c_name,value,expires)
{
    var today = new Date();
    today.setTime( today.getTime() );
    expires = expires * 1000 * 60;
    var expires_date = new Date( today.getTime() + (expires) );
    var c_value=escape(value) + ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
    document.cookie=c_name + "=" + c_value;
}


function endScene()
{
    for(var i = 0; i < 8; i++)
    {
        var b = new c3dl.Collada();
        b.init("./IMGS/sphere1.dae");
        b.setPosition([-170 + i * 50, 0, 0]);
        scn.addObjectToScene(b);
    }
    //TODO: clear memory
    scoreValue=document.getElementById("score").value;
    levelValue=document.getElementById("level").value;
}

function gameOver()
{
    setCookie("Score",score,1);
    scn.removeObjectFromScene(lives[2]);
    scn.removeAllBalls();
    endScene();
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
      //alert("hi");
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
  randomNumber2=Math.random()/10;
  randomNumber3=Math.random()/10;
  var levelDependantVelocityOffset = 6 * Math.log(difficultyLevel);
  ballArray[currentFreePosition2].setPosition([(randomNumber1-randomNumber2)*5000,(randomNumber2-randomNumber3)*5000,100])
  ballArray[currentFreePosition2].setLinearVel([(randomNumber1-randomNumber2)* levelDependantVelocityOffset,(randomNumber2-randomNumber3) * levelDependantVelocityOffset,(randomNumber3-randomNumber1)*levelDependantVelocityOffset ]);
  ballArray[currentFreePosition2].visible = true;
  totalBallCount++;
  isGenerating = 0;
}

function initLife(canvasName)
{
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
    levelfield = document.getElementById("level");
    c3dl.debug.setVisible(false);
    c3dl.Collada.prototype.ownCollisionIndex=-2;
    c3dl.Collada.prototype.lastCollisionIndex=-2;
    c3dl.Collada.prototype.isBall=-2;

    var myCanvas= document.getElementById("gameCanvas");

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
    initWalls();
       
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
    scn.setCollision(true);
    effect = new c3dl.Effect();
    effect.init(c3dl.effects.GOOCH);
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
    
    canvas2d=document.getElementById('hud');
    density=canvas2d.getContext('2d');
    
    //Creating 2d array alphabet master
    for(i=0;i<alphabetListLength;++i)
            referenceArray[i]=[];

    initLife("life");
    scn.setUpdateCallback(synchronizedCallback);
    scn.setKeyboardCallback(kbdCheck);
    //scn.setMouseCallback(mouseUp,mouseDown, mouseMove);
    //scn.setMouseCallback(mouseDown);
    scn.startScene();
 }
}

function synchronizedCallback(time)
{

    difficultyLevel = Math.round(score / 20) + 1;
    levelfield.value = difficultyLevel;
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
  drawhealth();
}

function drawhealth()
{
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
}
//initWall END

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
    scorefield.value = score;
    currentFreePosition=alphabetPositionToRemove;
  }
  else if(event.keyCode >= 65 && event.keyCode <= 90)
   {
       if(mistakeCount <= 2)
           scn.removeObjectFromScene(lives[mistakeCount]);
       mistakeCount++;//user has typed a letter that is not present in the current scene
   }
}