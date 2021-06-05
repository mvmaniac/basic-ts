/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
interface IPlayer {
  hero: HTMLDivElement;
  deck: HTMLDivElement;
  field: HTMLDivElement;
  cost: HTMLDivElement;
  deckData: Sub[];
  heroData: Hero | null;
  fieldData: Sub[];
  chosenCard: HTMLDivElement | null; // 선택한 카드 DIV
  chosenCardData: Card | null; // 선택한 카드 data
}

const opponent: IPlayer = {
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};

const me: IPlayer = {
  hero: document.getElementById('my-hero') as HTMLDivElement,
  deck: document.getElementById('my-deck') as HTMLDivElement,
  field: document.getElementById('my-cards') as HTMLDivElement,
  cost: document.getElementById('my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};

interface Card {
  att: number;
  hp: number;
  mine: boolean;
  field?: boolean;
  cost?: number;
}

class Hero implements Card {
  public att: number;

  public hp: number;

  public mine: boolean;

  public field: boolean;

  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.mine = mine;
    this.field = true;
  }
}

class Sub implements Card {
  public att: number;

  public hp: number;

  public mine: boolean;

  public field: boolean;

  public cost: number;

  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.mine = mine;
    this.field = false;
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
}

function isSub(data: Card): data is Sub {
  return !!data.cost;
}

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; // true면 내 턴, false면 상대 턴

function createDeck({mine, count}: {mine: boolean; count: number}) {
  const player = mine ? me : opponent;

  for (let i = 0; i < count; i += 1) {
    player.deckData.push(new Sub(mine));
  }

  redrawDeck(player);
}

function redrawDeck(target: IPlayer) {
  const draftTarget = target;

  if (!draftTarget.deckData) {
    throw new Error('deckData가 없습니다');
  }

  draftTarget.deck.innerHTML = '';

  target.deckData.forEach((data) => {
    connectCardDOM({data, DOM: target.deck});
  });
}

function createHero({mine}: {mine: boolean}) {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);

  connectCardDOM({data: player.heroData, DOM: player.hero, hero: true});
}

function redrawHero(target: IPlayer) {
  const draftTarget = target;

  if (!draftTarget.heroData) {
    throw new Error('heroData가 없습니다');
  }

  draftTarget.hero.innerHTML = '';

  connectCardDOM({
    data: draftTarget.heroData,
    DOM: draftTarget.hero,
    hero: true
  });
}

function redrawField(target: IPlayer) {
  const draftTarget = target;

  if (!draftTarget.fieldData) {
    throw new Error('fieldData가 없습니다');
  }

  draftTarget.field.innerHTML = '';

  target.fieldData.forEach((data) => {
    connectCardDOM({data, DOM: target.field});
  });
}

function redrawScreen({mine}: {mine: boolean}) {
  const player = mine ? me : opponent;
  redrawField(player);
  redrawDeck(player);
  redrawHero(player);
}

function connectCardDOM({
  data,
  DOM,
  hero = false
}: {
  data: Card;
  DOM: HTMLDivElement;
  hero?: boolean;
}) {
  const cardEl = document
    .querySelector('.card-hidden .card')!
    .cloneNode(true) as HTMLDivElement;

  cardEl.querySelector('.card-att')!.textContent = data.att.toString();
  cardEl.querySelector('.card-hp')!.textContent = data.hp.toString();

  if (hero) {
    (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display =
      'none';

    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.appendChild(name);
  } else {
    (cardEl.querySelector('.card-cost') as HTMLDivElement).textContent =
      data.hp.toString();
  }

  cardEl.addEventListener('click', () => {
    if (isSub(data) && data.mine === turn && !data.field) {
      // 자신의 덱에 있는 쫄병이면
      if (!deckToField({data})) {
        // 쫄병을 하나 뽑았으면
        // 덱에 새로운 병사 추가
        createDeck({mine: turn, count: 1});
      }
    }

    turnAction({cardEl, data});
  });

  DOM.appendChild(cardEl);
}

function deckToField({data}: {data: Sub}): boolean {
  const target = turn ? me : opponent;
  const currentCost = Number(target.cost.textContent);

  if (currentCost < data.cost) {
    alert('코스트가 모자릅니다.');
    return true;
  }

  const draftData = data;
  draftData.field = true;

  const index = target.deckData.indexOf(draftData);
  target.deckData.splice(index, 1);
  target.fieldData.push(draftData);

  redrawDeck(target);
  redrawField(target);

  target.cost.textContent = (currentCost - data.cost).toString(); // 남은 코스트 줄이기
  return false;
}

function turnAction({cardEl, data}: {cardEl: HTMLDivElement; data: Card}) {
  const team = turn ? me : opponent; // 지금 턴의 편
  const enemy = turn ? opponent : me; // 그 상대 편

  if (cardEl.classList.contains('card-turnover')) {
    // 턴이 끝난 카드면 아무일도 일어나지 않음
    return;
  }

  const draftData = data;
  const enemyCard = turn ? !draftData.mine : draftData.mine;

  if (enemyCard && team.chosenCardData) {
    // 선택한 카드가 있고 적군 카드를 클릭한 경우 공격 수행
    draftData.hp -= team.chosenCardData.att;
    if (data.hp <= 0) {
      // 카드가 죽었을 때
      if (isSub(data)) {
        // 쫄병이 죽었을 때
        const index = enemy.fieldData.indexOf(data);
        enemy.fieldData.splice(index, 1);
      } else {
        // 영웅이 죽었을 때
        alert('승리하셨습니다!');
        init();
      }
    }
    redrawScreen({mine: !turn}); // 상대 화면 다시 그리기

    if (team.chosenCard) {
      // 클릭 해제 후 카드 행동 종료
      team.chosenCard.classList.remove('card-selected');
      team.chosenCard.classList.add('card-turnover');
    }

    team.chosenCard = null;
    team.chosenCardData = null;

    return;
  }

  if (enemyCard) {
    // 상대 카드면
    return;
  }

  if (draftData.field) {
    // 카드가 필드에 있으면
    // 영웅 부모와 필드카드의 부모가 다르기때문에 document에서 모든 .card를 검색한다
    // 카드.parentNode.querySelectorAll('.card').forEach(function (card) {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('card-selected');
    });

    console.log(cardEl);

    cardEl.classList.add('card-selected');

    team.chosenCard = cardEl;
    team.chosenCardData = draftData;
  }
}

turnButton.addEventListener('click', () => {
  const target = turn ? me : opponent;

  document.getElementById('rival')!.classList.toggle('turn');
  document.getElementById('my')!.classList.toggle('turn');

  redrawField(target);
  redrawHero(target);

  turn = !turn; // 턴을 넘기는 코드

  if (turn) {
    me.cost.textContent = '10';
  } else {
    opponent.cost.textContent = '10';
  }
});

function init() {
  [opponent, me].forEach((item) => {
    const draftItem = item;
    draftItem.deckData = [];
    draftItem.heroData = null;
    draftItem.fieldData = [];
    draftItem.chosenCard = null;
    draftItem.chosenCardData = null;
  });

  createDeck({mine: true, count: 5});
  createDeck({mine: false, count: 5});

  createHero({mine: true});
  createHero({mine: false});

  redrawScreen({mine: true});
  redrawScreen({mine: false});
}

init();
