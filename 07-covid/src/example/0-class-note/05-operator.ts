// function logMessage(value: any) {
//   console.log(value);
// }

// logMessage('hello');
// logMessage(100);

// 유니온 타입
function logMessage(value: string | number) {
  if (typeof value === 'number') {
    value.toLocaleString();
  }

  if (typeof value === 'string') {
    value.toString();
  }

  throw new TypeError('value must be string or number');
}

logMessage('hello');
logMessage(100);

const peter5: string | number | boolean = '';

interface Developer5 {
  name: string;
  skill: string;
}

interface Person5 {
  name: string;
  age: number;
}

function askSomeone1(someone: Developer5 | Person5) {
  console.log(someone.name);

  // 공통된 속성인 name 을 제외하고 나머지는 에러남
  // console.log(someone.age);
  // console.log(someone.skill);
}

// 인터페이스에 있는 속성만 있으면 됨
askSomeone1({ name: '디벨로퍼', skill: '웹 개발' });
askSomeone1({ name: '캡틴', age: 100 });

// 인터섹션 타입
// const capt5: string & number & boolean = ''; // string 이고 number 이고 boolean 인 값이 없기 때문에 에러남?

function askSomeone2(someone: Developer5 & Person5) {
  console.log(someone.name);

  // 유니온 타입과 다르게 모든 속성 포함
  console.log(someone.age);
  console.log(someone.skill);
}

// 유니온 타입과 다르게 호출 시 모든 속성이 있어야 되기 때문에 에러 남
// askSomeone2({name: '디벨로퍼', skill: '웹 개발'});
// askSomeone2({name: '캡틴', age: 100});
