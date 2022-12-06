# [![Build Status]][Build action] [![NPM version]][npmjs.com]

[Build Status]: https://github.com/THCLab/oca.js-form-core/actions/workflows/build-status.yml/badge.svg?branch=main
[Build action]: https://github.com/THCLab/oca.js-form-core/actions/workflows/build-status.yml
[NPM version]: https://img.shields.io/npm/v/oca.js-form-core
[npmjs.com]: https://www.npmjs.com/package/oca.js-form-core

# oca.js-form-core

A package for mapping between OCA schema and form structure

## License

EUPL 1.2 

We have distilled the most crucial license specifics to make your adoption seamless: [see here for details](https://github.com/THCLab/licensing).

## Usage

### Install

With npm:  
`npm install oca.js-form-core`  
or with yarn:  
`yarn add oca.js-form-core`

## Development

### Build

```
yarn install
yarn build
```

### Run tests

```
yarn test
```

### Bypass git hooks (not recommended)

You can commit changes with linter errors by using git `-n/--no-verify` option:  
`git commit -m "yolo!" --no-verify`  
For pushing changes with failing tests:  
`HUSKY=0 git push`
