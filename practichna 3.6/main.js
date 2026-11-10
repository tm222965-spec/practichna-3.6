import { Pokemon } from './Pokemon.js';
import { random, createCountClick } from './utils.js';
import { pokemons } from './pokemons.js';

const randomPlayerIndex = random(pokemons.length) - 1;

let randomEnemyIndex;
do {
  randomEnemyIndex = random(pokemons.length) - 1;
} while (randomEnemyIndex === randomPlayerIndex);

const playerConfig = pokemons[randomPlayerIndex];
const enemyConfig = pokemons[randomEnemyIndex];

const character = new Pokemon({
  ...playerConfig,
  selectors: {
    hp: 'health-character',
    progressbar: 'progressbar-character',
  },
}, 'character');

const enemy = new Pokemon({
  ...enemyConfig,
  selectors: {
    hp: 'health-enemy',
    progressbar: 'progressbar-enemy',
  },
}, 'enemy');

const $control = document.querySelector('.control');
$control.innerHTML = '';

character.attacks.forEach((item, index) => {
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerHTML = `${item.name} <span id="btn-count-${index}"></span>`;
  $control.appendChild($btn);

  const $btnCount = document.getElementById(`btn-count-${index}`);

  const btnClick = createCountClick(item.maxCount, $btn, $btnCount, () => {
    const damageChar = random(item.maxDamage - item.minDamage) + item.minDamage;
    const enemyAttack = enemy.attacks[0];
    const damageEnemy = random(enemyAttack.maxDamage - enemyAttack.minDamage) + enemyAttack.minDamage;

    enemy.changeHP(damageChar, character, () => {
      document.querySelectorAll('.control .button').forEach($el => $el.disabled = true);
    });

    if (enemy.damageHP > 0) {
      character.changeHP(damageEnemy, enemy, () => {
        document.querySelectorAll('.control .button').forEach($el => $el.disabled = true);
      });
    }
  });

  $btn.addEventListener('click', () => {
    btnClick();
  });
});

const init = () => {
  character.renderHP();
  enemy.renderHP();

  document.getElementById('name-character').innerText = character.name;
  document.getElementById('name-enemy').innerText = enemy.name;
};

init();