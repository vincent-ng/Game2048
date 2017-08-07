const Canvas = require('term-canvas')
const keypress = require('keypress')
const Grid = require('../../lib')
const drawer = require('../common/canvasDrawer.js')

const Message = {
	Usage: 'Usage: Arrow key to play. Enter to restart. ESC to exit.',
	Negative: 'Can not merge.',
	GameOver: 'Game Over! Please restart.',
}

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

let grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
grid.randomTile(2)

debounceStdout()

const canvas = new Canvas(...process.stdout.getWindowSize())
const ctx = canvas.getContext('2d')
drawer.draw(ctx, grid)
drawer.promoteMsg(ctx, Message.Usage)

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
	let msg = String(key.name)
	switch (key.name) {
		case 'c':
			if (key.ctrl) {
				process.exit(0)
			}
			break
		case 'escape':
			process.exit(0)
			break
		case 'return':
			grid = new Grid(drawer.Config.GridSize, drawer.Config.GridSize)
			grid.randomTile(2)
			break
		case 'up':
			grid.mergeToYNegative()
			if (grid.isFull()) {
				msg = Message.Negative
				break
			}
			grid.randomTile(1)
			break
		case 'right':
			grid.mergeToXPositive()
			if (grid.isFull()) {
				msg = Message.Negative
				break
			}
			grid.randomTile(1)
			break
		case 'down':
			grid.mergeToYPositive()
			if (grid.isFull()) {
				msg = Message.Negative
				break
			}
			grid.randomTile(1)
			break
		case 'left':
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
