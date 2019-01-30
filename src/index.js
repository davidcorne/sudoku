import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class gameSquare {
    constructor(board, x, y) {
        this.board = board;
        this.displayValue = null;
        this.trueValue = null;
        this.starting = null;
        this.guesses = [];
        this.x = x;
        this.y = y;
    }

    copyValuesFrom(other) {
        this.displayValue = other.displayValue;
        this.trueValue = other.trueValue;
        this.guesses = other.guesses.slice();
        this.starting = other.starting;
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
    }

    clone() {
        const newBoard = new gameBoard();
        for (let i = 0; i < 81; i++) {
            newBoard.array[i].copyValuesFrom(this.array[i]);
        }
        return newBoard;
    }
    setSudoku(trueValues, displayValues) {
        if (trueValues.length !== 81) throw Error('Wrong trueValues array length');
        if (displayValues.length !== 81) throw Error('Wrong displayValues array length');
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const square = this.square(i, j);
                square.trueValue = trueValues[j * 9 + i];
                square.displayValue = displayValues[j * 9 + i];
                square.starting = Boolean(square.displayValue);
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
            null, 4, null, null, null, null, 1, 7, 9, 
            null, null, 2, null, null, 8, null, 5, 4, 
            null, null, 6, null, null, 5, null, null, 8, 
            null, 8, null, null, 7, null, 9, 1, null, 
            null, 5, null, null, 9, null, null, 3, null, 
            null, 1, 9, null, 6, null, null, 4, null, 
            3, null, null, 4, null, null, 7, null, null, 
            5, 7, null, 1, null, null, 2, null, null, 
            9, 2, 8, null, null, null, null, 6, null, 
        ]
        this.setSudoku(trueValues, displayValues);
    }

    square(x, y) {
        if (0 > x || x > 8) throw Error('Wrong x coordinate: ' + x);
        if (0 > y || y > 8) throw Error('Wrong y coordinate: ' + y);
        return this.array[y * 9 + x];
    }
    
}

function Square(props) {
    let classNames = "square";
    if (props.selected) {
        classNames += " selected";
    }
    if (props.square.displayValue && props.square.trueValue !== props.square.displayValue) {
        classNames += " incorrect";
    }
    if (props.square.starting) {
        classNames += " starting";
    }
    return (
        <button
            className={classNames}
            onClick={() => props.onClick()}
        >
            {props.square.displayValue}
        </button>
    );
}
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameBoard: new gameBoard(),
            selection: {x: 0, y: 0}
        }
        this.state.gameBoard.generate();
        this.props.parent.numberGuessedCallback = (i) => {this.numberGuessed(i);};
    }
    renderSquare(x, y) {
        return (
            <Square 
                square={this.state.gameBoard.square(x, y)}
                key={9 * y + x}
                onClick={() => this.handleClick(x, y)}
                selected={this.state.selection.x === x && this.state.selection.y === y}
            />
        );
    }

    numberGuessed(i) {
        const board = this.state.gameBoard.clone();
        board.square(this.state.selection.x, this.state.selection.y).displayValue = i;
        this.setState({gameBoard: board});
    }

    handleClick(x, y) {
        this.setState({
            gameBoard: this.state.gameBoard,
            selection: {x: x, y: y}
        })
    }
  
    createGrid() {
        let grid = [];
        for (let i = 0; i < 9; i++) {
            let children = [];
            for (let j = 0; j < 9; j++) {
                children.push(this.renderSquare(j, i));
            }
            grid.push(<div className="board-row" key={i}>{children}</div>)
        }
        return grid;
    }
    render() {
        return this.createGrid();
    }
  }
  
function Number(props) {
    return (
        <button
            className="number"
            onClick={() => props.onClick()}
        >
            {props.value}
        </button> 
    );
}

function Numbers(props) {
    const numbers = [];
    function renderNumber(i) {
        return (<Number value={i} key={i} onClick={()=>{props.onClick(i);}}/>);
    }
    for (let i = 1; i < 10; i++) {
        numbers.push(renderNumber(i));
    }
    return (
        <div className="number-container">{numbers}</div>
    );
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.numberGuessedCallback = null;
    }

    numberGuessed(i) {
        if (!this.numberGuessedCallback) throw Error('numberGuessedCallback should be set.')
        this.numberGuessedCallback(i);
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board parent={this}/>
          </div>
          <Numbers onClick={(i)=>{this.numberGuessed(i);}}/>
          <div className="game-info">
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
  