var gui = {
	powerBar : { x: 0, y: 0, width: canvas.width, height: 10 },
	score : 0,
	scoreText : { x: canvas.width - 90, y: 30},
	level : 1,
	levelText : { x: 0, y: 30},
	text: { x: canvas.width * 0.5 - 40, y: canvas.height * 0.5 - 5 },
	button : { x: canvas.width * 0.5 - 20, y: canvas.height * 0.5 + 20, width: 75, height: 25 },
	gap : { nextLevel : 5, restart : 13 },
	'drawPowerBar' : function() 
	{ 
		engine.draw.ctx.fillStyle = "red"
    	engine.draw.ctx.fillRect(
			gui.powerBar.x, 
  			gui.powerBar.y, 
  			(modules.player.power / 100) * gui.powerBar.width, 
  			gui.powerBar.height
  		)
  		engine.draw.ctx.fill()
	},
	'drawText' : function (text, color, variable, font, variableCoordenates) {
		engine.draw.ctx.fillStyle = color
		engine.draw.ctx.font = font
		engine.draw.ctx.fillText(text + " " + variable, variableCoordenates.x, variableCoordenates.y) 		
	},
	'drawButton' : function (text, gap) {
		engine.draw.ctx.fillStyle = "blue"
    	engine.draw.ctx.fillRect(gui.button.x, gui.button.y, gui.button.width, gui.button.height)
	  	engine.draw.ctx.fill()
		engine.draw.ctx.fillStyle = "white"
		engine.draw.ctx.font = "15px Arial"
		engine.draw.ctx.fillText(text, gui.button.x + gap, gui.button.y + 18) 		
	}
}

var time = (new Date()).getTime()

function main() {
	
	engine.clock.currentTime = (new Date()).getTime()
	
	engine.draw.ctx.fillStyle = "blue";
  	engine.draw.ctx.fillRect(0, 0, canvas.width, canvas.height)
  	engine.draw.ctx.fill()

	engine.draw.drawImageByName(canvas.width - 100, 30, "heart", 2, 0) 
	gui.drawText("", "white", modules.hearts.vHearts.length, "30px Arial", { x : canvas.width - 70, y : 40 })

	engine.draw.drawImageByName(30, 30, "clock", 0.25, 0) 
	gui.drawText("", "white", Math.floor(engine.clock.currentTime) - Math.floor(time), "30px Arial", { x : 75, y : 40 })
	
	modules.hearts.draw()
	modules.plane.draw()

	modules.plane.move()
	
	//if (engine.key.isKeyPressed("KeyZ")) { modules.plane.increaseBaseAngle() }
	//if (engine.key.isKeyPressed("KeyX")) { modules.plane.decreaseBaseAngle() } 
	if (engine.key.isKeyPressed('ArrowLeft')) { modules.plane.decreaseAngle() }
	if (engine.key.isKeyPressed('ArrowRight')) { modules.plane.increaseAngle() }
	if (engine.key.isKeyPressed('ArrowDown')) { modules.plane.decreaseVelocity() }
	if (engine.key.isKeyPressed('ArrowUp')) { modules.plane.increaseVelocity() }
  	
	testCollisions()

	//refreshGameConditions()
	
	requestAnimationFrame(main)
}

function testCollisions() {
	
	var radiusSM = 0.61 * (modules.hearts.scale + modules.plane.scale) * (modules.hearts.radius + modules.plane.radius);
	//var radiusPM = 0.61 * (modules.player.scale + modules.meteor.scale) * (modules.player.radius + modules.meteor.radius);

	modules.hearts.vHearts.forEach(
		function(itemHeart, indexHeart) { 
			var itemPlane = modules.plane
			if (engine.util.contains(itemHeart, itemPlane, radiusSM)) 
			{
				engine.sound.playAudioByName("pick")
				//modules.animatedSprite.setAnimation(itemMeteor)
				modules.hearts.vHearts.splice(indexHeart, 1)
				//modules.shot.vShot.splice(indexShot, 1)
				//gui.score = gui.score + 10
			}
		}
	)
}

window.onload 
{
	engine.key.setKeyListeners()
	engine.mouse.setMouseListeners()
	engine.resources.loadResources(engine.resources.areResourcesPrepared)
	engine.sound.playAudioByName("background")
	hearts.populate()
	requestAnimationFrame(main)
}