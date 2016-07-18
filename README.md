# chnpm [![Build Status](https://travis-ci.org/floatdrop/chnpm.svg?branch=master)](https://travis-ci.org/floatdrop/chnpm)

> Manage your npm files with ease


## Install

```
$ npm install --save chnpm
```


## Usage

```js
var chnpm = require('chnpm');

chnpm.current();
//=> 'http://registry.npmjs.org'
```


## CLI

```
$ npm install --global chnpm
```
```
  Manage your npm files with ease

  Usage
    $ chnpm [options] [name]

  Examples
    $ chnpm
    Currently on http://registry.npmjs.org

    $ chnpm --save npmjs
    Config saved to ~/.npmjs

    $ npm config set registry http://registry.local.org
    $ chnpm --save local
    Config saved to ~/.local.npmrc

    $ chnpm local
    Switched to http://registry.local.org

  Options
    --save NAME  Save current configuration to ~/.NAME.npmrc
```


## API

### chnpm.current()

Returns current registry url.

### chnpm.save(name)

Saves current config file as `~/.${name}.npmrc`.

### chnpm.load(name)

Saves `~/.${name}.npmrc` as current config file.


## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
