export const logs = [
  '[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.',
  '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
  '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
  '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
  '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком <вырезанно цензурой> противника.',
  '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
  '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
  '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
  '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
  '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

export const random = (num) => Math.ceil(Math.random() * num);

export const generateLog = (firstPerson, secondPerson, count) => {
  const $logs = document.getElementById('logs');
  const { name: defenderName, damageHP, defaultHP } = firstPerson;
  const { name: attackerName } = secondPerson;

  const logText = logs[random(logs.length) - 1]
    .replace('[ПЕРСОНАЖ №1]', defenderName)
    .replace('[ПЕРСОНАЖ №2]', attackerName);

  const $p = document.createElement('p');
  $p.innerText = `${logText} [-${count}] [${damageHP}/${defaultHP}]`;

  $logs.insertBefore($p, $logs.children[0]);
};

export const createCountClick = (limit, $btn, $countEl, callback) => {
  let count = 0;
  $countEl.innerText = `(${limit})`;

  return () => {
    if (count >= limit) {
      $btn.disabled = true;
      return;
    }

    count += 1;
    const rest = limit - count;
    $countEl.innerText = `(${rest})`;

    callback();

    if (rest === 0) {
      $btn.disabled = true;
    }
  };
};