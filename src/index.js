function getTransposeToSquare(matrix) {
  let clone = [];
  matrix.forEach( (el) => {
    clone.push(el.slice());
	});
	
	let str = [], matrix_square = [];
	let p = 0, n = 0; m = 0;
	while (m < 3) {
		while (n < 3) {
			while (p < 3) { 
				str = str.concat(clone[p].splice(0, 3));
				p++;
			}
			matrix_square.push(str);
			str = [];
			p = 0;
			n++;
		}
		clone.splice(0, 3);
		n = 0;
		m++;
	}     
	return matrix_square;
}

function getRow(i, matrix) {
	let count = 0, row = [];
	while (count < 9) {
		row.push(matrix[i][count]);
		count++;
	}
	return row;
}

function getColumn(j, matrix) {
	let count = 0, column = [];
	while (count < 9) {
		column.push(matrix[count][j]);
		count++;
	}
	return column;
}

function getSquare(i , j, matrix) {
	let number_square = 0;
	let index = Math.floor(i / 3) + Math.floor(j / 3);
	let set1 = new Set([0,1,2]),
			set2 = new Set([3,4,5]),
			set3 = new Set([6,7,8]);
  if (set1.has(i)) {
    number_square = index;
  } else if (set2.has(i)) {
    number_square = index + 2;
  } else if (set3.has(i)) {
    number_square = index + 4;
  }
	return number_square;
}

function main(matrix) {
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] == 0) {
				let numbers = [], uniq = [];
				let model = [1,2,3,4,5,6,7,8,9];
				let row = getRow(i, matrix);
				let column = getColumn(j, matrix);
				let square = getTransposeToSquare(matrix);
        let index = getSquare(i , j, matrix);
        square = square[index];			
				numbers = numbers.concat(row, column, square).sort();
				for (let n = 0; n < numbers.length; n++) {
					if (!uniq.includes(numbers[n])) {
						uniq.push(numbers[n]);
					} 
				}
				uniq.shift();	
				model = model.filter( (el) => {
					return !uniq.includes(el);
				});
				for (let k = 0; k < model.length; k++) {
					matrix[i][j] = model[k];
					if (main(matrix)) return main(matrix);				
				}
				matrix[i][j] = 0;
				return false;
			}
		}
	}
	return matrix;
}

module.exports = function solveSudoku(matrix) {
  return main(matrix);
}
