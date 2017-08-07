const Grid = require('../../lib')
const drawer = require('../common/canvasDrawer.js')

const Message = {
	Usage: 'Usage: Arrow key to play. Enter to restart.',
	Negative: 'Can not merge.',
	GameOver: 'Game Over! Please restart.',
}

let grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
grid.randomTile(2)

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

drawer.Config.GridBorderSize.Width = 10
drawer.Config.GridBorderSize.Height = 10
drawer.Config.TileBorderSize.Width = 10
drawer.Config.TileBorderSize.Height = 10
drawer.Config.TileSize.Width = 100
drawer.Config.TileSize.Height = 100
drawer.Config.TileLevelColor[2] = 'gray'
drawer.Config.FontHeight = 0

drawer.draw(ctx, grid)
drawer.promoteMsg(ctx, Message.Usage)

const onKeydown = (document.attachEvent || document.addEventListener).bind(document)
onKeydown('keydown', (e) => {
	const cmd = e.keyIdentifier || e.key
	let msg = String(cmd)
	switch (cmd) {
		case 'Enter':
			grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
			grid.randomTile(2)
			break
		case 'ArrowUp':
		case 'Up':
			grid.mergeToYNegative()
			if (grid.isFull()) {
				msg = Message.Negative
				break
			}
			grid.randomTile(1)
			break
		case 'ArrowRight':
		case 'Right':
			grid.mergeToXPositive()
			if (grid.isFull()) {
				msg = Message.Negative
				break
			}
			grid.randomTile(1)
			break
		case 'ArrowDown':
		case 'Down':
			grid.mergeToYPositive()
			if (grid.isFull()) {
				msg = Message.Negative
				break
			}
			grid.randomTile(1)
			break
		case 'ArrowLeft':
		case 'Left':
			grid.mergeToXNegative()
			if (grid.isFull()) {
				msg = Message.Negative
				break
			}
			grid.randomTile(1)
			break
		default:
			msg = Message.Usage
			break
	}
	drawer.draw(ctx, grid)
	if (grid.isGameOver()) {
		msg = Message.GameOver
	}
	drawer.promoteMsg(ctx, msg)
})
