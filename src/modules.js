var showWhiteCircle = false;

var animatedSprite = {
	animatedSprite : [{ img: new Image(), vPosition: {x: 0, y: 0}, cols: 0, rows: 0, numberOfRepetitions: 0, spriteWidth: 0, spriteHeight: 0, frame : -1, countNumberOfRepetitions : 0, xIndex: 0, yIndex: 0, pastTime : (new Date()).getTime() }],
	'draw' : function(currentTime) 
	{ 
		for (var i = 0; i < animatedSprite.animatedSprite.length; i++) 
			animatedSprite.animate(currentTime, animatedSprite.animatedSprite[i]);
	},
	'animate' : function(currentTime, animSprite) 
	{		
		
    	if (animSprite.countNumberOfRepetitions <= animSprite.numberOfRepetitions) 
    	{
	   		engine.draw.drawAnimatedSprite(animSprite.vPosition, animSprite.img, animSprite.xIndex, animSprite.yIndex, animSprite.spriteWidth, animSprite.spriteHeight) 
			if ((currentTime - animSprite.pastTime) >= engine.clock.deltaTime) 
			{
  				animSprite.frame = animSprite.frame + 1;
  				animSprite.xIndex = (animSprite.xIndex + 1) % animSprite.cols;
  				animSprite.yIndex = animSprite.xIndex === 0 ? (animSprite.yIndex + 1) % animSprite.rows : animSprite.yIndex;
		   		engine.draw.drawAnimatedSprite(animSprite.vPosition, animSprite.img, animSprite.xIndex, animSprite.yIndex, animSprite.spriteWidth, animSprite.spriteHeight) 
  				animSprite.pastTime = (new Date()).getTime();
  				if (animSprite.frame == (animSprite.cols + animSprite.rows)) 
  				{
  					animSprite.countNumberOfRepetitions = animSprite.countNumberOfRepetitions + 1;	
  					animSprite.frame = -1;
  				}  				
  			}
  		}
	},
	'setAnimation' : function(item) 
	{
 		var x = item.vPosition.x - (engine.resources.data[3].width / (98 * 5)) / 2;
  		var y = item.vPosition.y - (engine.resources.data[3].height / (98 * 5)) / 2; 
  			
		var animSprite = 
		[{ 
			img: engine.resources.data[3], 
			vPosition: {x: x - 98 / 2, y: y - 95 / 2 - 10}, 
			cols: 5, rows: 5, numberOfRepetitions: 1, 
			spriteWidth: 98, spriteHeight: 95,
			frame : -1, countNumberOfRepetitions : 0, 
			xIndex: 0, yIndex: 0,
			pastTime : (new Date()).getTime()
		}];

		animatedSprite.animatedSprite = animatedSprite.animatedSprite.concat(animSprite);		
	}
}

var plane = {
	vPosition : { x : canvas.width / 2, y : canvas.height / 2 },
	angle : 0,
	deltaAngle : 0.025,
	velocity : 0,
	deltaVelocity : 0.025,
	scale : 0.55,
	radius : 
	0.5 * 
	Math.pow(
	Math.pow(resourcesInfo.find(r => r.name === 'plane').width, 2) + 
	Math.pow(resourcesInfo.find(r => r.name === 'plane').height, 2), 
	0.5),
	'draw' : function () {
		var xmap = arena.getMapFromBoxX(plane.vPosition.x)
		var ymap = arena.getMapFromBoxY(plane.vPosition.y)
		engine.draw.drawImageByName(xmap, ymap, "plane", plane.scale * 0.2, plane.angle + Math.PI / 2)
		
		var x = arena.getViewFromClipX(plane.vPosition.x)
		var y = arena.getViewFromClipY(plane.vPosition.y)
		engine.draw.drawImageByName(x, y, "plane", plane.scale, plane.angle + Math.PI / 2)
	},
	'move' : function() { 
		plane.vPosition.x = plane.vPosition.x + plane.velocity * Math.cos(-plane.angle)
		plane.vPosition.y = plane.vPosition.y - plane.velocity * Math.sin(-plane.angle)
		arena.actualizeArenaClipCoordinates()
	},
	'increaseAngle' : function () {
		plane.angle = plane.angle + plane.deltaAngle
	},
	'decreaseAngle' : function () {
		plane.angle = plane.angle - plane.deltaAngle
	},
	'increaseVelocity' : function () {
		plane.velocity = plane.velocity + plane.deltaVelocity
	},
	'decreaseVelocity' : function () {
		plane.velocity = plane.velocity - plane.deltaVelocity
	}
}

