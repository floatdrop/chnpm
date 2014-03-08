# chnpm [![NPM Version](https://badge.fury.io/js/chnpm.png)](https://npmjs.org/package/chnpm) [![Build Status](https://travis-ci.org/floatdrop/chnpm.png?branch=master)](https://travis-ci.org/floatdrop/chnpm) [![Coverage Status](https://coveralls.io/repos/floatdrop/chnpm/badge.png?branch=master)](https://coveralls.io/r/floatdrop/chnpm) [![Dependency Status](https://gemnasium.com/floatdrop/chnpm.png)](https://gemnasium.com/floatdrop/chnpm)
> npm configuration switcher

It's like `chsh`, but for npm.

![2014-03-08 18-24-58 1 zsh](https://f.cloud.github.com/assets/365089/2365331/c1389e42-a6bc-11e3-8ba3-bb60dac80d5d.png)


## Installation

`npm i chnpm -g`

## Usage

### Saving current configuration:

```bash
chnpm save npmjs
```

### Switching between registries

```bash
$ chnpm local
Switched to user@npm.localdomain.net
```

### Listing registries

```bash
$ chnpm list

    current: floatdrop@npm.domain.ru
    ------------ available: -------------
        npm: floatdrop@registry.npmjs.org
     yandex: floatdrop@npm.domain.ru
```

## License

MIT
