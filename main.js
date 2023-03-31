const Player = (marka) => {
  const mark = marka;

  const makeMove = (index) => {
    Board.addMove(mark, index);
  };

  const win = () => {
    displayController.displayWinScreen(mark);
  };
  return { mark, makeMove, win };
};

const xPlayer = Player("X");
const oPlayer = Player("O");

const Board = (function () {
  const _board = new Array(9).fill(null, 0, 9);

  let _currentPlayer = xPlayer;

  const _togglePlayer = () => {
    if (_currentPlayer === xPlayer) {
      _currentPlayer = oPlayer;
      displayController.displayCurrentPlayer("O");
    } else {
      _currentPlayer = xPlayer;
      displayController.displayCurrentPlayer("X");
    }
  };

  const _checkWinner = () => {
    if (
      (_board[0] &&
        _board[1] &&
        _board[2] &&
        _board[0] === _board[1] &&
        _board[0] === _board[2]) ||
      (_board[3] &&
        _board[4] &&
        _board[5] &&
        _board[3] === _board[4] &&
        _board[3] === _board[5]) ||
      (_board[6] &&
        _board[7] &&
        _board[8] &&
        _board[6] === _board[7] &&
        _board[6] === _board[8]) ||
      (_board[0] &&
        _board[3] &&
        _board[6] &&
        _board[0] === _board[3] &&
        _board[0] === _board[6]) ||
      (_board[1] &&
        _board[4] &&
        _board[7] &&
        _board[1] === _board[4] &&
        _board[1] === _board[7]) ||
      (_board[2] &&
        _board[5] &&
        _board[8] &&
        _board[2] === _board[5] &&
        _board[2] === _board[8]) ||
      (_board[0] &&
        _board[4] &&
        _board[8] &&
        _board[0] === _board[4] &&
        _board[0] === _board[8]) ||
      (_board[2] &&
        _board[4] &&
        _board[6] &&
        _board[2] === _board[4] &&
        _board[2] === _board[6])
    ) {
      return true;
    }
    return false;
  };

  const getCurrentPlayer = () => {
    return _currentPlayer;
  };

  const addMove = (move, index) => {
    if (_board.at(index)) {
      return;
    }

    _board.splice(index, 1, move);
    displayController.drawMarkInCell(index, _currentPlayer);
    if (_checkWinner()) {
      _currentPlayer.win();
    }
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
    getCurrentPlayer,
  };
})();

const displayController = (() => {
  const restartButton = document.querySelector("#win-screen button");
  const winnerDisplay = document.querySelector(".winner");
  const winScreen = document.querySelector("#win-screen");
  const _cells = document.querySelectorAll("#board-container div");
  const currentPlayerDisplay = document.querySelector(".current-player");

  restartButton.addEventListener("click", () => {
    Board.clear();
    displayController.clearDisplay();
    displayController.hideWinScreen();
    displayController.displayCurrentPlayer("X");
  });

  _cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const indexClicked = cell.getAttribute("data-index");
      const currentPlayer = Board.getCurrentPlayer();
      currentPlayer.makeMove(indexClicked);
      Board.logBoard();
    });
  });

  _cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      const hoverclass =
        Board.getCurrentPlayer() === xPlayer ? "xPlayer" : "oPlayer";
      if (!cell.getAttribute("data-mark")) {
        cell.classList.toggle(hoverclass);
      }
    });
    cell.addEventListener("mouseout", () => {
      const hoverclass =
        Board.getCurrentPlayer() === xPlayer ? "xPlayer" : "oPlayer";
      if (!cell.getAttribute("data-mark")) {
        cell.classList.toggle(hoverclass);
      }
    });
  });

  const drawMarkInCell = (index, player) => {
    _cells[index].setAttribute("data-mark", player.mark);
  };

  const displayWinScreen = (winnerMark) => {
    winnerDisplay.textContent = winnerMark;
    winScreen.classList.remove("hidden");
  };

  const hideWinScreen = () => {
    winScreen.classList.add("hidden");
  };

  const clearDisplay = () => {
    _cells.forEach((cell) => {
      cell.setAttribute("data-mark", "");
      cell.classList.remove("xPlayer", "oPlayer");
    });
  };

  const displayCurrentPlayer = (player) => {
    currentPlayerDisplay.textContent = player;
  };

  return {
    drawMarkInCell,
    displayWinScreen,
    hideWinScreen,
    clearDisplay,
    displayCurrentPlayer,
  };
})();

displayController.displayCurrentPlayer("X"); // Display first player at first load
