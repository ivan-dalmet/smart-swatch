import React from 'react';
import { Button, Tooltip, useClipboard } from '@chakra-ui/core';

export const CopySVG = ({ colors }) => {
  const SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" viewBox="0 0 200 20">
    <g fill="none" fill-rule="evenodd">
      ${colors.map((color, i) => `
        <rect
          key="${color.hex()}"
          width="20"
          height="20"
          fill="${color.hex()}"
          x="${20 * i}"
        />
      `).join('')}
    </g>
  </svg>
  `;
  const { onCopy, hasCopied } = useClipboard(SVG);

  return (
    <Tooltip
      isOpen={hasCopied}
      label="Paste it in Figma or Sketch 😉"
      placement="top"
      zIndex="6"
    >
      <Button size="xs" onClick={onCopy}>
        {hasCopied
          ? 'Copied! Figma/Sketch'
          : 'Get for Figma/Sketch'
        }
      </Button>
    </Tooltip>
  );
};
