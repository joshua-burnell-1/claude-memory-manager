#!/usr/bin/env node
// ABOUTME: Entry point for the claude-memory CLI tool.
// ABOUTME: Parses flags and delegates to the appropriate command handler.

import { createInterview } from '../lib/interview.js';
import { updateMemory } from '../lib/update.js';
import { viewMemory } from '../lib/view.js';

const args = process.argv.slice(2);
const flag = args[0];

if (flag === '--update') {
  await updateMemory();
} else if (flag === '--view') {
  await viewMemory();
} else if (flag === '--help' || flag === '-h') {
  console.log(`
claude-memory — Generate and manage CLAUDE.md files for Claude Code

Usage:
  claude-memory            Run the interactive interview to create CLAUDE.md
  claude-memory --update   Edit fields in an existing CLAUDE.md
  claude-memory --view     Pretty-print the current CLAUDE.md
  claude-memory --help     Show this help message
`);
} else {
  await createInterview();
}
