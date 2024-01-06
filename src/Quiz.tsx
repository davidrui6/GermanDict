import { useParams } from "react-router-dom";
import { vocabularyLists } from "./vocabularyLists";
import {
  Box,
  Heading,
  Card,
  Input,
  Button,
  Flex,
  ButtonGroup,
  Switch,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { VocabularyWord } from "./VocabularyList";

function Quiz() {
  const { id } = useParams();
  const [randomWord, setRandomWord] = useState<VocabularyWord>();
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<
    VocabularyWord[]
  >([]);
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [multipleChoiceMode, setMultipleChoiceMode] = useState<boolean>(false);

  useEffect(() => {
    getRandomWord();
  }, []);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * vocabularyList.words.length);
    const randomWord = vocabularyList.words[randomIndex];
    setRandomWord(randomWord);
    getMultipleChoiceAnswers(randomWord);
  };

  const getMultipleChoiceAnswers = (randomWord: VocabularyWord) => {
    const newMultipleChoiceAnswers: VocabularyWord[] = [randomWord]; // Create a new array to store the new answers

    while (newMultipleChoiceAnswers.length < 3) {
      const randomIndex = Math.floor(
        Math.random() * vocabularyList.words.length
      );
      const randomWord = vocabularyList.words[randomIndex];
      if (
        newMultipleChoiceAnswers.filter((word) => word.word === randomWord.word)
          .length === 0
      ) {
        newMultipleChoiceAnswers.push(randomWord);
      }
    }

    // Shuffle the array
    for (let i = newMultipleChoiceAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = newMultipleChoiceAnswers[i];
      newMultipleChoiceAnswers[i] = newMultipleChoiceAnswers[j];
      newMultipleChoiceAnswers[j] = temp;
    }

    setMultipleChoiceAnswers(newMultipleChoiceAnswers); // Set the new answers
  };

  const filteredVocabularyLists = vocabularyLists.filter(
    (list) => list.id === id
  );

  if (filteredVocabularyLists.length === 0) {
    return <p>Quiz with id: {id} not found</p>;
  }

  const vocabularyList = filteredVocabularyLists[0];

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = () => {
    if (answer === randomWord?.word) {
      setIsRightAnswer(true);
    }
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading size="md">{vocabularyList.name}</Heading>
        <Flex>
          <Text mr={2}>Multiple choice</Text>
          <Switch
            mt={1}
            onChange={() => setMultipleChoiceMode(!multipleChoiceMode)}
          />
        </Flex>
      </Flex>
      <Card mt={2}>
        <Box p={4}>
          {randomWord?.imageUrl ? (
            <Image height={200} src={randomWord?.imageUrl} borderRadius="lg" />
          ) : null}
          <Flex justifyContent="center" my={4}>
            <Heading size="sm">{randomWord?.translations.en}</Heading>
          </Flex>
          {multipleChoiceMode ? (
            <Flex flexDirection="column">
              {multipleChoiceAnswers.map((answer) => (
                <Button
                  key={answer.word}
                  onClick={() => {
                    if (answer === randomWord) {
                      setIsRightAnswer(true);
                    }
                  }}
                  my={1}
                >
                  {answer.word}
                </Button>
              ))}

              {isRightAnswer ? (
                <Button
                  mt={4}
                  onClick={() => {
                    setIsRightAnswer(false);
                    getRandomWord();
                    setAnswer("");
                  }}
                  colorScheme="blue"
                >
                  Next
                </Button>
              ) : null}
            </Flex>
          ) : (
            <>
              <Input
                placeholder="Type your answer"
                value={answer}
                onChange={handleAnswerChange}
              />
              <Flex justifyContent="center">
                <ButtonGroup spacing="2" mt={4}>
                  <Button onClick={handleAnswerSubmit}>Submit</Button>
                  {isRightAnswer ? (
                    <Button
                      onClick={() => {
                        setIsRightAnswer(false);
                        getRandomWord();
                        setAnswer("");
                      }}
                      colorScheme="blue"
                    >
                      Next
                    </Button>
                  ) : null}
                </ButtonGroup>
              </Flex>
            </>
          )}
        </Box>
      </Card>
    </>
  );
}

export default Quiz;
