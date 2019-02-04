import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class gameSquare {
    constructor(board, x, y) {
        this.board = board;
        this.displayValue = null;
        this.trueValue = null;
        this.starting = null;
        this.possibilities = [];
        this.x = x;
        this.y = y;
    }

    copyValuesFrom(other) {
        this.displayValue = other.displayValue;
        this.trueValue = other.trueValue;
        this.possibilities = other.possibilities.slice();
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
        this.array[0].possibilities = [1, 3, 5, 7, 9];
    }

    square(x, y) {
        if (0 > x || x > 8) throw Error('Wrong x coordinate: ' + x);
        if (0 > y || y > 8) throw Error('Wrong y coordinate: ' + y);
        return this.array[y * 9 + x];
    }
    
}

function PossibilityGrid(props) {
    const one = props.square.possibilities.includes(1) ? '' : 'blank';
    const two = props.square.possibilities.includes(2) ? '' : 'blank';
    const three = props.square.possibilities.includes(3) ? '' : 'blank';
    const four = props.square.possibilities.includes(4) ? '' : 'blank';
    const five = props.square.possibilities.includes(5) ? '' : 'blank';
    const six = props.square.possibilities.includes(6) ? '' : 'blank';
    const seven = props.square.possibilities.includes(7) ? '' : 'blank';
    const eight = props.square.possibilities.includes(8) ? '' : 'blank';
    const nine = props.square.possibilities.includes(9) ? '' : 'blank';
    return (
        <div className="possibilities">
            <div className="possibility-row">
                <div className={"possibility-cell " + one}>1</div>
                <div className={"possibility-cell " + two}>2</div>
                <div className={"possibility-cell " + three}>3</div>
            </div>
            <div className="possibility-row">
                <div className={"possibility-cell " + four}>4</div>
                <div className={"possibility-cell " + five}>5</div>
                <div className={"possibility-cell " + six}>6</div>
            </div>
            <div className="possibility-row">
                <div className={"possibility-cell " + seven}>7</div>
                <div className={"possibility-cell " + eight}>8</div>
                <div className={"possibility-cell " + nine} >9</div>
                </div>
        </div>
    );
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
    //??? These seem to have x/y swapped from what I think. But everything else seems to be fine...
    if (props.square.y % 3 === 2) {
        classNames += " column-end"
    }
    if (props.square.x % 3 === 2) {
        classNames += " row-end"
    }
    if (props.square.y === 0) {
        classNames += " column-start"
    }
    if (props.square.x === 0) {
        classNames += " row-start"
    }
    let content = null;
    if (props.square.displayValue) {
        // This square has a value, display that
        content = props.square.displayValue
    } else {
        content = new PossibilityGrid(props);
    }
    return (
        <button
            className={classNames}
            onClick={() => props.onClick()}
        >
            {content}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(x, y) {
        return (
            <Square 
                square={this.props.gameBoard.square(x, y)}
                key={9 * y + x}
                onClick={() => this.props.handleClick(x, y)}
                selected={this.props.selection.x === x && this.props.selection.y === y}
            />
        );
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
    const className = "number" + (props.pencil ? " pencil" : "");
    return (
        <button
            className={className}
            onClick={() => props.onClick()}
        >
            {props.value}
        </button> 
    );
}

function Numbers(props) {
    const numbers = [];
    function renderNumber(i) {
        return (<Number value={i} key={i} onClick={()=>{props.onClick(i);}} pencil={props.pencil}/>);
    }
    for (let i = 1; i < 10; i++) {
        numbers.push(renderNumber(i));
    }
    
    return (
        <div className="number-container">{numbers}</div>
    );
}

class Tools extends React.Component {
    render() {
        return (
            <div className="tools">
                <button onClick={() => this.props.undoClicked()} disabled={this.props.undoDisabled}>
                    Undo
                </button>
                <button onClick={() => this.props.redoClicked()} disabled={this.props.redoDisabled}>
                    Redo
                </button>
                <button onClick={() => this.props.editModeClicked()}>
                    Edit Mode
                </button>
                <button onClick={() => this.props.clearClicked()}>
                    Clear
                </button>
            </div>
        )
    }
}
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.numberGuessedCallback = null;
        this.state = {
            history: [new gameBoard()],
            historyPointer: 0,
            selection: {x:0, y:0},
            pencil: false
        }
        this.state.history[0].generate();
    }

    currentBoard() {
        return this.state.history[this.state.historyPointer];
    }

    changeSquare(value) {
        const board = this.currentBoard().clone();
        const square = board.square(this.state.selection.x, this.state.selection.y);
        if (!square.starting) {
            const history = this.state.history.slice(0, this.state.historyPointer + 1);
            square.displayValue = value;
            this.setState({
                history: history.concat([board]),
                historyPointer: history.length
            });
        }
    }

    numberGuessed(i) {
        this.changeSquare(i);
    }

    handleClick(x, y) {
        this.setState({
            selection: {x: x, y: y},
        })
    }

    moveSelection(direction) {
        const clampToGrid = function (number) {
            return Math.min(Math.max(0, number), 8);
        };
        const existingSelection = this.state.selection;
        const newSelection = {
            x: clampToGrid(existingSelection.x + direction.x),
            y: clampToGrid(existingSelection.y + direction.y),
        }
        this.setState({selection: newSelection});
    }

    arrowDown(arrow) {
        const direction = {x: 0, y: 0};
        if (arrow === 'ArrowUp') {
            direction.y = -1;
        } else if (arrow === 'ArrowDown') {
            direction.y = 1;
        } else if (arrow === 'ArrowLeft') {
            direction.x = -1;
        } else if (arrow === 'ArrowRight') {
            direction.x = 1;
        }
        this.moveSelection(direction);
    }

    undoClicked() {
        if (this.state.historyPointer > 0) {
            this.setState({
                historyPointer: this.state.historyPointer - 1
            })
        }
    }

    redoClicked() {
        if (this.state.historyPointer < this.state.history.length - 1) {
            this.setState({
                historyPointer: this.state.historyPointer + 1
            })
        }
    }

    handleKeyDown(event) {
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
            this.numberGuessed(parseInt(event.key));
        } else if (event.key.startsWith('Arrow')) {
            this.arrowDown(event.key);
        } else if (['Backspace', 'Delete'].includes(event.key)) {
            this.clearClicked();
        } else if (event.ctrlKey) {
            if (event.key === 'z') {
                this.undoClicked();
            } else if (event.key === 'y') {
                this.redoClicked();
            }
        }
    }

    editModeClicked() {
        this.setState({pencil: !this.state.pencil});
    }

    clearClicked() {
        this.changeSquare(null);
    }

    render() {
      return (
        <div className="game" onKeyDown={(event) => this.handleKeyDown(event)}>
          <div className="game-board">
            <Board 
                selection={this.state.selection} 
                gameBoard={this.currentBoard()}
                handleClick={(x, y) => this.handleClick(x, y)}
            />
          </div>
          <Tools 
            undoClicked={()=>this.undoClicked()}
            undoDisabled={this.state.historyPointer === 0}
            redoClicked={()=>this.redoClicked()}
            redoDisabled={this.state.historyPointer === this.state.history.length - 1}
            editModeClicked={()=>this.editModeClicked()}
            clearClicked={() => this.clearClicked()}
          />
          <Numbers onClick={(i)=>{this.numberGuessed(i);}} pencil={this.state.pencil}/>
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
  