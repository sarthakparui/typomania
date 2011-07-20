c3dl.addMainCallBack(canvasMain, "gameCanvas");
c3dl.addModel("./IMGS/sphere1.dae");
c3dl.addModel("./IMGS/newSphere.dae");
c3dl.addModel("./IMGS/WallTexture.dae");

//Wall Contstants
var initialWall1X = -10;
var initialWall1Y = -300;
var initialWall1Z = 0;
var initialWall2X = -415;
var initialWall2Y = -50;
var initialWall2Z = 0;
var initialWall3X = 520;
var initialWall3Y = -47;
var initialWall3Z = 0;
var initialWall4X = -10;
var initialWall4Y = 225;
var initialWall4Z = 0;
var initialWall5X = -15;
var initialWall5Y = -3;
var initialWall5Z = 400;

//End

var wall = new Array(6);
var lives = new Array(3);//will indicate lives remaining in the game
var scn;
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
var ballExplodePosition = [];
var collisionTimeLinearVelocity1;
var collisionTimeLinearVelocity2;
var collisionIndexCounter = 0;
var alphabetListLength=26;	//alphabetList MAX LIMIT
var referenceArray=new Array(26);
var canvas2d;
var density;
var randomNumber1 = 0;
var randomNumber2 = 0;
var randomNumber3 = 0;
var i;
var j;
var scorefield;
var levelfield;
var score=0;
var ballGenerationRate = 600;
var isGenerating = 0;
var difficultyLevel = 1;
var proximityPositionArray=new Array(26);
var proximityValidArray=new Array(26);
var proximityCheckTimePosition=[];
var proximityCheckTimePosition2=[];
var proximityTimer=0;
var proximityCheckCounter1;
var proximityCheckCounter2;
var proximityWithWall;
var	myLeftWallXValue;
var myRightWallXValue;
var myTopWallYValue;
var myBottomWallYValue;
var myFrontWallZValue;
var myRearWallZValue;

var levelDependantExponentialOffset;
var levelDependantVelocityOffset;
var gameOverModels = new Array(8);
var gameOn = 1;

function checkCollisionWithWall(proximityCheckCounter2)
{
	proximityCheckTimePosition2=ballArray[proximityCheckCounter1].getPosition();
	proximityWithWall=0;
	if (proximityCheckTimePosition2[0]>=myLeftWallXValue)
	{
		ballArray[proximityCheckCounter2].setPosition([myLeftWallXValue-5,proximityCheckTimePosition2[1],proximityCheckTimePosition2[2]]);
		collisionTimeLinearVelocity1=ballArray[proximityCheckCounter2].getLinearVel();
		ballArray[proximityCheckCounter2].setLinearVel([-collisionTimeLinearVelocity1[0],collisionTimeLinearVelocity1[1],collisionTimeLinearVelocity1[2]]);
		proximityWithWall=1;
	}
	else if (proximityCheckTimePosition2[0]<=myRightWallXValue)
	{
		ballArray[proximityCheckCounter2].setPosition([myRightWallXValue+5,proximityCheckTimePosition2[1],proximityCheckTimePosition2[2]]);
		collisionTimeLinearVelocity1=ballArray[proximityCheckCounter2].getLinearVel();
		ballArray[proximityCheckCounter2].setLinearVel([-collisionTimeLinearVelocity1[0],collisionTimeLinearVelocity1[1],collisionTimeLinearVelocity1[2]]);
		var temp2=ballArray[proximityCheckCounter2].getPosition();
		proximityWithWall=1;
	}		
	if (proximityCheckTimePosition2[1]>=myTopWallYValue)
	{
		ballArray[proximityCheckCounter2].setPosition([proximityCheckTimePosition2[0],myTopWallYValue-5,proximityCheckTimePosition2[2]]);
		collisionTimeLinearVelocity1=ballArray[proximityCheckCounter2].getLinearVel();
		ballArray[proximityCheckCounter2].setLinearVel([collisionTimeLinearVelocity1[0],-collisionTimeLinearVelocity1[1],collisionTimeLinearVelocity1[2]]);
		proximityWithWall=1;
	}
	else if (proximityCheckTimePosition2[1]<=myBottomWallYValue)
	{
		ballArray[proximityCheckCounter2].setPosition([proximityCheckTimePosition2[0],myBottomWallYValue+5,proximityCheckTimePosition2[2]]);
		collisionTimeLinearVelocity1=ballArray[proximityCheckCounter2].getLinearVel();
		ballArray[proximityCheckCounter2].setLinearVel([collisionTimeLinearVelocity1[0],-collisionTimeLinearVelocity1[1],collisionTimeLinearVelocity1[2]]);
		proximityWithWall=1;
	}
	if (proximityCheckTimePosition2[2]>=myRearWallZValue)
	{
		ballArray[proximityCheckCounter2].setPosition([proximityCheckTimePosition2[0],proximityCheckTimePosition2[1],myRearWallZValue-5]);
		collisionTimeLinearVelocity1=ballArray[proximityCheckCounter2].getLinearVel();
		ballArray[proximityCheckCounter2].setLinearVel([collisionTimeLinearVelocity1[0],collisionTimeLinearVelocity1[1],-collisionTimeLinearVelocity1[2]]);
		proximityWithWall=1;
	}
	else if (proximityCheckTimePosition2[2]<=myFrontWallZValue)
	{
		ballArray[proximityCheckCounter2].setPosition([proximityCheckTimePosition2[0],proximityCheckTimePosition2[1],myFrontWallZValue+5]);
		collisionTimeLinearVelocity1=ballArray[proximityCheckCounter2].getLinearVel();
		ballArray[proximityCheckCounter2].setLinearVel([collisionTimeLinearVelocity1[0],collisionTimeLinearVelocity1[1],-collisionTimeLinearVelocity1[2]]);
		proximityWithWall=1;
	}
	
	if (proximityWithWall==1)
		return true;
	else
		return false;
}

