import { sudoku } from './tpl/sudoku.js';

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function gameGeneratorFromDifficulty(board, difficulty) {
    if (difficulty === 'test') {
        testGenerator(board);
    } else {
        const difficultyRange = {
            'easy': [51, 61],
            'medium': [40, 50],
            'difficult': [26, 39],
            'insane': [17, 25]
        }[difficulty];
        const min = difficultyRange[0];
        const max = difficultyRange[1];
        const difficultyNumber = randomRange(min, max);
        // just use a test one for now.
        const stringFormatBoard = sudoku.generate(difficultyNumber);
        stringFormatToBoard(stringFormatBoard, board);
    }
}

function stringFormatToArray(string) {
    if (string.length !== 81) {
        throw Error('Invalid string input.')
    }
    const convert = (item) => {
        if (item === '.') {
            return null;
        }
        const number = parseInt(item);
        return number;
    }
    const array = string.split('').map(convert);
    if (array.length !== 81) {
        throw Error('Poorly formed array output, not length 81.')
    }
    return array;
}

function stringFormatToBoard(stringFormatBoard, board) {
    const solution = sudoku.solve(stringFormatBoard);
    if (!solution) {
        throw Error('Sudoku was unsolvable')
    }
    const solutionArray = stringFormatToArray(solution);
    const displayArray = stringFormatToArray(stringFormatBoard);
    board.setSudoku(solutionArray, displayArray);
}

function testGenerator(board) {
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
    board.setSudoku(trueValues, displayValues);
}

class gameSquare {
    constructor(numberGuessedCallback, x, y) {
        this.numberGuessedCallback = numberGuessedCallback;
        this.displayValue = null;
        this.trueValue = null;
        this.starting = null;
        this.notes = [];
        this.x = x;
        this.y = y;
    }

    copyValuesFrom(other) {
        this.displayValue = other.displayValue;
        this.trueValue = other.trueValue;
        this.notes = other.notes.slice();
        this.starting = other.starting;
    }

    clear() {
        this.displayValue = null;
        this.notes = [];
    }

    note(i) {
        if (i in this.notes) {
            this.notes.splice(this.notes.indexOf(i), 1);
        } else {
            this.notes.push(i);
        }
    }

    numberGuessed(i) {
        this.displayValue = i;
        this.numberGuessedCallback(this.x, this.y, i);
    }

    eliminate(i) {
        const index = this.notes.indexOf(i);
        if (index > -1) {
            this.notes.splice(index, 1);
        }
    }
}

export class gameBoard {
    constructor() {
        this.array = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.array.push(new gameSquare((x, y, i) => {this.numberGuessed(x, y, i);}, j, i));
            }
        }
    }

    neighbors(x, y) {
        const neighbors = [];
        const columnStart = 3 * Math.floor(x / 3);
        const rowStart = 3 * Math.floor(y / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                neighbors.push(this.square(rowStart + i, columnStart + j));
            }
        }
        for (let i = 0; i < 9; i++) {
            // This will currently add the row/column it shares in it's square twice. Probably OK.
            neighbors.push(this.square(i, x));
            neighbors.push(this.square(y, i));
        }
        return neighbors;
    }    

    numberGuessed(x, y, i) {
        const neighbors = this.neighbors(x, y);
        neighbors.forEach(square => {
            square.eliminate(i);
        });
    }

    usedNumbers() {
        const numbers = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9:0};
        this.array.forEach((square) => {
            const displayValue = square.displayValue;
            if (displayValue) {
                numbers[displayValue] += 1;
            }
        })
        const used = [];
        for (let i = 1; i < 10; i++) {
            if (numbers[i] >= 9) {
                used.push(i);
            }
        }
        return used;
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

    generate(difficulty) {
        gameGeneratorFromDifficulty(this, difficulty);
    }

    square(x, y) {
        if (0 > x || x > 8) throw Error('Wrong x coordinate: ' + x);
        if (0 > y || y > 8) throw Error('Wrong y coordinate: ' + y);
        const square = this.array[y * 9 + x];
        if (square.x !== x || square.y !== y) throw Error('Wrong square');
        return square;
    }
    
}

