import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Tooltip, useClipboard } from '@chakra-ui/core';

const propTypes = {};
const defaultProps = {};

export const CopyJS = ({ colors }) => {
  const JS = `
{${colors.map((color, i) =>
  `
  ${(i + 1) * 100}: '${color.hex()}',`
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

CopyJS.propTypes = propTypes;
CopyJS.defaultProps = defaultProps;
