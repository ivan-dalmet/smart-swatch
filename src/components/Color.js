import React from 'react';
import chroma from 'chroma-js';
import { Icon, Box, Button, AspectRatio, Text, useClipboard } from '@chakra-ui/react';

export const Color = ({ color, title, isActive, ...props }) => {
  const { onCopy, hasCopied } = useClipboard(color.hex());

  return (
    <Box
      w="100%"
      {...props}
      overflow="hidden"
      zIndex={isActive ? 2 : 1}
      transform={isActive ? 'scale(1.1)' : null}
      rounded={isActive ? 'md' : null}
      shadow={isActive ? 'md' : null}
    >
      <AspectRatio ratio={1}>
        <Button
          flexDirection="column"
          onClick={onCopy}
          variant="unstyled"
          backgroundColor={color.hex()}
          align="center"
          justify="center"
          m="0"
          p="2"
          rounded="none"
          fontSize="xs"
          textAlign="center"
          minW="0"
          lineHeight="1.1"
          color={chroma.contrast(color, 'white') < 4.5 ? 'black' : 'white'}
        >
          <Text
            display={{ base: 'none', lg: 'block' }}
            fontWeight="bold"
          >
            {title}
          </Text>
          <Text>
            {hasCopied && <Icon name="check" size="10px" />}
            <Text as="span" display={{ base: 'none', lg: 'block' }}>
              {hasCopied ?
                'Copied' :
                color.hex()}
            </Text>
          </Text>
        </Button>
      </AspectRatio>
    </Box>
  );
};
