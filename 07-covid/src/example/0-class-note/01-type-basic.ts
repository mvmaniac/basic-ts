/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */

// TS 문자열
const str: string = 'hello';

// TS 숫자
const num: number = 10;

// TS 배열
const arr: Array<number> = [1, 2, 3];
const heroes: Array<string> = ['Capt', 'Thor', 'Hulk'];
const items: number[] = [1, 2, 3];

// TS 튜플 (간단하게 모든 인덱스에 타입이 정의되어 있는 배열)
const address: [string, number] = ['gangnam', 10];

// TS 객체
const obj: object = {};

// const person: object = {
//   name: 'Capt',
//   age: 100
// };

const person: { name: string; age: number } = {
  name: 'Capt',
  age: 100
};

// TS 진위값
const show: boolean = true;
