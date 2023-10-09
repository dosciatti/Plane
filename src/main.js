
function main() {
	
	engine.clock.currentTime = (new Date()).getTime()
	
	engine.draw.ctx.fillStyle = "blue";
  	engine.draw.ctx.fillRect(0, 0, canvas.width, canvas.height)
  	engine.draw.ctx.fill()

	modules.hearts.draw()
	modules.plane.draw()

	modules.plane.move()
	
	//if (engine.key.isKeyPressed("KeyZ")) { modules.plane.increaseBaseAngle() }
	//if (engine.key.isKeyPressed("KeyX")) { modules.plane.decreaseBaseAngle() } 
	if (engine.key.isKeyPressed('ArrowLeft')) { modules.plane.decreaseAngle() }
	if (engine.key.isKeyPressed('ArrowRight')) { modules.plane.increaseAngle() }
	if (engine.key.isKeyPressed('ArrowDown')) { modules.plane.decreaseVelocity() }
	if (engine.key.isKeyPressed('ArrowUp')) { modules.plane.increaseVelocity() }
  	
	//testCollisions()

	//refreshGameConditions()
	
	requestAnimationFrame(main)
}

window.onload 
{
	engine.key.setKeyListeners()
	engine.mouse.setMouseListeners()
	engine.resources.loadResources(engine.resources.areResourcesPrepared)
	hearts.populate()
	requestAnimationFrame(main)
}