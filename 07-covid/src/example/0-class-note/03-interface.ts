/* eslint-disable prefer-const */

interface User {
  age: number;
  name: string;
}

// 변수에 인터페이스 활용
const peter3: User = {
  age: 33,
  name: '피터',
};

// 함수에 인터페이스 활용
function getUser(user: User) {
  console.log(user);
}

// User 인터페이스 속성 규칙에 맞으면 됨
const capt3 = {
  age: 33,
  name: '캡틴',
};

getUser(capt3);

// 함수의 스펙(구조)에 인터페이스를 활용
interface SumFunction {
  (a: number, b: number): number;
}

let sumFn: SumFunction;
sumFn = function (a: number, b: number): number {
  return a + b;
};

// 인덱싱
interface StringArray {
  [index: number]: string;
}

const stringArray: StringArray = ['a', 'b', 'c'];

// 딕셔너리 패턴
interface StringRegexDictionary {
  [key: string]: RegExp;
}

const sringRegEx: StringRegexDictionary = {
  cssFile: /\.css$/,
  jsFile: /\.js$/,
};

// 인터페이스 확장
interface Person3 {
  name: string;
  age: number;
}

interface Developer3 extends Person3 {
  language: string;
}

const dev: Developer3 = {
  language: 'ts',
  age: 100,
  name: '캡틴',
};
