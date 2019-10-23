import React from 'react';
import { Button, Tooltip, useClipboard } from '@chakra-ui/core';
import { getColorNumber } from '../utils/getColorNumber';

export const CopyJS = ({ colors }) => {
  const JS = `
{${colors.map((color, i) =>
  `
  ${getColorNumber(i)}: '${color.hex()}',`
).join('')}
}`;

  const { onCopy, hasCopied } = useClipboard(JS);

  return (
    <Tooltip
      isOpen={hasCopied}
      label="Paste it in your JS file 😉"
      placement="top"
      zIndex="6"
    >
      <Button size="xs" onClick={onCopy}>
        {hasCopied
          ? 'Copied! JS object'
          : 'Get JS object'
        }
      </Button>
    </Tooltip>
  );
};
