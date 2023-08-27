// 타입 추론 기본 1
const a = 'abc';

// 타입을 명시하지 않아도 타입스크립트 내부적으로 타입을 추론 해줌
function getB(b = 10) {
  const c = 'hi';
  return b + c;
}

// 10 + '10'; // 1010

// 타입 추론 기본 2
// interface Dropdown<T> {
//   value: T;
//   title: string;
// }

// const shoppingItem: Dropdown<string> = {
//   value: 'abc',
//   title: 'hello'
// };

// 타입 추론 기본 3
interface Dropdown<T> {
  value: T;
  title: string;
}

interface DetailedDropdown<K> extends Dropdown<K> {
  description: string;
  tag: K;
}

const shoppingItem: Dropdown<string> = {
  value: 'abc',
  title: 'hello',
};

// value 속성은 string으로 타입 추론 됨
const detailedItem: DetailedDropdown<string> = {
  title: 'abc',
  description: 'ab',
  value: 'a',
  tag: 'a',
};

// Best Common Type
// 아래 타입은 number | boolean 으로 추론됨
const arr9 = [1, 2, true];
