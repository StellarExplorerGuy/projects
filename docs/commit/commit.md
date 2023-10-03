# Automation of clean code and more

## Issue templates

You can use issue templates on GitHub by simply inserting the `.github` folder into your project, then committing and pushing the modifications. Also, you can set default PR reviewer (user or group) using `CODEOWNERS` file if needed.

<details>
  <summary>Demo</summary>

![issue_templates](/assets/doc/issue_templates.png)

</details>

## Git commit

<details>
  <summary> Create commit template. You can use Faster PR plugin to replace content of .gitmessage in VS Code.</summary>

---

**Result after setup**:

```
fix: async operations on login

<body>

Contributes: ORG_NAME/REPO_NAPE#ISSUE_NUMBER

Signed-off-by: USERNAME SURENAME <EMAIL>
```

To speed up the process of creating a conforming commit message, it's recommended to create a template file:

1. Create `.gitmessage` file with required contents once.
2. Run `git config --global --add commit.template ~/.gitmessage`.
3. The default editor when writing commit messages usually requires you to use the terminal. You can change this to use another editor: `git config --global core.editor "code --wait"`.

<details>
  <summary>Rules(ref: .commitlintrc.json)</summary>

1. The title must start with one of the following words:
   `feat|fix|docs|style|refactor|perf|test|chore`

2. You can use one of the following before the issue number reference:
   `Resolves|Closes|Contributes to|Reverts`

3. Your email must conform to this format:
   `[^@]+@.*SOME_ORG.com`

</details>
</details>

## Project specific set up

Git commit message can be linted using the [conventional commits guidelines](https://www.conventionalcommits.org/) and [commitlint package](https://www.npmjs.com/package/@commitlint/config-conventional).

All commit messages can be linted using a pre-commit hook with [Husky](https://typicode.github.io/husky/#/) so it's important to understand how to structure your commit messages.

<details>
  <summary>Template for React project, move all files from the "react" folder to your root directory. Use version control to track changes and exclude what isn't relevant to you. Keep packages updated to prevent obsolescence and address vulnerabilities that may arise in the future.

ref: [Package Json Upgrade plugin](https://marketplace.visualstudio.com/items?itemName=codeandstuff.package-json-upgrade).

</summary>

**Details**

- `.gitignore`: default files to be ignored
- enabled lint-stage: if a developer commits files that are staged in Git without applying styling through Prettier and the linter, an automatic process will fix and commit them to ensure that 100% of the rules are enforced.
- `.commitlintrc.json`: rules of commit message;
- husky: rules of commit message:  
  `.husky/commit-msg`: hook to execute lint for commit message;  
  `.husky/pre-commit`: hook to execute lint-staged of code to lint, it is using config `.lintstagedrc`;  
  `.husky/pre-push`: hook to execute build, it is good practice to test your build locally as it is faster;
- `tsconfig.json`: default TS configs;
- `prettier.config.js` your prettier config;
- `.eslintrc.js` your eslint config that is extended by prettier config;
- `package.json` - all the essential components needed to make ESLint, Prettier, lint-staged, Husky hooks, and lint-staged work together effectively.

### Scripts

- `clean-code`: fix issues using lint and prettier rules.
- `build`: test if app build is successful.

### Configs

- `package.json`: the "engines" field in package.json is used to specify the range of Node.js versions that are compatible with the project when it's being used or installed as a dependency locally or in the cloud.

```
"engines": {
  "node": "v18.x.x",
  "npm": "9.x.x"
},
```

</details>
