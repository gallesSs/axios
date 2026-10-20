import { INTRO_DELAY } from "./config";

let played = false;

/** Прелоадер отыграл — дальше (клиентская навигация) первый экран не ждёт его. */
export const markIntroPlayed = () => {
  played = true;
};

/** Задержка анимаций первого экрана: на первом заходе ждём прелоадер, при переходах — 0. */
export const introDelay = () => (played ? 0 : INTRO_DELAY);
