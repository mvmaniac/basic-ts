// function logText(text) {
//   console.log(text);
//   return text;
// }

// logText('abd'); // 숫자 10
// logText(10); // 문자열 10
// logText(false); // 진위값 true

function logText<T>(text: T): T {
  console.log(text);
  return text;
}

logText<string>('abd'); // 숫자 10
logText<number>(10); // 문자열 10
logText<boolean>(false); // 진위값 true

// 인터페이스에 제넥릭을 선언하는 방법
interface DropdownItem1 {
  value: string;
  selected: boolean;
}

const dropdown1: DropdownItem1 = {
  value: 'abc',
  selected: true,
};

interface DropdownItem2<T> {
  value: T;
  selected: boolean;
}

const dropdown2: DropdownItem2<string> = {
  value: 'abc',
  selected: true,
};

// 제네릭의 타입제한
// 제네릭의 타입에 배열을 주어서 length 속성을 힌트를 볼 수 있음
// function logTextLength<T>(text: T[]): T[] {
//   console.log(text.length);
//   return text;
// }

// logTextLength<string>(['hi']);

// 제네릭의 타입제한 2 - 정의된 타입 이용하기
interface LengthType {
  length: number;
}

function logTextLength<T extends LengthType>(text: T): T {
  console.log(text.length);
  return text;
}

logTextLength<string>('hi');

// 제네릭의 타입제한 3 - keyof
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

// ShoppingItem의 속성의 key 값만 허용
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption;
}

// getShoppingItemOption(10);
// getShoppingItemOption<string>('a');
getShoppingItemOption('name');
