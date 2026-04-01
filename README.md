# claude-memory-manager

A CLI tool that generates and manages `CLAUDE.md` files for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) projects.

## Why I built this

Every time you start a Claude Code session, Claude has no memory of your project unless you tell it. You end up repeating the same context — what the project does, how it's structured, what patterns to follow, what decisions were made and why.

`CLAUDE.md` solves this. It's a file Claude reads automatically at the start of every session, giving it persistent project context. But writing a good one from scratch means knowing the spec, remembering what to include, and structuring it so Claude can actually use it.

This tool turns that into a 2-minute interview. Answer the questions, get a well-structured `CLAUDE.md`. Come back later with `--update` to evolve it as your project grows.

## What is CLAUDE.md?

`CLAUDE.md` is a special markdown file that [Claude Code](https://docs.anthropic.com/en/docs/claude-code) reads automatically when it starts a session in your project directory. It gives Claude persistent context about your project — what it does, how it's built, key decisions, and coding preferences.

Without it, Claude starts every session cold. With it, Claude understands your project from the first prompt.

**Why it matters:**
- Claude reads `CLAUDE.md` at the start of every session — no need to re-explain your project
- Keeps Claude aligned with your architecture decisions and coding style
- Works at any level: `~/.claude/CLAUDE.md` (global), project root (per-project), or subdirectories (scoped)
- Reduces back-and-forth and prevents Claude from making assumptions that don't fit your codebase

## Install

```bash
npm install -g claude-memory-manager
```

Or run directly:

```bash
npx claude-memory-manager
```

## Usage

### Create a new CLAUDE.md

```bash
claude-memory
```

Runs an interactive interview asking about your project, then writes a structured `CLAUDE.md` to the current directory.

### Update an existing CLAUDE.md

```bash
claude-memory --update
```

Shows current values for each field and lets you replace any of them.

### View the current CLAUDE.md

```bash
claude-memory --view
```

Pretty-prints the current `CLAUDE.md` with colored output.

## What it generates

The tool creates a `CLAUDE.md` with these sections:

| Section | Purpose |
|---------|---------|
| **Project Overview** | What the project does |
| **Tech Stack** | Languages, frameworks, databases |
| **Key Commands** | Build, test, run commands |
| **Architecture Notes** | How the code is organized |
| **Key Decisions** | Constraints and choices Claude should respect |
| **Code Style & Patterns** | Preferred conventions |
| **Context for Claude** | Anything else Claude should always know |

## Project Structure

```
bin/cli.js          # CLI entry point — parses flags, delegates to handlers
lib/prompt.js       # Readline-based interactive prompts
lib/generator.js    # CLAUDE.md generation and parsing
lib/interview.js    # Create flow — collects answers, writes file
lib/update.js       # Update flow — edit existing fields
lib/view.js         # View flow — pretty-print with chalk
test/cli.test.js    # Generator and parser tests
```

## Contributing

PRs welcome. If you have ideas for new sections or better defaults, open an issue.

## License

MIT
