const Canvas = require('term-canvas')
const keypress = require('keypress')
const Grid = require('../../lib')
const drawer = require('../common/canvasDrawer.js')
const messager = require('../common/messager.js')

// make stdout faster
function debounceStdout() {
	let buffer = ''
	const write = process.stdout.write
	process.stdout.write = (data) => {
		buffer += data
		process.nextTick(() => {
			write.apply(process.stdout, [buffer])
			buffer = ''
		})
	}
}
debounceStdout()

const canvas = new Canvas(...process.stdout.getWindowSize())
const ctx = canvas.getContext('2d')

let grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
grid.randomTile(2)
drawer.draw(ctx, grid)
drawer.promoteMsg(ctx, messager.getStatusMsg(grid))

const stdin = process.stdin
keypress(stdin)
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')
process.stdin.on('keypress', (ch, key) => {
	if (!key) {
		// console.log(ch)
		return
	}
	if (grid.isAccomplished() && key.name !== 'return') {
		return
	}
	switch (key.name) {
		case 'c':
			if (key.ctrl) {
				process.exit(0)
			}
			break
		case 'q':
		case 'escape':
			process.exit(0)
			break
		case 'return':
			grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
			grid.randomTile(2)
			break
		case 'up':
			grid.mergeToYNegative()
			if (!grid.isFull()) {
				grid.randomTile(1)
			}
			break
		case 'right':
			grid.mergeToXPositive()
			if (!grid.isFull()) {
				grid.randomTile(1)
			}
			break
		case 'down':
			grid.mergeToYPositive()
			if (!grid.isFull()) {
				grid.randomTile(1)
			}
			break
		case 'left':
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
