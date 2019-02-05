import {gameSquare, gameBoard} from './game.js';

it('Neighbors', () => {
    const board = new gameBoard();
    const neighbors = board.neighbors(0, 0);
    const expected = [
        // The square
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 2},
        {x: 2, y: 2},
        // The x line
        {x: 0, y: 3},
        {x: 0, y: 4},
        {x: 0, y: 5},
        {x: 0, y: 6},
        {x: 0, y: 7},
        {x: 0, y: 8},
        // The y line
        {x: 3, y: 0},
        {x: 4, y: 0},
        {x: 5, y: 0},
        {x: 6, y: 0},
        {x: 7, y: 0},
        {x: 8, y: 0},
    ]
    neighbors.forEach((item) => {
        const coordinate = {x: item.x, y: item.y};
        let found = false;
        expected.forEach((possible) => {
            if (possible.x === coordinate.x && possible.y === coordinate.y) {
                found = true;
            }
        })
        expect(found).toBeTruthy();
    })
});