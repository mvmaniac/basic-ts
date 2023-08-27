// 인터페이스
interface PersonI {
  name: string;
  age: number;
}

const p: PersonI = {
  name: 'p',
  age: 30,
};

// 타입 별칭
type PersonT = {
  name: string;
  age: number;
};

const t: PersonT = {
  name: 'p',
  age: 30,
};
