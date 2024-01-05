import {Flex, Heading, Divider} from '@chakra-ui/react';

function Header() {
  return (
    <>
      <Flex>
        <Heading color="blue.500">GermanDict</Heading>
      </Flex>
      <Divider />
    </>
  );
}

export default Header;
