# my-local-octokit-playground
I wanna run something script through octokit at local.

# setup

```bash
pnpm run init:repo
```

open the headed chromium broweser(playwright). Login to the GitHub.com then saved login session to your local.

# development

```bash
pnpm dev
```

then builded to dist.

### check command

```bash
bin/cli <command> <args...>
```

#### if you want to debug on e2e?

- https://playwright.dev/docs/debug
- https://playwright.dev/docs/debug-selectors#using-playwright-inspector

```bash
`PWDEBUG=1 bin/cli <command> <args...>`
```