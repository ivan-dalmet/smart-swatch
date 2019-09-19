import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Tooltip, useClipboard } from '@chakra-ui/core';

const propTypes = {};
const defaultProps = {};

export const CopyCSS = ({ colors }) => {
  const CSS = `
  :root {
    ${colors.map((color, i) =>
      `--color-${(i + 1) * 100}: ${color.hex()};
      `
    ).join('')}
  }
  `;
  const { onCopy, hasCopied } = useClipboard(CSS);

  return (
    <Tooltip
      isOpen={hasCopied}
      label="Paste it your CSS file 😉"
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

CopyCSS.propTypes = propTypes;
CopyCSS.defaultProps = defaultProps;
