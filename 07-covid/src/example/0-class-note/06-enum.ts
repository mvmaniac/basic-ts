// 숫자형 이넘 (기본)
enum Shoes1 {
  Nike,
  Adidas,
}

const myShoes1 = Shoes1.Nike;
console.log(myShoes1); // 0이 출력됨

// 문자형 이넘
enum Shoes2 {
  Nike = '나이키',
  Adidas = '아디다스',
}

const myShoes2 = Shoes2.Nike;
console.log(myShoes1); // 나이키가 출력됨

// 예제
enum Answer {
  Yes = 'Y',
  No = 'N',
}

function askQuestion(answer: Answer) {
  if (answer === Answer.Yes) {
    console.log('정답입니다');
  }

  if (answer === Answer.No) {
    console.log('오답입니다');
  }
}

askQuestion(Answer.Yes);

// 이넘에서 제공하는 값이 아니기 때문에 에러남
// askQuestion('예스');
// askQuestion('Y');
// askQuestion('Yes');
