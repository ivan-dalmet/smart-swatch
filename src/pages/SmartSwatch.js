import React, { useState } from 'react';
import chroma from 'chroma-js';
import { SketchPicker } from 'react-color';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/core';

import { FaPalette } from "react-icons/fa";

import { Swatch } from '../components/Swatch';

export const SmartSwatch = () => {
  const [userColorInput, setUserColorInput] = useState('#C70833');

  const lightnessMap = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];
  const saturationMap = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];
  const hueMap = [32, 16, 8, 4, 0, 0, 4, 8, 16, 32];

  const userColor = chroma.valid(userColorInput.trim())
    ? chroma(userColorInput.trim())
    : chroma('#000');

  const lightnessGoal = userColor.get('hsl.l');
  const closestLightness = lightnessMap.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal)
    ? curr
    : prev
  );

  const baseColorIndex = lightnessMap.findIndex(l => l === closestLightness);

  const colors = lightnessMap
    .map((l) => userColor.set('hsl.l', l))
    .map(color => chroma(color))
    .map((color, i) => {
      const saturationDelta = saturationMap[i] - saturationMap[baseColorIndex];
      return saturationDelta >= 0
        ? color.saturate(saturationDelta)
        : color.desaturate(saturationDelta * -1);
    });

  const colorsHueUp = colors
    .map((color, i) => {
      const hueDelta = hueMap[i] - hueMap[baseColorIndex];
      return hueDelta >= 0
        ? color.set('hsl.h', `+${hueDelta}`)
        : color.set('hsl.h', `-${(hueDelta * -1) / 2}`)
    });

  const colorsHueDown = colors
    .map((color, i) => {
      const hueDelta = hueMap[i] - hueMap[baseColorIndex];
      return hueDelta >= 0
        ? color.set('hsl.h', `-${hueDelta}`)
        : color.set('hsl.h', `+${(hueDelta * -1) / 2}`)
    });

  return (
    <>
      <FormControl mb="4">
        <FormLabel htmlFor="color">
          Choose a color
        </FormLabel>
        <Popover placement="bottom-start">
          <>
            <InputGroup>
              <InputLeftElement>
                <PopoverTrigger>
                  <IconButton size="xs" icon={FaPalette} />
                </PopoverTrigger>
              </InputLeftElement>
              <Input
                id="color"
                onChange={e => setUserColorInput(e.target.value)}
                value={userColorInput}
                placeholder="e.g. #C70833 or SeaGreen"
              />
            </InputGroup>
            <PopoverContent zIndex={4} w="auto" color="black">
              <SketchPicker
                color={userColorInput}
                onChangeComplete={color => setUserColorInput(color.hex)}
                disableAlpha
                presetColors={[
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
                ]}
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
    </>
  );
};
