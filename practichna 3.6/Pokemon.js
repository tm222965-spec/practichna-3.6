import { generateLog } from './utils.js';

export class Pokemon {
  constructor({ name, hp, img, attacks, selectors }, selectorPrefix) {
    this.name = name;
    this.defaultHP = hp;
    this.damageHP = hp;
    this.img = img;
    this.attacks = attacks;
    this.selectorPrefix = selectorPrefix;
    this.elHP = document.getElementById(selectors.hp);
    this.elProgressbar = document.getElementById(selectors.progressbar);

    this.renderImg();
  }

  renderImg = () => {
    const $img = document.querySelector(`.pokemon.${this.selectorPrefix} .sprite`);
    if ($img && this.img) {
      $img.src = this.img;
    }
  };

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  };

  renderHPLife = () => {
    const { elHP, damageHP, defaultHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
  };

  renderProgressbarHP = () => {
    const { elProgressbar, damageHP, defaultHP } = this;
    const percentage = (damageHP / defaultHP) * 100;
    
    elProgressbar.style.width = `${percentage}%`;
    elProgressbar.classList.remove('low', 'critical');

    if (percentage < 20) {
      elProgressbar.classList.add('critical');
    } else if (percentage < 60) {
      elProgressbar.classList.add('low');
    }
  };

  changeHP = (count, target, onGameOver) => {
    if (this.damageHP < count) {
      this.damageHP = 0;
      alert(`Бедный ${this.name} проиграл бой!`);
      if (typeof onGameOver === 'function') {
        onGameOver();
      }
    } else {
      this.damageHP -= count;
    }

    this.renderHP();
    generateLog(this, target, count);
  };
}