// 타입 호환
// 내부적으로 존재하고 있는 속성과 타입에 대한 정의로 비교됨

// 인터페이스
interface Developer12 {
  name: string;
  skill: string;
}

class Person12 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

let developer12: Developer12;
let person12: Person12;

function newFunction1() {
  // person12보다 developer12가 구조적으로 속성이 더 있기 때문에 호환이 안됨
  // developer12 = person12;

  // person12는 developer12 속성을 가지고 있기 때문에 호환이 됨
  person12 = developer12;
}

// 함수
const add12 = function (a: number) {
  // nothing
};

let sum12 = function (a: number, b: number) {
  // nothing
};

// add12은 sum12와 달리 하나의 인자만 되기 때문에 호환이 안됨
// add12 = sum12;

// sum12은 두개의 인자를 받을 수 있기 때문에 호환이 됨
sum12 = add12;

// 제네릭
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Empty12<T> {
  // nothing
}

let empty1: Empty12<string>;
let empty2: Empty12<number>;

function newFunction2() {
  // 속성과 타입이 없어서 둘 다 호환이 되는듯?
  empty1 = empty2;
  empty2 = empty1;
}

interface NotEmpty12<T> {
  data: T;
}

let notEmpty1: NotEmpty12<string>;
let notEmpty2: NotEmpty12<number>;

function newFunction3() {
  // 제네릭의 타입이 틀리기 떄문에 둘 다 호환이 안됨
  // notEmpty1 = notEmpty2;
  // notEmpty2 = notEmpty1;
}
