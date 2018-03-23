import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Square 'functional component'.
// It is a functional component because is doesn't
// have to manage any state, it simply renders the values
// props.
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
// Board class that manages a collection of 9
// squares by storing the state of the squares
// and rendering them via the functional component 'square'

// Notes: super(props) sets the props to be accessible by 'this'

  class Board extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true
      }
    }


    // This function is called via the onClick listener
    // which was assigned to the 'square' class
    // by the renderSquare function.
    handleClick(i) {
      const squares = this.state.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState(
        {
          squares: squares,
          xIsNext: !this.state.xIsNext
        }
      );
    }

    // This method is called from the built in 'render' method
    // and renders the square at the point of call.
    // The onClick listener is assigned to this.handleClick to
    // allow the board to manage the state of the squares
    renderSquare(i) {
      return (
        <Square 
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    // This is the first 'built in' method to be called when the board is
    // called by Game.  It simply calls renderSquare passing the index
    // identifier of that square to allow the renderSquare method to do its 
    // business.
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
// Game class that initalises 'Board' and outrputs some game info.

  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // This is START.
  // Render the Game.
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  // Helper functions

  // Calculates the winner of the tic-tac-toe game by having a collection
  // of all the winning lines and checks to see if the state of the squares
  // matches any of them.
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  