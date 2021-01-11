// 타입 단언 (type assertion)
let a10;
a10 = 20;
a10 = 'a';

// 맨 마지막 타입은 string으로 추론이 됨
// 다만 추론이 되지않아 any나 에러가 날 경우 as 써서 타입을 단언 할 수 있음
const b10 = a10 as string;

// DOM API 조작
// <div id='app'>hi</div>

// 개발자 기준으로 아래 코드에 값이 당연히 있겠지만
// 타입 관점에서는 null 일 수 있기 때문에 null 이 아니라는것을 보장해주어야 함
const div = document.querySelector('div') as HTMLDivElement;

// 아래처럼 if 문으로 방어코드를 넘어주던가 아니면  위에 처럼 as 키워드로 타입 단언을 사용
// if (div) {
//   div.innerHTML = 'a';
// }
