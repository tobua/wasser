// Reference: https://www.typescriptlang.org/play
export declare const head: () => string
export declare const wasser: (max: number, min?: number) => string
export declare const font: (
  max: number,
  min?: number,
  lineHeightRaio?: number
) => string
export declare const configure: (configuration: {
  scalingRatio?: number
  viewportMin?: number
  viewportMax?: number
  scalingRatioFont?: number
  fontSizeToLineHeightRatio?: number
}) => void
