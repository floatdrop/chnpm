# chnpm [![NPM Version](https://badge.fury.io/js/chnpm.png)](https://npmjs.org/package/chnpm) [![Build Status](https://travis-ci.org/floatdrop/chnpm.png?branch=master)](https://travis-ci.org/floatdrop/chnpm) [![Coverage Status](https://coveralls.io/repos/floatdrop/chnpm/badge.png?branch=master)](https://coveralls.io/r/floatdrop/chnpm) [![Dependency Status](https://gemnasium.com/floatdrop/chnpm.png)](https://gemnasium.com/floatdrop/chnpm)
> npm configuration switcher

It's like `chsh`, but for npm.

![2014-03-08 18-39-04 1 chnpm zsh](https://f.cloud.github.com/assets/365089/2365351/c7e34308-a6be-11e3-9c2e-862373d96c06.png)

## Installation

`npm i chnpm -g`

## Usage

### Saving current configuration:

```bash
$ chnpm save npmjs
Saved user@registry.npmjs.org as .npmjs.npmrc
```

### Switching between registries

```bash
$ chnpm local
Switched to user@npm.localdomain.net
```

### Listing registries

```bash
$ chnpm list
        npm: floatdrop@registry.npmjs.org (current)
     yandex: floatdrop@npm.domain.ru
```

## License

MIT
