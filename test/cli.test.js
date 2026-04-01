// ABOUTME: Basic tests for the generator and parser modules.
// ABOUTME: Verifies CLAUDE.md generation and round-trip parsing.

import { generateClaudeMd, parseClaudeMd } from '../lib/generator.js';
import assert from 'node:assert';

const answers = {
  projectName: 'Test Project',
  description: 'A test project for validation.',
  techStack: ['Node.js', 'Express'],
  keyCommands: ['npm test', 'npm start'],
  architecture: 'Simple MVC layout.',
  decisions: ['Use ESM modules', 'No database for v1'],
  codeStyle: ['Prefer const over let', 'No semicolons'],
  context: 'This is a CLI tool for developers.',
};

// Test generation
const md = generateClaudeMd(answers);
assert(md.includes('# Test Project'), 'should include project name heading');
assert(md.includes('## Project Overview'), 'should include overview section');
assert(md.includes('A test project for validation.'), 'should include description');
assert(md.includes('- Node.js'), 'should include tech stack items');
assert(md.includes('- Express'), 'should include tech stack items');
assert(md.includes('`npm test`'), 'should format commands as code');
assert(md.includes('## Architecture Notes'), 'should include architecture');
assert(md.includes('- Use ESM modules'), 'should include decisions');
assert(md.includes('- Prefer const over let'), 'should include code style');
assert(md.includes('## Context for Claude'), 'should include context section');

// Test round-trip parsing
const parsed = parseClaudeMd(md);
assert.strictEqual(parsed.projectName, 'Test Project');
assert.strictEqual(parsed.description, 'A test project for validation.');
assert.deepStrictEqual(parsed.techStack, ['Node.js', 'Express']);
assert.deepStrictEqual(parsed.keyCommands, ['npm test', 'npm start']);
assert.strictEqual(parsed.architecture, 'Simple MVC layout.');
assert.deepStrictEqual(parsed.decisions, ['Use ESM modules', 'No database for v1']);
assert.deepStrictEqual(parsed.codeStyle, ['Prefer const over let', 'No semicolons']);
assert.strictEqual(parsed.context, 'This is a CLI tool for developers.');

console.log('All tests passed!');
