/* 
Author: Adam Hall
Date: Feb 7th, 2022
Purpose: To create a program that creates a spiral based on user input. Instructions here: https://gist.github.com/papaver/1c31af91a299f4c66c531070c5e5e0d4
*/

const myArg = process.argv.slice(2)//get input from the console
Main()

function Main() {//what actually runs it
    checkArg() 
    let input = Math.floor(parseInt(myArg))//Here I chose to catch any decimal value and round down instead of sending an Error. 
    console.log(`You chose: ${input}`)
    let matrix = createMatrixArray(input)//create array
    fillSpiral(matrix)//create the spiral
    printMatrixArray(matrix)//print array
}

function createMatrixArray(n) {//creates the matrix used, takes the size as n
    const matrix = [];//create matrix
    for (let i = 0; i < n; i++) {//fill the matrix with n lines.
        matrix.push(new Array(n).fill(' '));
    }
    return matrix;
}

function fillSpiral(matrix){
    matrix[0][0] = '*'//intialize the first value, (otherwise I would have an extra assignment operation each time the spiral turns).
    fillSpiralHelper(matrix, 0, matrix.length, 0, 0)//intialize the recursice call (using tail recursion)
}

function fillSpiralHelper(matrix, direction, n, x, y){//direction represents which way to go. 0 = east, 1 = south, 2 = west, 3 = north. It is designed to be used with mod 4 to loop around.
    //Base Case
    if(n === 0)
        return
    //Body
    let count = n - 1;
    let xIncrement = 0;
    let yIncrement = 0;
    switch(direction%4){
        case 0:
            xIncrement = 1;
            break;
        case 1:
            yIncrement = 1;
            break;
        case 2:
            xIncrement = -1;
            break;
        case 3:
            yIncrement = -1;
            break;
    }
    if(yIncrement === 0){
        while(count > 0){
            x += xIncrement;
            matrix[y][x] = '*';
            count -= 1
        }
    } else {
        while(count > 0){
            y += yIncrement;
            matrix[y][x] = '*';
            count -= 1
       }
    }
    fillSpiralHelper(matrix, direction + 1, n - 1, x, y)//calls itself recursively, setting up the next line
}

function printMatrixArray(matrix){//prints the matrix array
    for(let i = 0; i < matrix.length; i++)
        console.log(matrix[i].join(" "))
}

function checkArg() {//checks that arguments are valid
    if (myArg.length !== 1 || isNaN(myArg) || parseInt(myArg) < 1){
            console.log('Please give one valid intergral value as argument after the file name in the console.\nExample: node genChainAdamHall.js 5')
            process.exit(1)
    }
}


