const Grid = require('../../lib')
const drawer = require('../common/canvasDrawer.js')
const messager = require('../common/messager.js')

class GameManager {
	static get Key() {
		return {
			Restart: 'Restart',
			Up: 'Up',
			Right: 'Right',
			Down: 'Down',
			Left: 'Left',
			// Exit: 'Exit',
		}
	}

	constructor(canvas, gridSize = 4) {
		this.gridSize = gridSize
		this.ctx = canvas.getContext('2d')
		this.grid = new Grid(this.gridSize, this.gridSize)
		this.grid.randomTile(2)
		drawer.draw(this.ctx, this.grid)
		drawer.promoteMsg(this.ctx, messager.getStatusMsg(this.grid))
	}

	handleInput(input) {
		if (this.grid.isAccomplished() && input !== GameManager.Key.Restart) {
			return
		}

		let moved = false
		switch (input) {
			case GameManager.Key.Restart:
				this.grid = new Grid(this.gridSize, this.gridSize)
				this.grid.randomTile(2)
				break
			case GameManager.Key.Up:
				moved = this.grid.mergeToYNegative()
				break
			case GameManager.Key.Right:
				moved = this.grid.mergeToXPositive()
				break
			case GameManager.Key.Down:
				moved = this.grid.mergeToYPositive()
				break
			case GameManager.Key.Left:
				moved = this.grid.mergeToXNegative()
				break
			default:
				break
		}
		if (moved && !this.grid.isFull()) {
			this.grid.randomTile(1)
		}
		drawer.draw(this.ctx, this.grid)
		drawer.promoteMsg(this.ctx, messager.getStatusMsg(this.grid), input)
	}
}

module.exports = GameManager
