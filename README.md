<div align="center">
  <h1 align="center"><a aria-label="File Explorer" href="https://github.com/Anulesh/file-explorer">Slipgen Monorepo</a></h1>
  <p align="center"><strong>File Explorer with fuzzy search</strong></p>
</div>
<p align="center">
  <a aria-label="Build" href="https://github.com/Anulesh/file-explorer/actions/workflows/node.js.yml?query=workflow%3A%22%22File+Explorer%22%22++">
    <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/Anulesh/file-explorer/main?label=CI&logo=github&style=flat-square">
  </a>
  <a aria-label="Codefactor grade" href="https://www.codefactor.io/repository/github/Anulesh/file-explorer">
    <img alt="Codefactor" src="https://img.shields.io/codefactor/grade/github/Anulesh/file-explorer?label=Codefactor&logo=codefactor&style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Codacy grade" href="https://app.codacy.com/organizations/gh/Anulesh/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Anulesh/file-explorer&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/dff9c944af284a0fad4e165eb1727467?logo=codacy&style=flat-square&labelColor=000&label=Codacy">
  </a>
  <a aria-label="LoC">  
    <img alt="LoC" src="https://img.shields.io/tokei/lines/github/Anulesh/file-explorer?style=flat-quare&labelColor=000000" />
  </a>
  <a aria-label="Top language" href="https://github.com/Anulesh/file-explorer/search?l=typescript">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Anulesh/file-explorer?style=flat-square&labelColor=000&color=blue">
  </a>
  <a aria-label="Licence" href="https://github.com/Anulesh/file-explorer/blob/main/LICENSE">
    <img alt="Licence" src="https://img.shields.io/github/license/Anulesh/file-explorer?style=flat-quare&labelColor=000000" />
  </a>
</p>

Useful to

- Establish a **structure** and present a lifecycle perspective (dx, ci/cd, deployments...)
- How to create and consume **shared packages**, locales, assets, api types...
- Integrate **tools & configs** (eslint, jest, playwright, storybook, changelogs, versioning, codecov, codeclimate...).
- Clarify some **advantages** of monorepos (team cohesion, consistency, duplication, refactorings, atomic commits...).
- Create nextjs/vercel/prisma... bug reports with **reproducible examples** _(initial goal of this repo)_.

## Install

```bash
yarn install
```

## Structure

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/Anulesh/file-explorer)

```
.
├── cypress
│   ├── components  (unit test)
│   └── ...
└── src
    ├── apis         (server)
    ├── components   (file, folder,tree)
    ├── constants    (icons etc)
    ├── context      (Global Context)
    └── helpers             (fuzzysearch, flatten)
```

## Howto

### 1. Cypress

<details>
<summary>Run cypress test locally</summary>

```bash
  yarn cypress open
```

</details>

### 2. Publishing

```bash
$ yarn changeset
```

Follow the instructions... and commit the changeset file. A "Version Packages" P/R will appear after CI checks.
When merging it, a [github action](./.github/workflows/release-or-version-pr.yml) will publish the packages
with resulting semver version and generate CHANGELOGS.

## 3. Quality

### 3.1 Hooks / Lint-staged

Check the [.husky](./.husky) folder content to see what hooks are enabled. Lint-staged is used to guarantee
that lint and prettier are applied automatically on commit and/or pushes.

### 3.2 Tests

Tests relies on cypress. All setups supports typescript path aliases.

Configuration lives in the root folder of each apps/packages. As an
example see

- [./cypress.config.ts](./cypress.config.ts).

### 3.3 CI

Workflow file explorer is defined in github action in [.github/workflows](./.github/workflows).
Currently it is doing following

- Run the build.
- Run cypress test.

More will be added soon

## 4. Deploy

### NETLIFY

Preview Link : [Demo](https://65e9089d08e78b790fca549f--file-explorer-fuzzy.netlify.app/)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAnulesh%2Ffile-explorer.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FAnulesh%2Ffile-explorer?ref=badge_large)
