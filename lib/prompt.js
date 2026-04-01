// ABOUTME: Readline-based prompt utility for interactive user input.
// ABOUTME: Provides ask() for single questions and askMultiline() for multi-line input.

import * as readline from 'node:readline';

export function createPrompter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function ask(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => resolve(answer.trim()));
    });
  }

  function askMultiline(question) {
    return new Promise((resolve) => {
      console.log(question);
      console.log('  (Enter each item on its own line. Empty line to finish)');
      const lines = [];
      const handler = (line) => {
        if (line.trim() === '') {
          rl.removeListener('line', handler);
          resolve(lines);
        } else {
          lines.push(line.trim());
        }
      };
      rl.on('line', handler);
    });
  }

  function close() {
    rl.close();
  }

  return { ask, askMultiline, close };
}
