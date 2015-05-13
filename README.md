# chnpm [![Build Status](https://travis-ci.org/floatdrop/chnpm.png?branch=master)](https://travis-ci.org/floatdrop/chnpm) [![Dependency Status](https://gemnasium.com/floatdrop/chnpm.png)](https://gemnasium.com/floatdrop/chnpm)
> npm configuration switcher

It's like `chsh`, but for npm.

![2014-03-08 18-39-04 1 chnpm zsh](https://f.cloud.github.com/assets/365089/2365351/c7e34308-a6be-11e3-9c2e-862373d96c06.png)

## Installation
```
npm i chnpm -g
```

## Usage

First, save your current configuration:

```bash
$ chnpm save npmjs
Saved user@registry.npmjs.org as .npmjs.npmrc
```

After this you have new file `~/.npmjs.npmrc` with your configuration. Now you can reconfigure current config on another repository:

```bash
$ npm config set registry <registry url>
$ npm login
```

This will edit your current `.npmrc` with new information about repository and user. Save it!

```bash
$ chnpm save private
Saved user@registry.private.org as .private.npmrc
```

And you can switch between them:

```bash
$ chnpm npmjs
Switched to user@registry.npmjs.org
```

### Listing registries
```bash
$ chnpm list
        npm: floatdrop@registry.npmjs.org (current)
     yandex: floatdrop@npm.domain.ru
```

### Show current configuration
```bash
$ npm config list
# or
$ chnpm
You are on user@registry.com
```

## Alternatives

 * [npmrc-switcher](https://github.com/BBC-News/npmrc-switcher) by [@JakeChampion](https://github.com/JakeChampion)
 * [npmrc](https://github.com/deoxxa/npmrc) by [@deoxxa](https://github.com/deoxxa)

If you know other npmrc tools - PR's are welcome!


## License

MIT
