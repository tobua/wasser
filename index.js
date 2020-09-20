let _scalingRatio = 1;
let _viewportMin = 320;
let _viewportMax = 1500;

const _getResponsiveProperty = (max, min, property) => `
    ${property}: calc(${$min} + (${max} - ${min}) * (100vw - ${_viewportMin}) / (${_viewportMax} - ${_viewportMin}));

    @media (min-width: ${_viewportMax}) {
        ${property}: ${max};
    }

    @media (max-width: ${_viewportMin - 1}) {
        ${property}: ${min};
    }

    @media print {
        ${property}: ${max};
    }
`;

export const configure = (scalingRatio) => (_scalingRatio = scalingRatio);

export const wasser = (property, max, min = max / _scalingRatio) => {
  if (typeof max != "number") {
    throw new Error("wasser: A number is expected as the second parameter.");
  }

  _getResponsiveProperty(property, max, min);
};
