# wasser for SASS

> Mixins for fluid CSS properties

## Installation

```
npm i wasser
```

Include it in your SASS files before use.

```scss
@import 'node_modules/wasser/wasser' #or @import '~wasser/wasser';
```

## Getting started

```scss
// Before
padding: 30px;

@media (min-width: 768px) {
  padding: 40px;
}

// After
@include wasser(padding, 40);
```

<p align="center">
  <img src="https://raw.githubusercontent.com/tobua/wasser/main/illustration.svg?sanitize=true" alt="How the wasser plugin works visualized">
</p>

## Interface

`wasser($property, $max, [$min])`

$property can be any CSS property with numerical value. $max will be the value
at the upper breakpoint, while \$min will be the value
at the lower breakpoint.

If $min is missing, $max divided by the scaling factor will be used.

### Fonts

`w-font($max, [$min], [$line-height-ratio])`

This call does not require a property as it will set both the font-size and
the associated line-height. The line-height does not require a separate value
but is instead stretched by the optional `$line-height-ratio`. The default for
this can be set with `$wasser-font-size-to-line-height-ratio`. To calculate the
`$min` value from `$max` if it's not set the `$wasser-scaling-ratio-font` ratio
will be used.

## Configuration

| Variable                                | Default | Description                                                         |
| --------------------------------------- | ------- | ------------------------------------------------------------------- |
| \$wasser-viewport-min                   | 320     | Minimum breakpoint                                                  |
| \$wasser-viewport-max                   | 1500    | Maximum breakpoint                                                  |
| \$wasser-scaling-ratio                  | 1.5     | Ratio to calculate $min from $max when \$min is not explicitly set. |
| \$wasser-scaling-ratio-font             | 1.2     | Scaling ratio for font properties.                                  |
| \$wasser-font-size-to-line-height-ratio | 1.5     | Ratio to get line-height from font-size.                            |

These variables can directly be overridden in your CSS after importing wasser, like so:

```
$wasser-viewport-max: 1000;
```

## Browser Support

Tested with IE11+
