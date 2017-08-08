const drawer = require('../common/canvasDrawer.js')
const GameManager = require('../common/GameManager.js')
const Hammer = require('hammerjs')

// drawer.Config.font = '24px serif'
drawer.Config.GridBorderSize.Width = 10
drawer.Config.GridBorderSize.Height = 10
drawer.Config.TileBorderSize.Width = 10
drawer.Config.TileBorderSize.Height = 10
drawer.Config.TileSize.Width = 100
drawer.Config.TileSize.Height = 100
drawer.Config.TileLevelColor[2] = 'gray'
drawer.Config.FontHeight = 24

const canvas = document.getElementById('myCanvas')
const gm = new GameManager(canvas)

const InputMap = {
	Enter: GameManager.Key.Restart,
	ArrowUp: GameManager.Key.Up,
	ArrowRight: GameManager.Key.Right,
	ArrowDown: GameManager.Key.Down,
	ArrowLeft: GameManager.Key.Left,
	Up: GameManager.Key.Up,
	Right: GameManager.Key.Right,
	Down: GameManager.Key.Down,
	Left: GameManager.Key.Left,
	[Hammer.DIRECTION_UP]: GameManager.Key.Up,
	[Hammer.DIRECTION_RIGHT]: GameManager.Key.Right,
	[Hammer.DIRECTION_DOWN]: GameManager.Key.Down,
	[Hammer.DIRECTION_LEFT]: GameManager.Key.Left,
}

// keyboard
const onKeydown = (document.attachEvent || document.addEventListener).bind(document)
onKeydown('keydown', (e) => {
	const key = e.keyIdentifier || e.key
	gm.handleInput(InputMap[key])
})

// touch
const hammer = new Hammer(document)
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
hammer.on('swipe', (e) => {
	gm.handleInput(InputMap[e.direction])
})
