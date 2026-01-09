---
description: Commit all changes and push to git remote
allowed-tools: Bash(git:*)
---

# Git Push Command

Follow these steps to commit and push changes:

1. First, check the current git status to see all changes
2. Review the staged and unstaged changes with git diff
3. Look at recent commit messages to match the style
4. Stage all relevant changes (excluding any sensitive files like .env)
5. Create a commit with a clear, descriptive message summarizing the changes
6. Push to the remote repository

If there are no changes to commit, inform the user.
If there are merge conflicts or push fails, explain the issue and suggest solutions.

Commit message format:
- Use imperative mood ("Add feature" not "Added feature")
- First line: brief summary (50 chars or less)
- Include the standard footer for Claude-generated commits

$ARGUMENTS
