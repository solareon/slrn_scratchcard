# Contributing

Thank you for taking the time to contribute!

These guidelines will help you help us in the best way possible regardless of your skill level. We ask that you try to read everything related to the way you'd like to contribute and try and use your best judgement for anything not covered.

Make sure to also read our [Contributor Code of Conduct](./CODE_OF_CONDUCT.md).

If you still have further questions after reading be sure to join the [Discord server][discord link].

## Issues

Open a new issue to report a bug or request a new feature or improvement.

If you want to ask a question, issues are not the place to do so. Please join our [Discord server][discord link] and ask over there instead.

When opening a new issue, make sure to pick the right type of form and fill it out. The more information you provide, the easier it will be for us to work on your new issue. Issues that are invalid or do not follow the correct form may be ignored or even closed.

## Pull Requests

Open a new pull request to contribute code.

You can use your own editor of choice, but we recommend using [VSCode](https://code.visualstudio.com/) with these extensions:

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Lua Language Server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [CfxLua IntelliSense](https://marketplace.visualstudio.com/items?itemName=overextended.cfxlua-vscode)

When opening a pull request, make sure to follow the template and explain your changes. If you are trying to contribute something related to a GitHub issue, make sure to mention it as well.

## Code Conventions

Below are conventions that you must follow when contributing code.

### Commit Message Conventions

- The first line of a commit message must be 72 characters at most.
- Commit messages and pull request titles must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
  - Use `fix:` when patching a bug.
  - Use `feat:` when introducing a new feature.
  - Use `refactor:` when altering code without changing functionality.
  - Use `chore:` when your changes don't alter production code.
  - Append a `!` after the type/scope of the feature when you change code and introduce a breaking API change. Optionally add a footer to the bottom of your commit message separated by 2 newlines, starting with `BREAKING CHANGE:`, and explaining the breaking change.

### Lua Conventions

#### General Style

- Use 4 space indentation.
- Prefer creating local variables over global ones.
- Don't repeat yourself. If you're using the same operations in multiple different places convert them into a flexible function.
- Exported functions must be properly annotated (see [LuaLS Annotations](https://luals.github.io/wiki/annotations/)).
- Utilize [ox_lib](https://overextended.dev/ox_lib) to make your life easier. Prefer lib calls over native ones.
- Make use of config options where it makes sense to make features optional and/or customizable. Configs should not be modified by other code.

#### Optimization & Security

- Consider [this Lua Performance guide](https://springrts.com/wiki/Lua_Performance).
- Don't create unnecessary threads. Always try to find a better method of triggering events.
- Set longer `Wait` calls in distance checking loops when the player is out of range.
- Don't waste cycles; job specific loops should only run for players with that job.
- When possible don't trust the client, *especially* with transactions.
- Balance security and optimizations.
- Use `#(vector3 - vector3)` instead of `GetDistanceBetweenCoords()`.
- Use `myTable[#myTable + 1] = 'value'` instead of `table.insert(myTable, 'value')`.
- Use `myTable['key'] = 'value'` instead of `table.insert(myTable, 'key', 'value')`.

#### Naming

- Use `camelCase` for local variables and functions.
- Use `PascalCase` for global variables and functions.
- Avoid acronyms as they can be confusing and context dependant.
- Be descriptive; make it easy for the reader.
  - Booleans may be prefixed with `is`, `has`, `are`, etc.
  - Arrays should have plural names.

### JavaScript/TypeScript Conventions

Consider following the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) and the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).

[discord link]: https://discord.gg/TZFBBHvG6E
