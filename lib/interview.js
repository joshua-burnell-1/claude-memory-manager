// ABOUTME: Runs the interactive interview to collect project info.
// ABOUTME: Writes the generated CLAUDE.md to the current directory.

import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import { createPrompter } from './prompt.js';
import { generateClaudeMd } from './generator.js';

const CLAUDE_MD_PATH = path.join(process.cwd(), 'CLAUDE.md');

export async function createInterview() {
  if (fs.existsSync(CLAUDE_MD_PATH)) {
    console.log(chalk.yellow('\nCLAUDE.md already exists in this directory.'));
    console.log(chalk.yellow('Use --update to edit it, or delete it first to start fresh.\n'));
    process.exit(1);
  }

  console.log(chalk.blue.bold('\n  Claude Memory Manager\n'));
  console.log(chalk.dim('  Answer these questions to generate a CLAUDE.md for your project.\n'));

  const prompter = createPrompter();

  const projectName = await prompter.ask(chalk.green('? ') + 'Project name: ');
  const description = await prompter.ask(chalk.green('? ') + 'What does this project do? (1-2 sentences): ');

  console.log('');
  const techStack = await prompter.askMultiline(chalk.green('? ') + 'Tech stack (e.g., Node.js, React, PostgreSQL):');

  console.log('');
  const keyCommands = await prompter.askMultiline(chalk.green('? ') + 'Key commands (e.g., npm test, npm run build):');

  console.log('');
  const architecture = await prompter.ask(chalk.green('? ') + 'Architecture notes (how is the code organized?): ');

  console.log('');
  const decisions = await prompter.askMultiline(chalk.green('? ') + 'Key decisions or constraints Claude should know:');

  console.log('');
  const codeStyle = await prompter.askMultiline(chalk.green('? ') + 'Preferred coding patterns or style rules:');

  console.log('');
  const context = await prompter.ask(chalk.green('? ') + 'Any other context Claude should always have? ');

  prompter.close();

  const answers = {
    projectName,
    description,
    techStack,
    keyCommands,
    architecture,
    decisions,
    codeStyle,
    context,
  };

  const content = generateClaudeMd(answers);
  fs.writeFileSync(CLAUDE_MD_PATH, content);

  console.log(chalk.green.bold('\n  CLAUDE.md created successfully!\n'));
  console.log(chalk.dim(`  Location: ${CLAUDE_MD_PATH}\n`));
}
