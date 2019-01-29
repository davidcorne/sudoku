import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button className="square">
          {/* TODO */}
        </button>
      );
    }
  }
  
  class Grid extends React.Component {
    renderSquare(i) {
        return <Square />;
    }
      
    render() {
        return (<div className="grid">
          <div className="grid-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="grid-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="grid-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        );
    }
  }
  class Board extends React.Component {
    renderGrid(i) {
        return <Grid />;
      }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderGrid(0)}
            {this.renderGrid(1)}
            {this.renderGrid(2)}
          </div>
          <div className="board-row">
            {this.renderGrid(3)}
            {this.renderGrid(4)}
            {this.renderGrid(5)}
          </div>
          <div className="board-row">
            {this.renderGrid(6)}
            {this.renderGrid(7)}
            {this.renderGrid(8)}
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
  