function proximityCheck()
{
	if(gameOn == 1)
	{
		for(proximityCheckCounter1=0;proximityCheckCounter1<max_limit;++proximityCheckCounter1)
		{
			if (ballArray[proximityCheckCounter1].visible)
			{
				proximityCheckTimePosition=ballArray[proximityCheckCounter1].getPosition();
				if (checkCollisionWithWall(proximityCheckCounter1))
				{
					var temp=ballArray[0].getLinearVel();
					proximityValidArray[proximityCheckCounter1]=false;
				}
				else
				{
					proximityPositionArray[proximityCheckCounter1]=proximityCheckTimePosition;
					proximityValidArray[proximityCheckCounter1]=true;
				}
			}
			else
				proximityValidArray[proximityCheckCounter1]=false;
		}
		for(proximityCheckCounter1=0;proximityCheckCounter1<max_limit-1;++proximityCheckCounter1)
		{
			if (!proximityValidArray[proximityCheckCounter1])
				continue;
			proximityCheckTimePosition=proximityPositionArray[proximityCheckCounter1];
			for(proximityCheckCounter2=proximityCheckCounter1+1;proximityCheckCounter2<max_limit;++proximityCheckCounter2)
			{
				if (!proximityValidArray[proximityCheckCounter2])
					continue;
				if ((proximityPositionArray[proximityCheckCounter2][0]-proximityCheckTimePosition[0])*(proximityPositionArray[proximityCheckCounter2][0]-proximityCheckTimePosition[0])+(proximityPositionArray[proximityCheckCounter2][1]-proximityCheckTimePosition[1])*(proximityPositionArray[proximityCheckCounter2][1]-proximityCheckTimePosition[1])+(proximityPositionArray[proximityCheckCounter2][2]-proximityCheckTimePosition[2])*(proximityPositionArray[proximityCheckCounter2][2]-proximityCheckTimePosition[2])<23)
				{
					collisionTimeLinearVelocity1=ballArray[proximityCheckCounter1].getLinearVel();
					collisionTimeLinearVelocity2=ballArray[proximityCheckCounter2].getLinearVel();
					ballArray[proximityCheckCounter1].setLinearVel([collisionTimeLinearVelocity2[0],collisionTimeLinearVelocity2[1],collisionTimeLinearVelocity2[2]]);
					ballArray[proximityCheckCounter2].setLinearVel([collisionTimeLinearVelocity1[0],collisionTimeLinearVelocity1[1],collisionTimeLinearVelocity1[2]]);
					proximityValidArray[proximityCheckCounter2]=false;
					break;
				}
			}
		}
	}
}

