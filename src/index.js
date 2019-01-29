import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
  
class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderSquare(x, y) {
        return <Square x={x} y={y}/>;
    }
      
    render() {
        return (<div className="grid">
          <div className="grid-row">
            {this.renderSquare(0, 0)}
            {this.renderSquare(0, 1)}
            {this.renderSquare(0, 2)}
          </div>
          <div className="grid-row">
            {this.renderSquare(1, 0)}
            {this.renderSquare(1, 1)}
            {this.renderSquare(1, 2)}
          </div>
          <div className="grid-row">
            {this.renderSquare(2, 0)}
            {this.renderSquare(2, 1)}
            {this.renderSquare(2, 2)}
          </div>
        </div>
        );
    }
  }
  class Board extends React.Component {
    renderGrid(x, y) {
        return (<Grid x={x} y={y}/>);
      }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderGrid(0, 0)}
            {this.renderGrid(0, 1)}
            {this.renderGrid(0, 2)}
          </div>
          <div className="board-row">
            {this.renderGrid(1, 0)}
            {this.renderGrid(1, 1)}
            {this.renderGrid(1, 2)}
          </div>
          <div className="board-row">
            {this.renderGrid(2, 0)}
            {this.renderGrid(2, 1)}
            {this.renderGrid(2, 2)}
          </div>
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
  