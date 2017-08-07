const _ = require('underscore')

class Tile {
	constructor(x = 0, y = 0, value = 0) {
		this.moveTo(x, y)
		this.value = value
	}
	moveTo(x, y) {
		this.x = x
		this.y = y
	}
	equal(tile) {
		return tile && this.value === tile.value
	}
	add(tile) {
		this.value += tile.value
	}
	toString() {
		const log2 = Math.log2(this.value)
		return Number.isInteger(log2) ? log2.toString(16) : '?'
	}
}

class Grid {
	constructor(width = 4, height = 4) {
		this.width = width
		this.height = height
		this.tiles = []
	}
	remove(tile) {
		let i = 0
		while (i < this.tiles.length) {
			if (this.tiles[i] === tile) {
				this.tiles.splice(i, 1)
			} else {
				i += 1
			}
		}
	}
	randomTile(count, value = 2) {
		if (this.tiles.length + count > this.width * this.height) {
			throw new Error(`Can not generate ${count} cells for Grid(${this.width}*${this.height}) with ${this.tiles.length} elements`)
		}
		let candidate = []
		for (let y = 0; y < this.height; y += 1) {
			for (let x = 0; x < this.width; x += 1) {
				const coord = { x, y }
				if (!_.find(this.tiles, coord)) {
					candidate.push(coord)
				}
			}
		}
		candidate = _.map(_.sample(candidate, count), ({ x, y }) => new Tile(x, y, value))
		this.tiles.push(...candidate)
	}
	toString() {
		const map = this.getTileMap()
		let rs = ''
		for (const row of map) {
			for (const cell of row) {
				const value = cell ? cell.toString() : '.'
				rs += value
			}
			rs += '\n'
		}
		return rs
	}
	getTileMap() {
		const map = _.times(this.height, () => _.times(this.width, _.constant(null)))
		for (const tile of this.tiles) {
			map[tile.y][tile.x] = tile
		}
		return map
	}
	// rotate asix Y toward asix X (90 deg)
	rotate() {
		for (const tile of this.tiles) {
			const { x, y } = tile
			tile.moveTo(y, -x + (this.height - 1))
		}
	}
	// merge asix X toward 0
	merge() {
		const map = this.getTileMap()
		for (const row of map) {
			const cells = _.compact(row)
			let current = cells.shift()
			let nextX = 0
			while (current) {
				current.x = nextX
				nextX = current.x + 1
				let next = cells.shift()
				if (current.equal(next)) {
					current.add(next)
					this.remove(next)
					next = cells.shift()
				}
				current = next
			}
		}
	}
	mergeToXNegative() {
		this.merge()
	}
	mergeToYNegative() {
		this.rotate()
		this.merge()
		this.rotate()
		this.rotate()
		this.rotate()
	}
	mergeToXPositive() {
		this.rotate()
		this.rotate()
		this.merge()
		this.rotate()
		this.rotate()
	}
	mergeToYPositive() {
		this.rotate()
		this.rotate()
		this.rotate()
		this.merge()
		this.rotate()
	}
	isFull() {
		return this.tiles.length >= this.width * this.height
	}
	isGameOver() {
		if (!this.isFull()) {
			return false
		}
		for (const tile of this.tiles) {
			if (_.find(this.tiles, { x: tile.x, y: tile.y - 1, value: tile.value }) ||
				_.find(this.tiles, { x: tile.x + 1, y: tile.y, value: tile.value }) ||
				_.find(this.tiles, { x: tile.x, y: tile.y + 1, value: tile.value }) ||
				_.find(this.tiles, { x: tile.x - 1, y: tile.y, value: tile.value })
			) {
				return false
			}
		}
		return true
	}
	isAccomplished(value = 2048) {
		return !!_.find(this.tiles, { value })
	}
}

module.exports = Grid
