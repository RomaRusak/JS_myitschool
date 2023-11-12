'use strict';

const border = '==========';

{
  console.log('задача 1');

  const arr = [1,2,3,4,5];

  for (let i = 0; i < arr.length; i++) console.log(arr[i]);
  console.log(border);
}

{
  console.log('задача 2');

  [-2, -1, -3, 15, 0, -4, 2, -5, 9, -15, 0, 4, 5, -6, 10, 7].forEach(item => (item > - 10 && item < 3) && console.log(item));
  console.log(border);
}

{
  console.log('задача 3');

  const arr = new Array;
  const min = 23;
  const max = 57;
  let   i   = 0;

  {
    for (let i = min; i <= max; i++) {
      arr.push(i);
      console.log(arr[arr.length - 1]);
    }
    console.log(border);
    
    while(i < arr.length) {
      console.log(arr[i]);
      i++;
    }
    console.log(border);
  }
}

{
  console.log('задача 4');

 ['10', '20', '30', '50', '235', '3000'].forEach(item => ['1', '2', '3'].includes(item[0]) && console.log(item));
 console.log(border);
}

{
  console.log('задача 5');

  ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВСК'].forEach(item => {
    if (['СБ', 'ВСК'].includes(item)) {
      const day = document.createElement('p');
      day.innerText = item;
      day.setAttribute('style', 'font-weight: bold;');
      document.body.append(day);
    }
  });
  console.log('вывел в документ');
  console.log(border);
}

{
  console.log('задача 6');

  const arr = [1,2,3,4,5];
  arr.push(6);

  console.log(arr[arr.length - 1]);
  console.log(border);
}

{
  console.log('задача 7');
  const flag = false;
  if (flag) {
    const arr = new Array;
  
    while(true) {
      const data = prompt('введите число');
  
      if (data === '') {
        console.log(arr);
        arr.sort((a, b) => a - b);
        console.log(arr);
        break
      }
      const val = +data;
  
      if (!Number.isNaN(val)) {
        arr.push(val);
        continue
      }
      
      alert('вы ввели не число!');
    }
  }
  !flag && console.log('надоели промпты');
  console.log(border);
}

{
  console.log('задача 8');
  const arr = [12, false, 'Текст', 4, 2, -5, 0];
  let i = 0;

  while(i < 1) { // не очень правда понимаю зачем while)
    arr.reverse();
    i++
  }
  console.log(arr);
}

{
  console.log('задача 9');
  const arr = [5,9,21,,,9,78,,,,6];
  console.log(arr.length - arr.filter(item => item !== undefined).length);
  console.log(border);
}

{
  console.log('задача 10');
  const arr = [1,8,0,13,76,8,7,0,22,10,2,3,0,2];

  if (arr.filter(item => item === 0).length < 2) {
    console.log(0)
  } else {
    const firstZeroIndex = arr.findIndex((item) => item === 0);
    const lastZeroIndex  = arr.findLastIndex((item) => item === 0);
    
    const sum = arr.reduce((accum, item, index) => {
      return index >= firstZeroIndex && index <= lastZeroIndex ? accum += item : accum;
    }, 0)
    console.log(sum);
    console.log(border);
  }
}

{
  const flag = false;

  if (flag) {
    const height  = +prompt('высота треугольника');
    const width   = height * 2 - 1;
    const center  = Math.floor((width / 2));
    const mainArr = new Array;

    if (height) {
      for (let i = 0; i < height; i++) {
        const arr = new Array;
        
        for (let j = 0; j < width; j++) {
          if ((j < center - i) || (j > center + i)) {
            arr.push(' ');
            continue
          }
          arr.push('*');
        }
        mainArr.push(arr);
      }
    
      mainArr.forEach(row => {
        console.log(row.join(' '));
      })
    } else alert('введите число')
    

  }
}