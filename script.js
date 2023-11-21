'use strict';

const getBorder = () => {
  console.log('===========');
};

const task1 = (a,b,c) => (a - b) / c;

console.log(task1(9,1,2));
getBorder();

const task2 = (a) => [Math.pow(a,2), Math.pow(a,3),];

console.log(task2(3));
getBorder();

const task3 = (a,b) => [`меньшее: ${Math.min(a,b)}`, `большее: ${Math.max(a,b)}`];

console.log(task3(1,2));
getBorder();

const isEven = (num) => num % 2 === 0;

console.log(isEven(3));
getBorder();

const task6 = (arr) => arr.filter(item => isEven(item));

console.log(task6([4,8,15,16,23,42]));
getBorder();

const task7 = (char, customChar) => {
  if ([1,2,3,4,5,6,7,8,9].includes(char)) {
    const isCustomCharExists = ![undefined, ' '].includes(customChar);

    for (let i = 1; i <= char; i++) {
      const arr = [];
      for (let j = 0; j < i; j++) {
        arr.push(isCustomCharExists ? customChar : i);
      }
      console.log(arr.join(''));
    }
  }
}

task7(8, '$');
getBorder();

const task8 = (height, isReverse = false) => {
  {
    const width   = height * 2 - 1;
    const center  = Math.floor((width / 2));
    const mainArr = [];
  
    for (let i = 0; i < height; i++) {
      const arr = [];
      
      for (let j = 0; j < width; j++) {
        if ((j < center - i) || (j > center + i)) {
          arr.push(' ');
          continue
        }
        arr.push('*');
      }
      mainArr.push(arr);
    }

    if (isReverse) mainArr.reverse();
  
    mainArr.forEach(row => {
      console.log(row.join(' '));
    })
  }
}


task8(8, true);
getBorder();

const task9 = (fibArr = [0, 1]) => {
  const fibLength = fibArr.length;
  const nexNum    = fibArr[fibLength - 1] + fibArr[fibLength - 2];

  if (nexNum > 1000) return fibArr;
  fibArr.push(nexNum);
  
  return task9(fibArr);
}

console.log(task9());
getBorder();

const task10 = (num) => {
  const sum = String(num).split('').map(item => +item).reduce((accum, item) => accum += item);
  return sum > 9 ? task10(sum) : sum;
}

console.log(task10(99));
getBorder();

const task11 = (arr) => {
  arr[0] && console.log(arr[0]);

  return arr.length ? task11(arr.slice(1)) : 'done';
}

console.log(task11([1,2,3,4,5,6]));
getBorder();

const task12 = () => {
  const name        = 'Роман';
  const surname     = 'Русак';
  const patronymic  = 'Сергеевич';
  const groupNumber = 'FE127';
  const firstLine   = 'Домашняя работа «Функции»';
  const secondLine  = `Выполнил студент группы ${groupNumber}`;
  const thirdLine   = [name,surname,patronymic].join(' ');
  const borderTop   = '';
  const borderBot   = '';
  const borderChar  = '*';

  const addChar = (lines, char = ' ', max) => { // видимо я неправильно логику заложил изначально в эту функцию и получилось какое-то чудовище =(
    const getMaxLengStr = (lines) => Math.max(...lines);

    const maxLength = max ? max : getMaxLengStr(lines.map(item => item.length)); //если на текущий момент не знаю самую длинную строке,то нахожу

    const updateLines = lines.map(item => { 
      //Добавляю необходимый символ, что бы длина выровнялась с самой длинной переданной строкой
      if (item.length < maxLength) {
        const newItem = item.split('');
        for (let i = newItem.length; i < maxLength; i++) newItem.push(char);

        return newItem.join('');
      }
      return item;
    })
    return !max ? [updateLines, maxLength] : updateLines; // если в функцию не передавалась длина самой длинной строки, то я ее находил внутри функцию и возвращаю, если передавалась то только новые строки верну
    
  }
  
  const [updateLines, maxLength] = addChar([firstLine, secondLine, thirdLine], ' ');
  const updateBorders = addChar([borderTop, borderBot], borderChar, maxLength);
  
  [updateBorders[0], updateLines[0], updateLines[1], updateLines[2], updateBorders[1]].forEach(line => {
    console.log(borderChar + line + borderChar);
  })
}

task12();