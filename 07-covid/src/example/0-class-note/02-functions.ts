// 함수의 파라미터에 타입을 정희하는 방식
// function sum(a: number, b: number) {
//   return a + b;
// }
// sum(10, 20);

// 함수의 반환 값에 타입을 정의하는 방식
function add(): number {
  return 10;
}

// 함수에 타입을 정의하는 방식
function sum(a: number, b: number): number {
  return a + b;
}
sum(10, 20);
// sum(10, 20, 30, 40); // 기본 js와 다르게 파라미터 갯수가 맞지않아 에러남

// 함수의 옵셔널 파라미터
// 아니면 기본값 매개변수 값을 주면 될 듯?
function log(a: string, b?: string, c?: string) {}

log('hello world');
log('hello world', '2');
