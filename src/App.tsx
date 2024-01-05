import "./App.css";
import {
  Heading,
  Box,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  ButtonGroup,
  Button,
  Link,
} from "@chakra-ui/react";
import { vocabularyLists } from "./vocabularyLists";
import { VocabularyList } from "./VocabularyList";

function App() {
  return (
    <>
      <Box>
        <Heading size="md">Vocabulary Lists</Heading>
        <Box mt={2}>
          {vocabularyLists.map((list: VocabularyList) => (
            <Card maxW="sm" key={list.id}>
              <CardBody>
                <Image src={list.imageUrl} alt={list.name} borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{list.name}</Heading>
                  <Text>{list.description}</Text>
                </Stack>
                <Divider />
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Link href={`quiz/${list.id}`}>
                    <Button variant="solid" colorScheme="blue">
                      Start Quiz
                    </Button>
                  </Link>
                  <Link href={`list/${list.id}`}>
                    <Button variant="ghost" colorScheme="blue">
                      View list
                    </Button>
                  </Link>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default App;
