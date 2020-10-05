// Reference: https://www.typescriptlang.org/play
export declare const configure: (configuration: {
  scalingRatio?: number
  viewportMin?: number
  viewportMax?: number
  scalingRatioFont?: number
  fontSizeToLineHeightRatio?: number
}) => void
export declare const wasser: (
  property: string,
  max: number,
  min?: number
) => string
export declare const font: (
  max: number,
  min?: number,
  lineHeightRaio?: number
) => string
