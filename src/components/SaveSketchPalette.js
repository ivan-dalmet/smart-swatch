import React from 'react';
// import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';
import FileSaver from 'file-saver';

const propTypes = {};
const defaultProps = {};

export const SaveSketchPalette = ({ colors }) => {
  const fileContent = `
  {
    "compatibleVersion":"2.0",
    "pluginVersion":"2.22",
    "colors":[
      ${colors.map((color, i) => `
        {
          "name": "Color ${(i + 1) * 100}",
          "red": ${color.get('rgb.r')/255},
          "green": ${color.get('rgb.g')/255},
          "blue": ${color.get('rgb.b')/255},
          "alpha": 1
        }
      `).join(',')}
    ]
  }
  `;

  const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});

  return (
    <Button size="xs" onClick={() => { FileSaver.saveAs(blob, "swatch.sketchpalette"); }}>
      Save as .sketchpalette file
    </Button>
  );
};

SaveSketchPalette.propTypes = propTypes;
SaveSketchPalette.defaultProps = defaultProps;
