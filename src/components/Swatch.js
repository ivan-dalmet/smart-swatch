import React from 'react';
// import PropTypes from 'prop-types';
import { Box, Stack, Text } from '@chakra-ui/core';
import { Color } from './Color';
import { CopySVG } from './CopySVG';
import { CopyCSS } from './CopyCSS';
import { SaveSketchPalette } from './SaveSketchPalette';

const propTypes = {};
const defaultProps = {};

export const Swatch = ({ title, colors, baseColorIndex }) => {
  return (
    <>
      <Stack
        isInline
        spacing="3"
        mb="2"
        flexWrap="wrap"
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          >
          {title}
        </Text>
        <Box>
          <CopySVG colors={colors} />
        </Box>
        <Box>
          <CopyCSS colors={colors} />
        </Box>
        <Box>
          <SaveSketchPalette colors={colors} />
        </Box>
      </Stack>
      <Stack isInline mb="8" spacing="0">
        {colors.map((color, i) => (
          <Color
            key={color.hex()}
            color={color}
            isActive={baseColorIndex === i}
            title={`color-${(i + 1)*100}`}
            roundedTopLeft={i === 0 ? 'md' : null}
            roundedBottomLeft={i === 0 ? 'md' : null}
            roundedTopRight={i === (colors.length - 1) ? 'md' : null}
            roundedBottomRight={i === (colors.length - 1) ? 'md' : null}
          />
        ))}
    </Stack>
    </>
  );
};

Swatch.propTypes = propTypes;
Swatch.defaultProps = defaultProps;
