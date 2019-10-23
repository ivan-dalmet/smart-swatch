import React from 'react';
// import PropTypes from 'prop-types';
import { Box, Stack, Text } from '@chakra-ui/core';
import { Color } from './Color';
import { CopySVG } from './CopySVG';
import { CopyCSS } from './CopyCSS';
import { CopyJS } from './CopyJS';
import { SaveSketchPalette } from './SaveSketchPalette';
import { getColorNumber } from '../utils/getColorNumber';

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
          my="1"
        >
          {title}
        </Text>
        <Box my="1">
          <CopySVG colors={colors} />
        </Box>
        <Box my="1">
          <CopyCSS colors={colors} />
        </Box>
        <Box my="1">
          <CopyJS colors={colors} />
        </Box>
        <Box my="1">
          <SaveSketchPalette colors={colors} />
        </Box>
      </Stack>
      <Stack isInline mb="8" spacing="0">
        {colors.map((color, i) => (
          <Color
            key={color.hex()}
            color={color}
            isActive={baseColorIndex === i}
            title={`color-${getColorNumber(i)}`}
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
