// ABOUTME: Generates a well-structured CLAUDE.md from interview answers.
// ABOUTME: Follows Anthropic's CLAUDE.md spec for Claude Code project context.

export function generateClaudeMd(answers) {
  const sections = [];

  sections.push(`# ${answers.projectName}\n`);

  if (answers.description) {
    sections.push(`## Project Overview\n\n${answers.description}\n`);
  }

  if (answers.techStack && answers.techStack.length > 0) {
    sections.push(`## Tech Stack\n\n${answers.techStack.map((t) => `- ${t}`).join('\n')}\n`);
  }

  if (answers.keyCommands && answers.keyCommands.length > 0) {
    sections.push(`## Key Commands\n\n${answers.keyCommands.map((c) => `- \`${c}\``).join('\n')}\n`);
  }

  if (answers.architecture) {
    sections.push(`## Architecture Notes\n\n${answers.architecture}\n`);
  }

  if (answers.decisions && answers.decisions.length > 0) {
    sections.push(`## Key Decisions\n\n${answers.decisions.map((d) => `- ${d}`).join('\n')}\n`);
  }

  if (answers.codeStyle && answers.codeStyle.length > 0) {
    sections.push(`## Code Style & Patterns\n\n${answers.codeStyle.map((s) => `- ${s}`).join('\n')}\n`);
  }

  if (answers.context) {
    sections.push(`## Context for Claude\n\n${answers.context}\n`);
  }

  return sections.join('\n');
}

export function parseClaudeMd(content) {
  const answers = {
    projectName: '',
    description: '',
    techStack: [],
    keyCommands: [],
    architecture: '',
    decisions: [],
    codeStyle: [],
    context: '',
  };

  const lines = content.split('\n');
  let currentSection = null;

  for (const line of lines) {
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      answers.projectName = line.replace('# ', '').trim();
      continue;
    }

    if (line.startsWith('## ')) {
      const heading = line.replace('## ', '').trim().toLowerCase();
      if (heading.includes('overview')) currentSection = 'description';
      else if (heading.includes('tech stack')) currentSection = 'techStack';
      else if (heading.includes('key commands')) currentSection = 'keyCommands';
      else if (heading.includes('architecture')) currentSection = 'architecture';
      else if (heading.includes('decisions')) currentSection = 'decisions';
      else if (heading.includes('code style') || heading.includes('patterns')) currentSection = 'codeStyle';
      else if (heading.includes('context')) currentSection = 'context';
      else currentSection = null;
      continue;
    }

    if (!currentSection || line.trim() === '') continue;

    const listItem = line.replace(/^- `?/, '').replace(/`$/, '').trim();

    switch (currentSection) {
      case 'description':
        answers.description += (answers.description ? '\n' : '') + line.trim();
        break;
      case 'techStack':
        if (line.startsWith('- ')) answers.techStack.push(listItem);
        break;
      case 'keyCommands':
        if (line.startsWith('- ')) answers.keyCommands.push(listItem);
        break;
      case 'architecture':
        answers.architecture += (answers.architecture ? '\n' : '') + line.trim();
        break;
      case 'decisions':
        if (line.startsWith('- ')) answers.decisions.push(listItem);
        break;
      case 'codeStyle':
        if (line.startsWith('- ')) answers.codeStyle.push(listItem);
        break;
      case 'context':
        answers.context += (answers.context ? '\n' : '') + line.trim();
        break;
    }
  }

  return answers;
}
