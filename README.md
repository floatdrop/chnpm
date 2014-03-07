# chnpm
> npm configuration switcher

Switch between npm registries with fuzzy matching 

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
