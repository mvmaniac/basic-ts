interface Developer11 {
  name: string;
  skill: string;
}

interface Person11 {
  name: string;
  age: number;
}

function introduce(): Developer11 | Person11 {
  return {name: 'Tony', age: 33, skill: 'Iron Marking'};
}

const tony = introduce();

// 유니온 타입이라서 공통된 속성인 name 속성만 접근 가능함
// console.log(tony.skill); // skill인 경우 에러 남

// 아래와 같이 타입 단언으로 속성 값을 가져올 수 있음
if ((tony as Developer11).skill) {
  const {skill} = tony as Developer11;
  console.log(skill);
} else if ((tony as Person11).age) {
  const {age} = tony as Person11;
  console.log(age);
}

// 타입 가드 정의
function isDeveloper(target: Developer11 | Person11): target is Developer11 {
  return (target as Developer11).skill !== undefined;
}

// 타입 가드 사용
if (isDeveloper(tony)) {
  console.log(tony.skill);
} else {
  console.log(tony.age);
}
