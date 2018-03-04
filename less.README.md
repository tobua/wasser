# wasser for LESS
> Mixins for fluid CSS properties

## Installation

```
npm i wasser
```

Include it in your LESS files.

```
@import 'node_modules/wasser/wasser';
```

## Getting started

```
body {
  .wasser(padding, 40);
}
```

The method interfaces are the same as for the SASS version.

## Advanced Example and Output

In the following snippet the mixin is first imported, then some defaults are 
overwritten and finally a few properties assigned.

```
@import 'node_modules/wasser/wasser';

@wasser-scaling-ratio:    2;
@wasser-viewport-min:     500;

.example {
  .wasser(padding, 50);
  .wasser(margin-bottom, 50, 10);
}
```

The following output will be generated:

```
.example {
  padding: calc(1.5625rem + (50 - 25) * (100vw - 31.1875rem) / (1500 - 500));
  margin-bottom: calc(0.625rem + (50 - 10) * (100vw - 31.1875rem) / (1500 - 500));
}

// Static value above the default viewport of 1500px
// (93.75rem === 1500px @16px/rem)
@media (min-width: 93.75rem) {
  .example {
    padding: 3.125rem;
  }
}

// Below custom viewport of 500px
@media (max-width: 31.1875rem) {
  .example {
    padding: 1.5625rem;
  }
}

// max value is used for print, to make it easily readable.
@media print {
  .example {
    padding: 3.125rem;
  }
}

@media (min-width: 93.75rem) {
  .example {
    margin-bottom: 3.125rem;
  }
}

@media (max-width: 31.1875rem) {
  .example {
    margin-bottom: 0.625rem;
  }
}

@media print {
  .example {
    margin-bottom: 3.125rem;
  }
}
```