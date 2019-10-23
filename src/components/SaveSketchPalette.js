import React, { useRef, useState } from 'react';
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  FormControl,
  FormLabel,
  PopoverArrow,
  Stack,
} from '@chakra-ui/core';
import filenamify from 'filenamify';
import FileSaver from 'file-saver';
import { getColorNumber } from '../utils/getColorNumber';

const defaultName = 'color';

export const SaveSketchPalette = ({ colors }) => {
  const initialFocusRef = useRef();
  const [colorName, setColorName] = useState(defaultName);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const fileContent = `
  {
    "compatibleVersion":"2.0",
    "pluginVersion":"2.22",
    "colors":[
      ${colors.map((color, i) => `
        {
          "name": "${colorName || defaultName} ${getColorNumber(i)}",
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
  const filename = colorName ? `${colorName.toLowerCase()}-` : '';

  return (
    <Popover
      isOpen={isPopoverOpen}
      placement="bottom"
      initialFocusRef={initialFocusRef}
      onOpen={() => setIsPopoverOpen(true)}
      onClose={() => setIsPopoverOpen(false)}
    >
      <PopoverTrigger>
        <Button size="xs">
          Save as .sketchpalette file
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverArrow />
        <PopoverBody
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            FileSaver.saveAs(blob, filenamify(`${filename}swatch.sketchpalette`));
            setIsPopoverOpen(false);
            setColorName(defaultName);
          }}
        >
          <FormControl>
            <FormLabel htmlFor="sketch-palette-color-name">
              Color name
            </FormLabel>
            <Stack isInline>
              <Input
                id="sketch-palette-color-name"
                ref={initialFocusRef}
                value={colorName}
                onChange={e => setColorName(e.target.value)}
              />
              <Button type="submit" flex="none">
                Download
              </Button>
            </Stack>
          </FormControl>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
