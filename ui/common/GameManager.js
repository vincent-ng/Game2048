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
		switch (input) {
			case GameManager.Key.Restart:
				this.grid = new Grid(this.gridSize, this.gridSize)
				this.grid.randomTile(2)
				break
			case GameManager.Key.Up:
				this.grid.mergeToYNegative()
				if (!this.grid.isFull()) {
					this.grid.randomTile(1)
				}
				break
			case GameManager.Key.Right:
				this.grid.mergeToXPositive()
				if (!this.grid.isFull()) {
					this.grid.randomTile(1)
				}
				break
			case GameManager.Key.Down:
				this.grid.mergeToYPositive()
				if (!this.grid.isFull()) {
					this.grid.randomTile(1)
				}
				break
			case GameManager.Key.Left:
				this.grid.mergeToXNegative()
				if (!this.grid.isFull()) {
					this.grid.randomTile(1)
				}
				break
			default:
				break
		}
		drawer.draw(this.ctx, this.grid)
		drawer.promoteMsg(this.ctx, messager.getStatusMsg(this.grid), input)
	}
}

module.exports = GameManager
