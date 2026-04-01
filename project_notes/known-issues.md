# Known Issues

## --view only checks cwd for CLAUDE.md
**Status:** open
**Description:** `claude-memory --view` only looks in the current directory, not ~/.claude/CLAUDE.md. Users with a global CLAUDE.md but no project-level one get an error.
**Workaround:** cd to a directory that has a CLAUDE.md, or add a fallback to check ~/.claude/CLAUDE.md.
