export const introSound = new Audio('sounds/pacman_beginning.wav');
export const pacmanMunchSound = new Audio('sounds/pacman_chomp.wav');
export const eatingFruitSound = new Audio('sounds/pacman_eatfruit.wav');
export const deathSound = new Audio('sounds/pacman_death.wav');
export const eatingGhostSound = new Audio('sounds/pacman_eatghost.wav');
export const extraManSound = new Audio('sounds/pacman_extrapac.wav');
export const intermissionSound = new Audio('sounds/pacman_intermission.wav');

// Preload sounds for continuos play.
const sounds = [introSound, pacmanMunchSound, eatingFruitSound, deathSound, eatingGhostSound, extraManSound, intermissionSound];
sounds.forEach(sound => {
  sound.preload = 'auto';
});