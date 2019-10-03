import React, { useRef, useState } from 'react';
// import PropTypes from 'prop-types';
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

const propTypes = {};
const defaultProps = {};

const defaultName = 'color';

export const SaveSketchPalette = ({ colors }) => {
  const initialFocusRef = useRef();
  const [colorName, setColorName] = useState(defaultName);
  const fileContent = `
  {
    "compatibleVersion":"2.0",
    "pluginVersion":"2.22",
    "colors":[
      ${colors.map((color, i) => `
        {
          "name": "${colorName || defaultName} ${(i + 1) * 100}",
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
    <Popover placement="bottom" initialFocusRef={initialFocusRef}>
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

SaveSketchPalette.propTypes = propTypes;
SaveSketchPalette.defaultProps = defaultProps;
