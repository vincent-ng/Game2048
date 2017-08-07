const Message = {
	Usage: 'Usage: Arrow key to play until 2048. Enter to restart.',
	Negative: 'Can not merge.',
	GameOver: 'Game Over! Please restart.',
	Accomplished: 'You got 2048!',
}

function getStatusMsg(grid) {
	if (grid.isAccomplished()) {
		return Message.Accomplished
	} else if (grid.isGameOver()) {
		return Message.GameOver
	} else if (grid.isFull()) {
		return Message.Negative
	}
	return Message.Usage
}

module.exports = {
	Message,
	getStatusMsg,
}
