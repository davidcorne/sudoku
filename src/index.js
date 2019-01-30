import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class gameSquare {
    constructor(board, x, y) {
        this.board = board;
        this.displayValue = null;
        this.trueValue = null;
        this.guesses = [];
        this.x = x;
        this.y = y;
    }
}

class gameBoard {
    constructor() {
        this.array = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.array.push(new gameSquare(this, i, j));
            }
        }
        this.generate();
    }

    setSudoku(trueValues, displayValues) {
        if (trueValues.length !== 81) throw Error('Wrong trueValues array length');
        if (displayValues.length !== 81) throw Error('Wrong displayValues array length');
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.square(i, j).trueValue = trueValues[i * 9 + j];
                this.square(i, j).displayValue = displayValues[i * 9 + j];
            }
        }

    }
    generate() {
        // Should generate a sudoku, hard-code one for now.
        // 8 4 5 | 6 3 2 | 1 7 9 
        // 7 3 2 | 9 1 8 | 6 5 4 
        // 1 9 6 | 7 4 5 | 3 2 8 
        // ---------------------
        // 6 8 3 | 5 7 4 | 9 1 2
        // 4 5 7 | 2 9 1 | 8 3 6
        // 2 1 9 | 8 6 3 | 5 4 7
        // ---------------------
        // 3 6 1 | 4 2 9 | 7 8 5
        // 5 7 4 | 1 8 6 | 2 9 3
        // 9 2 8 | 3 5 7 | 4 6 1
        const trueValues = [
            8, 4, 5, 6, 3, 2, 1, 7, 9,
            7, 3, 2, 9, 1, 8, 6, 5, 4, 
            1, 9, 6, 7, 4, 5, 3, 2, 8, 
            6, 8, 3, 5, 7, 4, 9, 1, 2,
            4, 5, 7, 2, 9, 1, 8, 3, 6,
            2, 1, 9, 8, 6, 3, 5, 4, 7,
            3, 6, 1, 4, 2, 9, 7, 8, 5,
            5, 7, 4, 1, 8, 6, 2, 9, 3,
            9, 2, 8, 3, 5, 7, 4, 6, 1,
        ]
        // 0 4 0 | 0 0 0 | 1 7 9 
        // 0 0 2 | 0 0 8 | 0 5 4 
        // 0 0 6 | 0 0 5 | 0 0 8 
        // ---------------------
        // 0 8 0 | 0 7 0 | 9 1 0 
        // 0 5 0 | 0 9 0 | 0 3 0 
        // 0 1 9 | 0 6 0 | 0 4 0 
        // ---------------------
        // 3 0 0 | 4 0 0 | 7 0 0 
        // 5 7 0 | 1 0 0 | 2 0 0 
        // 9 2 8 | 0 0 0 | 0 6 0 

        const displayValues = [
            0, 4, 0, 0, 0, 0, 1, 7, 9, 
            0, 0, 2, 0, 0, 8, 0, 5, 4, 
            0, 0, 6, 0, 0, 5, 0, 0, 8, 
            0, 8, 0, 0, 7, 0, 9, 1, 0, 
            0, 5, 0, 0, 9, 0, 0, 3, 0, 
            0, 1, 9, 0, 6, 0, 0, 4, 0, 
            3, 0, 0, 4, 0, 0, 7, 0, 0, 
            5, 7, 0, 1, 0, 0, 2, 0, 0, 
            9, 2, 8, 0, 0, 0, 0, 6, 0, 
        ]
        this.setSudoku(trueValues, displayValues);
    }

    square(x, y) {
        if (0 > x || x > 8) throw Error('Wrong x coordinate: ' + x);
        if (0 > y || y > 8) throw Error('Wrong y coordinate: ' + y);
        return this.array[x * 9 + y];
    }
    
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            parent: null
        }
    }
    render() {
      return (
        <button className="square">
          {this.props.square.displayValue}
        </button>
      );
    }
  }
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameBoard: new gameBoard()
        }
    }
    renderSquare(x, y) {
        return (<Square square={this.state.gameBoard.square(x, y)}/>);
      }
  
    createGrid() {
        let grid = [];
        for (let i = 0; i < 9; i++) {
            let children = [];
            for (let j = 0; j < 9; j++) {
                children.push(this.renderSquare(j, i));
            }
            grid.push(<div className="board-row">{children}</div>)
        }
        return grid;
    }
    render() {
        const status = 'Next player: X';
        return (
            <div>
                <div className="status">{status}</div>
                {this.createGrid()}
            </div>
        );
    }
  }
  
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
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  