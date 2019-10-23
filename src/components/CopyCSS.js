import React from 'react';
import { Button, Tooltip, useClipboard } from '@chakra-ui/core';
import { getColorNumber } from '../utils/getColorNumber';

export const CopyCSS = ({ colors }) => {
  const CSS = `
:root {${colors.map((color, i) =>
  `
  --color-${getColorNumber(i)}: ${color.hex()};`
  ).join('')}
}`;
  const { onCopy, hasCopied } = useClipboard(CSS);

  return (
    <Tooltip
      isOpen={hasCopied}
      label="Paste it in your CSS file 😉"
      placement="top"
      zIndex="6"
    >
      <Button size="xs" onClick={onCopy}>
        {hasCopied
          ? 'Copied! CSS variables'
          : 'Get CSS variables'
        }
      </Button>
    </Tooltip>
  );
};
