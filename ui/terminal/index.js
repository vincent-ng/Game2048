const Canvas = require('term-canvas')
const keypress = require('keypress')
const GameManager = require('../common/GameManager.js')

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
const gm = new GameManager(canvas)

const InputMap = {
	return: GameManager.Key.Restart,
	up: GameManager.Key.Up,
	right: GameManager.Key.Right,
	down: GameManager.Key.Down,
	left: GameManager.Key.Left,
}

const stdin = process.stdin
keypress(stdin)
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')
stdin.on('keypress', (ch, key) => {
	if (!key) {
		return
	}
	if ((key.name === 'c' && key.ctrl) ||
		key.name === 'q' ||
		key.name === 'escape'
	) {
		process.exit(0)
	}
	gm.handleInput(InputMap[key.name])
})
