interface RPS {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

const rps: RPS = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: '-284px'
};

const score = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1
} as const;

let coords: RPS[keyof RPS] = '0';
let point = 0;
let interval: number;

function computerChoice(coords: RPS[keyof RPS]): keyof RPS {
  return (
    (Object.keys(rps) as ['ROCK', 'SCISSORS', 'PAPER']).find(
      (key) => rps[key] === coords
    ) ?? 'ROCK'
  );
}

function intervalMaker() {
  interval = setInterval(() => {
    if (coords === rps.ROCK) {
      coords = rps.SCISSORS;
    } else if (coords === rps.SCISSORS) {
      coords = rps.PAPER;
    } else {
      coords = rps.ROCK;
    }

    (
      document.querySelector('#computer') as HTMLDivElement
    ).style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${coords} 0`;
  }, 100);
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener(
    'click',
    function clickHandler(this: HTMLButtonElement) {
      clearInterval(interval);
      setTimeout(intervalMaker, 2000);

      const myChoice = this.getAttribute('id') as keyof RPS;
      const myScore = score[myChoice];
      const computerScore = score[computerChoice(coords)];
      const diff = myScore - computerScore;

      if (diff === 0) {
        console.log('비겼습니다');
      } else if ([-1, 2].includes(diff)) {
        console.log('이겼습니다!');
        point += 1;
      } else {
        console.log('졌습니다 ㅠㅠ');
        point -= 1;
      }

      (document.querySelector('#point') as HTMLDivElement).textContent =
        point.toString();
    }
  );
});

intervalMaker();