function setCookie( name, value, expires, path, domain, secure )
{
var today = new Date();
today.setTime( today.getTime() );
if ( expires )
{
expires = expires * 1000 * 60;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}



function endScene()
{
	//TODO: clear memory
    ballArray.splice(0, ballArray.length);
    wall.splice(0,wall.length);
    lives.splice(0,lives.length);
	//for(var i = 0; i < max_limit; i++)
	//	proximityPositionArray[i].splice(0, proximityPositionArray[i].length);
	proximityPositionArray.splice(0,proximityPositionArray.length);
	proximityValidArray.splice(0,proximityValidArray.length);
	gameOverModels.splice(0,gameOverModels.length);
	//proximityCheckTimePosition.splice(0,proximityCheckTimePosition.length);
	delete proximityCheckTimePosition;
	delete proximityCheckTimePosition2;
	//proximityCheckTimePosition2.splice(0,proximityCheckTimePosition2.length);
	
    for(var i = 0; i < referenceArray.length; i++)
    {
        referenceArray[i].splice(0, referenceArray[i].length);
    }
	referenceArray.splice(0,referenceArray.length);				//## referenceArray splice and deleted scoreValue and levelValue
	//scn.stopScene();
	//scn.removeUpdateCallback();
}

function gameOver()
{
	gameOn = 0;
	for(var i = 0; i < 8; i++)
    {
		gameOverModels[i] = new c3dl.Collada();
        gameOverModels[i].init("./IMGS/sphere1.dae");
        gameOverModels[i].setPosition([-170 + i * 50, 0, -200]);
		gameOverModels[i].roll(Math.PI * (-45 / 180));
		gameOverModels[i].pitch(Math.PI * (-90 / 180));
        scn.addObjectToScene(gameOverModels[i]);
    }
	gameOverModels[0].setTexture("./IMGS/gameOverR.jpg");
	gameOverModels[1].setTexture("./IMGS/gameOverE.jpg");	
	gameOverModels[2].setTexture("./IMGS/gameOverV.jpg");
	gameOverModels[3].setTexture("./IMGS/gameOverO.jpg");
	gameOverModels[4].setTexture("./IMGS/gameOverE.jpg");
	gameOverModels[5].setTexture("./IMGS/gameOverM.jpg");
	gameOverModels[6].setTexture("./IMGS/gameOverA.jpg");
	gameOverModels[7].setTexture("./IMGS/gameOverG.jpg");
	
	
setCookie('Score', score,1,'/','','');
    for(var i = 0; i < 3; i++)
    {
        if(lives[i]!= undefined)
            scn.removeObjectFromScene(lives[i]);
    }
    scn.removeAllBalls();
    endScene();
}

function ballGenerate(time)
{
    if (totalBallCount<=max_limit && mistakeCount <= 2)
    {
             positionFound=0;
            for(positionFindingCounter=currentFreePosition;positionFindingCounter<max_limit;++positionFindingCounter) 
                {
                   if (!ballArray[positionFindingCounter].visible)
                   {
                            currentFreePosition=positionFindingCounter;
                            positionFound=1;
                            isGenerating = 1;
                            ballAddition(currentFreePosition);
                            break;
                    }						
                }
            if (positionFound==0)
            {
                for(positionFindingCounter=0;positionFindingCounter<currentFreePosition;++positionFindingCounter)
                {
                        if (!ballArray[positionFindingCounter].visible)
                        {                                
                               currentFreePosition=positionFindingCounter;
                                positionFound=1;
                                isGenerating = 1;
                                break;
                        }
                }
            }
                if (positionFound==0)
                {
                     if(gameOn == 1)
					 {
						gameOn = 0;
						gameOver();
					 }
                }
    }
    else
    {
     	gameOver();
    }
    drawHud();
}

function ballAddition(currentFreePosition2)
{
    randomNumber1 = Math.round(Math.random() * 100000) % 26;
    referenceArray[randomNumber1].push(currentFreePosition2);
    ballArray[currentFreePosition2].ownCollisionIndex= collisionIndexCounter++;
    ballArray[currentFreePosition2].lastCollisionIndex=-7;
    switch(randomNumber1)
	{
	case 0:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereA.jpg");
		break;
	case 1:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereB.jpg");
		break;
	case 2:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereC.jpg");
		break;
	case 3:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereD.jpg");
		break;
	case 4:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereE.jpg");
		break;
	case 5:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereF.jpg");
		break;
	case 6:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereG.jpg");
		break;
	case 7:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereH.jpg");
		break;
	case 8:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereI.jpg");
		break;
	case 9:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereJ.jpg");
		break;
	case 10:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereK.jpg");
		break;
	case 11:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereL.jpg");
		break;
	case 12:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereM.jpg");
		break;
	case 13:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereN.jpg");
		break;		
	case 14:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereO.jpg");
		break;
	case 15:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereP.jpg");
		break;
	case 16:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereQ.jpg");
		break;
	case 17:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereR.jpg");
		break;
	case 18:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereS.jpg");
		break;
	case 19:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereT.jpg");
		break;
	case 20:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereU.jpg");
		break;
	case 21:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereV.jpg");
		break;
	case 22:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereW.jpg");
		break;
	case 23:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereX.jpg");
		break;
	case 24:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereY.jpg");
		break;
	case 25:
		ballArray[currentFreePosition2].setTexture("./IMGS/sphereZ.jpg");
		break;
  }
  if (randomNumber1!=0)
        randomNumber1/=100;
  randomNumber2=Math.random()/10;
  randomNumber3=Math.random()/10;
  ballArray[currentFreePosition2].setPosition([(randomNumber1-randomNumber2)*2000,(randomNumber2-randomNumber3)*2000,100])
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
    lives[0].setPosition([-310,220,0]);
    lives[1].setPosition([-360,220,0]);
    lives[2].setPosition([-410,220,0]);
}

function canvasMain(canvasName){
	
    //c3dl.Scene.prototype.removeUpdateCallback = function(){updateHandler = null;};
	scorefield=document.getElementById("score");
	levelfield = document.getElementById("level");
	setCookie('Score', score,1,'/','','');
    c3dl.debug.setVisible(false);
    var myCanvas= document.getElementById("gameCanvas");
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    renderer.createRenderer(this);
    scn.setRenderer(renderer);
    scn.setAmbientLight([0,0,0,1]);
    scn.myLeftWallXValue = myCanvas.width / 2 - 50;
    scn.myRightWallXValue = -myCanvas.width / 2 + 50;
    scn.myTopWallYValue = myCanvas.height / 2 - 10;
    scn.myBottomWallYValue = -myCanvas.height / 2 + 10;
    scn.myFrontWallZValue = -170;
    scn.myRearWallZValue = 175;
	myLeftWallXValue = myCanvas.width / 2 - 50;
    myRightWallXValue = -myCanvas.width / 2 + 50;
    myTopWallYValue = myCanvas.height / 2 - 10;
    myBottomWallYValue = -myCanvas.height / 2 + 10;
    myFrontWallZValue = -170;
    myRearWallZValue = 175;
    scn.init(canvasName);
    
    if(renderer.isReady() )
    {
    initWalls();
    cam = new c3dl.OrbitCamera();				//@@@@@@ TODO : Camera setup to be changed    		
	cam.setFarthestDistance(1000);
	cam.setClosestDistance(60);
	cam.setPosition([0.0,0.0,0.0]);
	cam.setOrbitPoint([0.0, 0.0, -200.0]);
	cam.setDistance(400);
	scn.setCamera(cam);
	scn.setAmbientLight([.5,.5,.5,1]);
	var diffuse = new c3dl.PositionalLight();
	diffuse.setName('diffuse');
	diffuse.setPosition([0,0,-300]);
	diffuse.setDiffuse([.3,.3,.3,1]);
	diffuse.setOn(true);
	scn.addLight(diffuse);
	scn.setCollision(false);
    effect = new c3dl.Effect();
    effect.init(c3dl.effects.GOOCH);
    scn.setBackgroundColor([0,0,255,1]);
    
    for(var i = 0; i < max_limit; ++i) //add all the balls to the scene but dont render them.
    {
    	ballArray[i]=new c3dl.Collada();
  		ballArray[i].isBall=1;
  		ballArray[i].init("./IMGS/sphere1.dae");
		ballArray[i].roll(Math.PI * (-45 / 180));
		ballArray[i].pitch(Math.PI * (-90 / 180));
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
     {
		referenceArray[i]=[];
		proximityPositionArray[i]=[];
	 }
    initLife("life");
	scn.startScene();
	/*var paths = new Array("./IMGS/sphereA.jpg","./IMGS/sphereB.jpg","./IMGS/sphereC.jpg","./IMGS/sphereD.jpg",
                          "./IMGS/sphereE.jpg","./IMGS/sphereF.jpg","./IMGS/sphereG.jpg","./IMGS/sphereH.jpg",
                          "./IMGS/sphereI.jpg","./IMGS/sphereJ.jpg","./IMGS/sphereK.jpg","./IMGS/sphereL.jpg",
                          "./IMGS/sphereM.jpg","./IMGS/sphereN.jpg","./IMGS/sphereO.jpg","./IMGS/sphereP.jpg",
                          "./IMGS/sphereQ.jpg","./IMGS/sphereR.jpg","./IMGS/sphereS.jpg","./IMGS/sphereT.jpg",
                          "./IMGS/sphereU.jpg","./IMGS/sphereV.jpg","./IMGS/sphereW.jpg","./IMGS/sphereX.jpg",
                          "./IMGS/sphereY.jpg","./IMGS/sphereZ.jpg");
    scn.preloadImages(paths);
	paths.splice(0,paths.length);*/
	scn.setUpdateCallback(synchronizedCallback);
    scn.setKeyboardCallback(kbdCheck);
 }
}

function synchronizedCallback(time)
{
	proximityTimer+=time;
    difficultyLevel = Math.round(score / 20) + 1;
    ballGenerateTimeGap += time;
	levelDependantExponentialOffset = ballGenerationRate / (Math.log(difficultyLevel + 1));
	levelDependantVelocityOffset = Math.log(difficultyLevel);
    levelfield.value = difficultyLevel;
	if (proximityTimer>50)
	{
		proximityTimer=0;
		proximityCheck();		
	}
	
	
    if(isGenerating == 0 && ballGenerateTimeGap >= levelDependantExponentialOffset)
    {
        ballGenerateTimeGap = 0;
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
 		wall[i].init("./IMGS/WallTexture.dae");
                wall[i].setTexture("./IMGS/WallTextureBricksFull.png")
 		wall[i].isBall = 0;
                wall[i].lastCollisionIndex=-8;
                scn.addObjectToScene(wall[i]);
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
 	wall[2].pitch( - Math.PI * ( 2 / 180));
 	wall[4].pitch(Math.PI * (90 / 180));
}
//initWall END

//Keyboard event Handling
function kbdCheck(event){
	if(gameOn == 1)
	{
		  if(event.keyCode >= 65 && event.keyCode <= 90 && referenceArray[event.keyCode - 65].length > 0)
		  {
			alphabetPositionToRemove=referenceArray[event.keyCode - 65].pop();
			ballExplodePosition=ballArray[alphabetPositionToRemove].getPosition();
			ballArray[alphabetPositionToRemove].visible = false;
			--totalBallCount;
			explode.setPosition(ballExplodePosition);
			explode.emit(30);
			++score;
			scorefield.value = score;
			currentFreePosition=alphabetPositionToRemove;
		  }
		  else if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 48 && event.keyCode <= 57))
		   {
			   if(mistakeCount >=0)
			   {		
				scn.removeObjectFromScene(lives[mistakeCount]);
				mistakeCount++;//user has typed a letter that is not present in the current scene
			   }
			   else
				gameOver();
		   }
	}
}