'use strict';

const border = '==========';

{
  console.log('задача 1');
  for (let i = 1; i <= 50; i++) console.log(i);

  console.log('');

  for (let i = 35; i >= 8; i--) console.log(i);
  console.log(border);
}

{
  console.log('задача 2\nвыведена на страницу');

  let i = 89;

  while (i >= 11) {
    const span = document.createElement('span');
    span.innerHTML = `${i}<br>`;
    document.body.append(span);
    i--;
  }

  console.log(border);
}

{
  console.log('задача 3');
  let sum = 0;

  for (let i = 0; i <= 100; i++) sum += i;

  console.log(sum);
  console.log(border);
}

{
  console.log('задача 4');
  for (let i = 1; i <= 5; i++) {
    let sum = 0;
    for (let j = 1; j <= i; j++) {
      sum += j;
    }
    console.log(`сумма чисел числа ${i} равна ${sum}`);
  }

  console.log(border);
}

{
  console.log('задача 5');
  const min = 8;
  const max = 56;
  let   i   = min;

  for (let i = min; i <= max; i++) {
    (i % 2 === 0) && console.log(i);
  }

  while (i <= max) {
    (i % 2 === 0) && console.log(i);
    i++;
  }

  console.log(border);
}

{
  console.log('задача 6');
  for (let i = 2; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      console.log(`${i} * ${j} = ${i * j}`);
    }
    i < 10 && console.log('...');
  }

  console.log(border);
}

{
    console.log('задача 7');
    let n   = 1000;
    let num = 0;

    while (true) {
        if (n / 2 < 50) break;
        n /= 2;
        num++;
    }
    console.log(`получится число ${n}, для этого потребуется ${num} итераций`);
    console.log(`не совсем понял условие, потребуется ${num} итерации, при следующем делении результат будет меньше 50`)
    console.log(border);
}

{
  console.log('задача 8');
  const flag = false;

  if (flag) {
    
      //что бы промпты не надоедали
      let sum     = 0;
      let counter = 0;

      while (true) {
        const val = prompt('введите число');
        if (!+val) {
          if (Number.isNaN(+val)) {
            alert('вы ввели не число!');
            continue;
          }
          console.log(`сумма равна ${sum}`);
          console.log(`среднее арифметическое ${sum ? sum / counter : 0}`);
          break;
        }
    
        sum += +val;
        counter++;
    }
  }
  !flag && console.log('промпты надоели)');
  console.log(border);
}

{
  console.log('задача 9');
  // Попробовал сделать задачу без конвертации в массив
  const str = ' 4 98 4 6 1 32 4 65 4 3 5 7 89 7 10 1 36 8 57';
  let   min = Infinity;
  let   max = -Infinity;

  for (let i = 0; i < str.length; i++) {
    if ((str[i] === ' ' && i != 0) || i === str.length - 1) {
      // Если дохожу до пробела или конца строки, то иду циклом в обратном порядке до другого пробела или начала строки

      let revNumberStr = '';
      let numberStr    = '';

      for (let j = i - 1; true; j--) {
        //складываю перевернутое число в переменную revNumberStr

        if (!str[j] || j === 0 || str[j] === ' ') break; // если пробел был нулевым символом или дохожу до другого пробела, то выхожу из цикла
        revNumberStr += str[j];
      }

      if (revNumberStr.length > 1) {
        // если в перевернутом числе больше 1 разряда, то назад переворачиваю
        for (let j = revNumberStr.length - 1; j >= 0; j--) {
          numberStr += revNumberStr[j];
        }
      } else numberStr = revNumberStr;

      if (+numberStr > max) {
        max = +numberStr;
      }

      if (+numberStr < min) {
        min = +numberStr;
      }
    }
  }

  console.log((min !== Infinity && max !== -Infinity) ? `минимальное число: ${min}, максимальное число: ${max}` : 'некорректные данные');
  console.log(border);
}

{
    console.log('задача 10');
    let n = 12345;

    for (let i = 0; i < n.toString().length; i++) {
        console.log(+n.toString()[i]);
    }
    console.log(border);

    console.log(`в числе n ${n.toString().length} цифр`);
    console.log(border);

    {
        let sum = 0;    
        for (let i = 0; i < n.toString().length; i++)
        sum += +n.toString()[i];

        console.log(`сума цифр числа ${n} равна ${sum}`);
    }
    console.log(border);

    {   
        const nClone = n.toString();
        let nRev = '';

        for (let i = nClone.length - 1; i >= 0; i--) nRev += nClone[i];
        
        console.log(nRev);
    }
}
