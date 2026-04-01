// ABOUTME: Handles --view flag to pretty-print the current CLAUDE.md.
// ABOUTME: Reads and displays the file with colored section headings.

import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';

const CLAUDE_MD_PATH = path.join(process.cwd(), 'CLAUDE.md');

export async function viewMemory() {
  if (!fs.existsSync(CLAUDE_MD_PATH)) {
    console.log(chalk.red('\nNo CLAUDE.md found in this directory.'));
    console.log(chalk.red('Run claude-memory first to create one.\n'));
    process.exit(1);
  }

  const content = fs.readFileSync(CLAUDE_MD_PATH, 'utf-8');
  const lines = content.split('\n');

  console.log('');

  for (const line of lines) {
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      console.log(chalk.blue.bold(`  ${line}`));
    } else if (line.startsWith('## ')) {
      console.log(chalk.cyan.bold(`  ${line}`));
    } else if (line.startsWith('- ')) {
      console.log(chalk.white(`    ${line}`));
    } else if (line.trim() === '') {
      console.log('');
    } else {
      console.log(chalk.white(`    ${line}`));
    }
  }

  console.log('');
}
