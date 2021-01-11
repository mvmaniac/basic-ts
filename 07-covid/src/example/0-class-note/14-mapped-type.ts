type Heroes = 'Hulk' | 'Capt' | 'Thro';
type HeroAges = {[K in Heroes]: number};

// Heroes 타입 값이 키값이 됨
const ages: HeroAges = {
  Hulk: 33,
  Capt: 100,
  Thro: 1000
};
