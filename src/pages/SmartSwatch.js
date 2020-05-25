import React, { useState } from 'react';
import chroma from 'chroma-js';
import { SketchPicker } from 'react-color';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  Switch,
  Text,
  Link,
  useColorMode,
  useClipboard,
} from '@chakra-ui/core';
import { FaPalette, FaHeart } from "react-icons/fa";

import { Swatch } from '../components/Swatch';
import { Logo } from '../components/Logo';

const PRESET_COLORS = [
  '#C70833',
  '#E53E3E',
  '#F6AD55',
  '#F6E05E',
  '#48BB78',
  '#4FD1C5',
  '#4299E1',
  '#0BC5EA',
  '#805AD5',
  '#D53F8C',
  '#718096',
];
const DEFAULT_USER_COLOR_STRING = PRESET_COLORS[0];
const UNKNOWN_USER_COLOR_STRING = '#000';
const LIGHTNESS_MAP = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];
const SATURATION_MAP = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];
const HUE_MAP = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];

const getColorStringFromHash = () => {
  const sanitizedHash = window.location.hash.replace(UNKNOWN_USER_COLOR_STRING, '');
  return chroma.valid(sanitizedHash) ? chroma(sanitizedHash).name() : DEFAULT_USER_COLOR_STRING;
}

const getUserColorChroma = (colorString, fallbackValue = UNKNOWN_USER_COLOR_STRING) => chroma.valid(colorString)
  ? chroma(colorString)
  : chroma(fallbackValue);

export const SmartSwatch = () => {
  const [userColorInput, setUserColorInput] = useState(getColorStringFromHash());
  const [userColorChroma, setUserColorChroma] = useState(getUserColorChroma(userColorInput.trim()));
  const { colorMode, toggleColorMode } = useColorMode();

  const { onCopy, hasCopied } = useClipboard(window.location);

  React.useEffect(() => {
    setUserColorChroma(getUserColorChroma(userColorInput.trim()));
  }, [userColorInput]);

  const handleColorChange = (newColor) => {
    setUserColorInput(newColor);
    window.location.hash = chroma.valid(newColor) ? newColor : '';
  }

  const lightnessGoal = userColorChroma.get('hsl.l');
  const closestLightness = LIGHTNESS_MAP.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal)
    ? curr
    : prev
  );

  const baseColorIndex = LIGHTNESS_MAP.findIndex(l => l === closestLightness);

  const colors = LIGHTNESS_MAP
    .map((l) => userColorChroma.set('hsl.l', l))
    .map(color => chroma(color))
    .map((color, i) => {
      const saturationDelta = SATURATION_MAP[i] - SATURATION_MAP[baseColorIndex];
      return saturationDelta >= 0
        ? color.saturate(saturationDelta)
        : color.desaturate(saturationDelta * -1);
    });

  const colorsHueUp = colors
    .map((color, i) => {
      const hueDelta = HUE_MAP[i] - HUE_MAP[baseColorIndex];
      return hueDelta >= 0
        ? color.set('hsl.h', `+${hueDelta}`)
        : color.set('hsl.h', `+${(hueDelta * -1) / 2}`)
    });

  const colorsHueDown = colors
    .map((color, i) => {
      const hueDelta = HUE_MAP[i] - HUE_MAP[baseColorIndex];
      return hueDelta >= 0
        ? color.set('hsl.h', `-${hueDelta}`)
        : color.set('hsl.h', `-${(hueDelta * -1) / 2}`)
    });

  return (
    <>
      <Stack isInline align="flex-end" mb="2">
        <Logo colors={colors} />
        <Stack isInline ml="auto" align="center" mb="1">
          <Icon name="moon" size="14px" opacity={colorMode !== 'dark' ? '0.3' : null} />
          <Switch
            size="md"
            isChecked={colorMode === 'light'}
            onChange={toggleColorMode}
            color="none"
          />
          <Icon name="sun" size="14px" opacity={colorMode !== 'light' ? '0.3' : null} />
        </Stack>
      </Stack>
      <FormControl mb="6">
        <FormLabel htmlFor="color" fontWeight="bold">
          Choose a color
        </FormLabel>
        <Popover placement="bottom-start">
          <>
            <Flex>
              <InputGroup flex={1}>
                <InputLeftElement>
                  <PopoverTrigger>
                    <IconButton
                      size="xs"
                      icon={FaPalette}
                    />
                  </PopoverTrigger>
                </InputLeftElement>
                <Input
                  id="color"
                  onChange={e => handleColorChange(e.target.value)}
                  value={userColorInput}
                  placeholder="e.g. #C70833 or SeaGreen"
                />
                <Button onClick={onCopy} ml={2}>
                  {hasCopied ? "Copied!" : "Copy URL"}
                </Button>
              </InputGroup>
            </Flex>
            <PopoverContent zIndex={4} w="auto" color="black">
              <SketchPicker
                color={userColorInput}
                onChangeComplete={color => handleColorChange(color.hex)}
                disableAlpha
                presetColors={PRESET_COLORS}
              />
            </PopoverContent>
          </>
        </Popover>
      </FormControl>

      <Swatch
        title="Base"
        colors={colors}
        baseColorIndex={baseColorIndex}
      />
      <Swatch
        title="Hue Up"
        colors={colorsHueUp}
        baseColorIndex={baseColorIndex}
      />
      <Swatch
        title="Hue Down"
        colors={colorsHueDown}
        baseColorIndex={baseColorIndex}
      />

      <Stack
        isInline
        fontSize="sm"
        textAlign="center"
        mt="12"
        align="center"
        justify="center"
        color="gray.500"
      >
        <Text>Developed with</Text>
        <Box as={FaHeart} size="12px" />
        <Text>by</Text>
        <Link href="https://ivan.dalmet.fr" color={colors[5].hex()}>
          Ivan Dalmet
        </Link>
        <Text>-</Text>
        <Link href="https://github.com/ivan-dalmet/smart-swatch" color={colors[5].hex()}>
          GitHub
        </Link>
      </Stack>
    </>
  );
};
