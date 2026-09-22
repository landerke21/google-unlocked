---
name: space
description: Help users organize, inspect, and maintain a focused workspace or project context. Use for repository orientation, workspace conventions, file ownership, context boundaries, and keeping related work discoverable without changing implementation code unnecessarily.
---

# Space

Use this skill when a user asks to understand, organize, or document the
working space around a project. A space is the set of files, conventions,
tools, and boundaries that make a task understandable and repeatable.

## When to use

Invoke this skill for requests such as:

- “What is in this workspace?”
- “Show me how this repository is organized.”
- “Document the conventions for this project.”
- “Help me separate this feature from unrelated files.”
- “Where should I add this file?”
- “Make the project easier for an agent or new contributor to navigate.”

Do not use it as a substitute for a feature-specific implementation skill.
When the request is to change application behavior, use the relevant
implementation workflow after establishing the workspace context.

## Operating procedure

1. **Establish the boundary.** Identify the repository root and confirm which
   directories and files are in scope. Do not inspect or modify unrelated
   workspaces.
2. **Read the local guidance first.** Look for contribution guides, agent
   instructions, package manifests, build configuration, and directory-level
   documentation. Treat the most specific guidance as authoritative.
3. **Map the space.** Summarize the important top-level directories, entry
   points, test locations, generated files, and configuration files. Prefer
   precise file links over speculative descriptions.
4. **Trace ownership and conventions.** Find the nearest existing examples,
   naming patterns, public APIs, test patterns, and localization or generated
   file rules before recommending a location or edit.
5. **Keep context focused.** Include only files needed for the requested
   outcome. Explicitly call out generated, vendored, secret-bearing, or
   otherwise read-only areas.
6. **Make changes only when requested.** If organization or documentation is
   requested, make the smallest coherent change and preserve existing
   conventions. Do not create planning files just to explain an answer.
7. **Validate the result.** For documentation or configuration changes, check
   links, formatting, and repository-specific validation. For structural
   changes, run the narrowest relevant test or build command.
8. **Report the result.** State the examined boundary, relevant findings,
   changes made, and validation performed. Mention assumptions and any
   remaining ambiguity.

## Rules

- Prefer existing helpers, templates, and documentation over introducing a
  parallel convention.
- Do not move, rename, or delete files merely to make a layout look cleaner.
  Such changes require a clear user request and a complete reference update.
- Do not expose credentials, tokens, private workspace data, or ignored files.
- Distinguish source files from generated output and edit the source of truth.
- Preserve unrelated working-tree changes.
- Use repository-standard terminology and formatting.

## Examples

### Repository orientation

For “How is this project organized?”, inspect the root guidance and manifests,
then return a concise map such as:

```text
src/       application source and public entry points
tests/     automated tests
scripts/   developer and release tooling
docs/      maintained documentation
dist/      generated output; do not edit directly
```

Include the commands or files that support each statement when they are
available.

### Choosing a file location

For “Where should I add a parser?”, find existing parser implementations,
their tests, and the package boundary first. Recommend the location that
matches those examples, explain the neighboring test file, and identify any
registration or export file that must also be updated.

### Improving discoverability

For “Make this workspace easier for agents to use,” update the nearest
maintained contributor or directory documentation rather than adding a second
source of truth. Document entry points, validation commands, generated-file
boundaries, and common workflows, then run the repository’s documentation
checks if they exist.