# claude-memory-manager

A CLI tool that generates and manages `CLAUDE.md` files for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) projects.

## What is CLAUDE.md?

`CLAUDE.md` is a special file that Claude Code reads automatically when it starts a session in your project directory. It gives Claude persistent context about your project — what it does, how it's built, key decisions, and coding preferences.

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

## License

MIT
