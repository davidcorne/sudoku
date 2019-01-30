import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class gameSquare {
    constructor(grid) {
        this.grid = grid;
        this.value = null;
        this.trueValue = null;
    }
}

class gameGrid {
    constructor(board) {
        this.board = board;
        this.array = Array(9).fill(new gameSquare(this));
    }
}

class gameBoard {
    constructor() {
        this.array = Array(9).fill(new gameGrid(this));
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
        console.log(this.props)
      return (
        <button className="square">
          {this.props.x},{this.props.y}
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
        return (<Square x={x} y={y}/>);
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
  