var hearts = {
	scale : 1,
	radius : 
	0.5 * 
	Math.pow(
	Math.pow(resourcesInfo.find(r => r.name === 'heart').width, 2) + 
	Math.pow(resourcesInfo.find(r => r.name === 'heart').height, 2), 
	0.5),
	vHearts : [{ vPosition : { x : 0, y: 0 }, intercepted : false }],
	'populate' : function() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				var v1 = [{ vPosition : { x: -60 * i, y : -60 * j }, intercepted : false }]
				var v2 = [{ vPosition : { x: -60 * i, y : 60 * j }, intercepted : false }]
				var v3 = [{ vPosition : { x: 60 * i, y : -60 * j }, intercepted : false }]
				var v4 = [{ vPosition : { x: 60 * i, y : 60 * j }, intercepted : false }]
				hearts.vHearts = hearts.vHearts.concat(v1)
				hearts.vHearts = hearts.vHearts.concat(v2)
				hearts.vHearts = hearts.vHearts.concat(v3)
				hearts.vHearts = hearts.vHearts.concat(v4)
			}
		}
	},
	'draw' : function () {
		for (let i = 0; i < hearts.vHearts.length; i++) {
			//if (hearts.vHearts[i].intercepted == false) {	
			//engine.draw.drawImageByName(arena.getX(hearts.vHearts[i].x), arena.getY(hearts.vHearts[i].y), "heart", 1, 0)
			//}
			
			var x = arena.getViewFromClipX(hearts.vHearts[i].vPosition.x)
			var y = arena.getViewFromClipY(hearts.vHearts[i].vPosition.y)
			engine.draw.drawImageByName(x, y, "heart", hearts.scale, 0)
			
			var xmap = arena.getMapFromBoxX(hearts.vHearts[i].vPosition.x)
			var ymap = arena.getMapFromBoxY(hearts.vHearts[i].vPosition.y)
			engine.draw.drawImageByName(xmap, ymap, "heart", 0.25, 0)
		}	
	}
}

var arena = {
	box : { x0 : -800, y0 : -800, x1 : 800, y1 : 800 },	
	map : { x0 : canvas.width - 200, y0 : canvas.height / 2 + 200 , x1 : 800, y1 : 600},
	'getMapFromBoxX' : function (boxPositionX) {
		return Math.floor(((arena.map.x1 - arena.map.x0) / (arena.box.x1 - arena.box.x0)) * (boxPositionX - arena.box.x0) + arena.map.x0)
	},
	'getMapFromBoxY' : function (boxPositionY) {
		return Math.floor(((arena.map.y1 - arena.map.y0) / (arena.box.y1 - arena.box.y0)) * (boxPositionY - arena.box.y0) + arena.map.y0)
	},
	clip : { x0 : 0, y0 : 0, x1 : canvas.width, y1 : canvas.height},
	view : { x0 : 0, y0 : 0, x1 : canvas.width, y1 : canvas.height},
	'getViewFromClipX' : function (clipPositionX) {
		return Math.floor(((arena.clip.x1 - arena.clip.x0) / (arena.view.x1 - arena.view.x0)) * (clipPositionX - arena.clip.x0) - arena.view.x0)
	},
	'getViewFromClipY' : function (clipPositionY) {
		return Math.floor(((arena.clip.y1 - arena.clip.y0) / (arena.view.y1 - arena.view.y0)) * (clipPositionY - arena.clip.y0) - arena.view.y0)
	},
	'actualizeArenaClipCoordinates' : function () {
		arena.clip.x0 = plane.vPosition.x - canvas.width / 2 
		arena.clip.x1 = plane.vPosition.x + canvas.width / 2
		arena.clip.y0 = plane.vPosition.y - canvas.height / 2 
		arena.clip.y1 = plane.vPosition.y + canvas.height / 2
	}
}

let modules = {
	animatedSprite,
	arena,
	plane,
	hearts
}