const Grid = require('../../lib')
const drawer = require('../common/canvasDrawer.js')
const messager = require('../common/messager.js')

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.font = '24px serif'
drawer.Config.GridBorderSize.Width = 10
drawer.Config.GridBorderSize.Height = 10
drawer.Config.TileBorderSize.Width = 10
drawer.Config.TileBorderSize.Height = 10
drawer.Config.TileSize.Width = 100
drawer.Config.TileSize.Height = 100
drawer.Config.TileLevelColor[2] = 'gray'
drawer.Config.FontHeight = 24

let grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
grid.randomTile(2)
drawer.draw(ctx, grid)
drawer.promoteMsg(ctx, messager.getStatusMsg(grid))

const onKeydown = (document.attachEvent || document.addEventListener).bind(document)
onKeydown('keydown', (e) => {
	const cmd = e.keyIdentifier || e.key
	if (grid.isAccomplished() && cmd !== 'Enter') {
		return
	}
	switch (cmd) {
		case 'Enter':
			grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
			grid.randomTile(2)
			break
		case 'ArrowUp':
		case 'Up':
			grid.mergeToYNegative()
			if (!grid.isFull()) {
				grid.randomTile(1)
			}
			break
		case 'ArrowRight':
		case 'Right':
			grid.mergeToXPositive()
			if (!grid.isFull()) {
				grid.randomTile(1)
			}
			break
		case 'ArrowDown':
		case 'Down':
			grid.mergeToYPositive()
			if (!grid.isFull()) {
				grid.randomTile(1)
			}
			break
		case 'ArrowLeft':
		case 'Left':
			grid.mergeToXNegative()
			if (!grid.isFull()) {
				grid.randomTile(1)
			}
			break
		default:
			break
	}
	drawer.draw(ctx, grid)
	drawer.promoteMsg(ctx, messager.getStatusMsg(grid))
})
