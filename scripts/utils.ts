#!/usr/bin/env node
import chalk, { type Chalk, BackgroundColor } from 'chalk';

/**
 * Basic log functionality to use with chalk
 * to color the output
 * @param {string} message any message that needs to be logged
 * @param {string} color name of the color function to be used with chalk
 */
export const log = (message: string, color?: string): void => {
  if (!color) {
    console.log(message);
    return;
  }
  console.log(chalk[color as typeof BackgroundColor](message));
};

/**
 * logs an info message in green color
 * @param {String} message  any message that needs to be logged
 */
export const logInfo = (message: string): void => {
  log(message, 'green');
};

/**
 * logs an error message in red color
 * @param {String} message  any message that needs to be logged
 */
export const logError = (message: string): void => {
  log(message, 'red');
};
