const Player = (mark) => {
  const makeMove = (index) => {
    Board.addMove(mark, index);
  };
  return { makeMove };
};

const xPlayer = Player("X");
const oPlayer = Player("O");

const Board = (function () {
  const _board = new Array(9).fill(null, 0, 9);

  let _currentPlayer = xPlayer;

  const getCurrentPlayer = () => {
    return _currentPlayer;
  };

  const _togglePlayer = () => {
    if (_currentPlayer === xPlayer) {
      _currentPlayer = oPlayer;
    } else {
      _currentPlayer = xPlayer;
    }
  };

  const addMove = (move, index) => {
    if (_board.at(index)) {
      return;
    }

    _board.splice(index, 1, move);
    _togglePlayer();
  };

  const clear = () => {
    _currentPlayer = xPlayer;
    _board.fill(null, 0, 9);
  };

  const logBoard = () => console.log(_board);

  return {
    clear,
    addMove,
    logBoard,
    getCurrentPlayerAndSetTheNext: getCurrentPlayer,
  };
})();

const displayController = (() => {
  const _cells = document.querySelectorAll("#board-container div");

  _cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const indexClicked = cell.getAttribute("data-index");
      const currentPlayer = Board.getCurrentPlayerAndSetTheNext();
      currentPlayer.makeMove(indexClicked);
      Board.logBoard();
    });
  });
})();
