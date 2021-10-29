# [![Build Status]][Build action] [![NPM version]][npmjs.com]

[Build Status]: https://github.com/THCLab/oca.js-middleware/actions/workflows/build-status.yml/badge.svg?branch=main
[Build action]: https://github.com/THCLab/oca.js-middleware/actions/workflows/build-status.yml
[NPM version]: https://img.shields.io/npm/v/oca.js-middleware
[npmjs.com]: https://www.npmjs.com/package/oca.js-middleware

# oca.js-middleware

A middleware package for mapping between OCA schema and form structure

## Usage

### Install

With npm:  
`npm install oca.js-middleware`  
or with yarn:  
`yarn add oca.js-middleware`

## Development

### Build

`yarn install`

### Run tests

`yarn test`

### Bypass git hooks (not recommended)

You can commit changes with linter errors by using git `-n/--no-verify` option:  
`git commit -m "yolo!" --no-verify`  
For pushing changes with failing tests:  
`HUSKY=0 git push`
