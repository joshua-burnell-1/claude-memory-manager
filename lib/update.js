// ABOUTME: Handles --update flag to edit fields in an existing CLAUDE.md.
// ABOUTME: Reads current values, shows them, and lets the user replace any field.

import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import { createPrompter } from './prompt.js';
import { generateClaudeMd, parseClaudeMd } from './generator.js';

const CLAUDE_MD_PATH = path.join(process.cwd(), 'CLAUDE.md');

const FIELDS = [
  { key: 'projectName', label: 'Project name', type: 'single' },
  { key: 'description', label: 'Project overview', type: 'single' },
  { key: 'techStack', label: 'Tech stack', type: 'list' },
  { key: 'keyCommands', label: 'Key commands', type: 'list' },
  { key: 'architecture', label: 'Architecture notes', type: 'single' },
  { key: 'decisions', label: 'Key decisions', type: 'list' },
  { key: 'codeStyle', label: 'Code style & patterns', type: 'list' },
  { key: 'context', label: 'Context for Claude', type: 'single' },
];

export async function updateMemory() {
  if (!fs.existsSync(CLAUDE_MD_PATH)) {
    console.log(chalk.red('\nNo CLAUDE.md found in this directory.'));
    console.log(chalk.red('Run claude-memory first to create one.\n'));
    process.exit(1);
  }

  const content = fs.readFileSync(CLAUDE_MD_PATH, 'utf-8');
  const answers = parseClaudeMd(content);
  const prompter = createPrompter();

  console.log(chalk.blue.bold('\n  Update CLAUDE.md\n'));
  console.log(chalk.dim('  Press Enter to keep current value. Type new value to replace.\n'));

  for (const field of FIELDS) {
    const current = answers[field.key];

    if (field.type === 'list') {
      const currentDisplay = Array.isArray(current) && current.length > 0
        ? current.join(', ')
        : chalk.dim('(empty)');
      console.log(chalk.cyan(`  ${field.label}: `) + currentDisplay);
      const input = await prompter.ask(chalk.green('  ? ') + 'New value (comma-separated, or Enter to keep): ');
      if (input) {
        answers[field.key] = input.split(',').map((s) => s.trim()).filter(Boolean);
      }
    } else {
      const currentDisplay = current || chalk.dim('(empty)');
      console.log(chalk.cyan(`  ${field.label}: `) + currentDisplay);
      const input = await prompter.ask(chalk.green('  ? ') + 'New value (or Enter to keep): ');
      if (input) {
        answers[field.key] = input;
      }
    }
    console.log('');
  }

  prompter.close();

  const updated = generateClaudeMd(answers);
  fs.writeFileSync(CLAUDE_MD_PATH, updated);

  console.log(chalk.green.bold('  CLAUDE.md updated!\n'));
}
