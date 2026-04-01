# Decisions

## Use readline instead of inquirer — 2026-03-31
**What:** Built prompts with Node's native readline module instead of inquirer.
**Why:** Lighter weight, no dependency issues. This was built before we discovered the inquirer v13 bug.
**Alternatives considered:** inquirer (would need @inquirer/prompts migration if added later)

## ESM modules throughout — 2026-03-31
**What:** All files use ES module syntax (import/export), package.json has "type": "module".
**Why:** Modern Node.js standard, cleaner syntax.
**Alternatives considered:** CommonJS (no reason to use it for a new project)
