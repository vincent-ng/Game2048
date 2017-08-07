const Config = {
	GridSize: 4,
	GridBorderSize: { Width: 2, Height: 1 },
	GridColor: { Background: 'white' },
	TileSize: { Width: 9, Height: 5 },
	TileBorderSize: { Width: 2, Height: 1 },
	TileColor: { Background: 'normal', Text: 'white', Border: 'white' },
	TileBlockColor: { Background: 'cyan', Border: 'white' },
	TileLevelColor: {
		2: 'normal',
		4: 'green',
		8: 'green',
		16: 'blue',
		32: 'blue',
		64: 'red',
		128: 'red',
		256: 'yellow',
		512: 'yellow',
		1024: 'magenta',
		2048: 'magenta',
	},
	FontHeight: 0,
}

function measureTextWidth(ctx, text) {
	return ctx.measureText ? ctx.measureText(text).width : text.length
}

function getMiddle(outter, inner, drawBottomUp = false) {
	return Math.floor((drawBottomUp ? outter + inner : outter - inner) / 2)
}

function drawEmptyTile(ctx, { x, y }, color) {
	ctx.fillStyle = color.Border
	ctx.fillRect(
		x - Config.TileBorderSize.Width,
		y - Config.TileBorderSize.Height,
		Config.TileSize.Width + (Config.TileBorderSize.Width * 2),
		Config.TileSize.Height + (Config.TileBorderSize.Height * 2)
	)
	ctx.fillStyle = color.Background
	ctx.fillRect(x, y, Config.TileSize.Width, Config.TileSize.Height)
}

function drawTile(ctx, offset, value) {
	const color = {
		Background: Config.TileLevelColor[value] || Config.TileColor.Background,
		Border: Config.TileColor.Border,
	}
	drawEmptyTile(ctx, offset, color)
	const text = String(value)
	ctx.fillStyle = Config.TileColor.Text
	ctx.fillText(text, offset.x + getMiddle(Config.TileSize.Width, measureTextWidth(ctx, text)), offset.y + getMiddle(Config.TileSize.Height, Config.FontHeight, true))
}

function draw(ctx, grid) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.save()

	const gridStart = {
		x: getMiddle(ctx.canvas.width, Config.TileSize.Width * grid.width),
		y: getMiddle(ctx.canvas.height, Config.TileSize.Height * grid.height),
	}

	ctx.fillStyle = Config.GridColor.Background
	ctx.fillRect(
		gridStart.x - (Config.GridBorderSize.Width + Config.TileBorderSize.Width),
		gridStart.y - (Config.GridBorderSize.Height + Config.TileBorderSize.Height),
		(grid.width * (Config.TileSize.Width + Config.TileBorderSize.Width)) + (Config.GridBorderSize.Width * 2) + Config.TileBorderSize.Width,
		(grid.height * (Config.TileSize.Height + Config.TileBorderSize.Height)) + (Config.GridBorderSize.Height * 2) + Config.TileBorderSize.Height
	)

	for (let y = 0; y < grid.height; y += 1) {
		for (let x = 0; x < grid.width; x += 1) {
			const offset = {
				x: gridStart.x + (x * (Config.TileSize.Width + Config.TileBorderSize.Width)),
				y: gridStart.y + (y * (Config.TileSize.Height + Config.TileBorderSize.Height)),
			}
			drawEmptyTile(ctx, offset, Config.TileBlockColor)
		}
	}

	for (const tile of grid.tiles) {
		const offset = {
			x: gridStart.x + (tile.x * (Config.TileSize.Width + Config.TileBorderSize.Width)),
			y: gridStart.y + (tile.y * (Config.TileSize.Height + Config.TileBorderSize.Height)),
		}
		drawTile(ctx, offset, tile.value)
	}

	ctx.restore()
}

function promoteMsg(ctx, msg = '', promoter = '> ') {
	ctx.save()
	ctx.fillStyle = Config.TileColor.Text
	if (msg) {
		ctx.fillText(msg, getMiddle(ctx.canvas.width, measureTextWidth(ctx, msg)), Config.FontHeight)
	}
	ctx.fillText(promoter, 0, ctx.canvas.height)
	ctx.restore()
}

module.exports = {
	Config,
	draw,
	promoteMsg,
}
