# chnpm
> npm configuration switcher

Switch between npm config files.

![2014-03-07 22-56-08 floatdropchnpm](https://f.cloud.github.com/assets/365089/2359681/b574c79a-a61a-11e3-973c-18ed220fb466.png)


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
Switched to user@npm.localdomain.net from user@registry.npmjs.org
```

### Listing registries

```bash
$ chnpm list
        npm: floatdrop@registry.npmjs.org (current)
    private: floatdrop@npm.private.ru
```

## License

MIT
