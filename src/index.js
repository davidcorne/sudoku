import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { gameBoard } from './game.js';

function NotesGrid(props) {
    const one = props.square.notes.includes(1) ? '' : 'blank';
    const two = props.square.notes.includes(2) ? '' : 'blank';
    const three = props.square.notes.includes(3) ? '' : 'blank';
    const four = props.square.notes.includes(4) ? '' : 'blank';
    const five = props.square.notes.includes(5) ? '' : 'blank';
    const six = props.square.notes.includes(6) ? '' : 'blank';
    const seven = props.square.notes.includes(7) ? '' : 'blank';
    const eight = props.square.notes.includes(8) ? '' : 'blank';
    const nine = props.square.notes.includes(9) ? '' : 'blank';
    return (
        <div className="notes">
            <div className="notes-row">
                <div className={"note-cell " + one}>1</div>
                <div className={"note-cell " + two}>2</div>
                <div className={"note-cell " + three}>3</div>
            </div>
            <div className="notes-row">
                <div className={"note-cell " + four}>4</div>
                <div className={"note-cell " + five}>5</div>
                <div className={"note-cell " + six}>6</div>
            </div>
            <div className="notes-row">
                <div className={"note-cell " + seven}>7</div>
                <div className={"note-cell " + eight}>8</div>
                <div className={"note-cell " + nine} >9</div>
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
        content = new NotesGrid(props);
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

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        this.setState({show: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        this.setState({show: false}, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
            <div>
                <button className="menu-button" onClick={() => this.showMenu()}>New</button>
                {this.state.show ?
                    (<div className="menu">
                        <button className="menu-button" onClick={() => this.props.newGame('easy')}>Easy</button>
                        <button className="menu-button" onClick={() => this.props.newGame('medium')}>Medium</button>
                        <button className="menu-button" onClick={() => this.props.newGame('difficult')}>Difficult</button>
                        <button className="menu-button" onClick={() => this.props.newGame('insane')}>Insane</button>
                        <button className="menu-button" onClick={() => this.props.newGame('test')}>Test</button>
                    </div>
                    ) : null
                }
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.newState('medium');
    }

    newState(difficulty) {
        const board = new gameBoard();
        board.generate(difficulty);
        const state = {
            history: [board],
            historyPointer: 0,
            selection: {x:0, y:0},
            pencil: false
        }
        return state;
    }
    
    currentBoard() {
        return this.state.history[this.state.historyPointer];
    }

    changeSquare(mutator) {
        const board = this.currentBoard().clone();
        const square = board.square(this.state.selection.x, this.state.selection.y);
        if (!square.starting) {
            const history = this.state.history.slice(0, this.state.historyPointer + 1);
            mutator(square);
            this.setState({
                history: history.concat([board]),
                historyPointer: history.length
            });
        }
    }

    newGame(difficulty) {
        this.setState(this.newState(difficulty));
    }

    numberGuessed(i) {
        if (!this.state.pencil) {
            this.changeSquare((square) => {square.numberGuessed(i);});
        } else {
            this.changeSquare((square) => {square.note(i);});
        }
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
            if (event.key === 'z' || event.key === 'Z') {
                this.undoClicked();
            } else if (event.key === 'y' || event.key === 'Y') {
                this.redoClicked();
            }
        } else if (event.key === 'e' || event.key === 'E') {
            this.editModeClicked();
        }
    }

    editModeClicked() {
        this.setState({pencil: !this.state.pencil});
    }

    clearClicked() {
        this.changeSquare((square) => {square.clear();});
    }

    render() {
      return (
        <div className="game" onKeyDown={(event) => this.handleKeyDown(event)}>
          <Menu newGame={(difficulty) => {this.newGame(difficulty);}}/>
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
        </div>
      );
    }
  }
  
  // ========================================
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  