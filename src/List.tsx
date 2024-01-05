import { useParams } from 'react-router-dom';
import { vocabularyLists } from './vocabularyLists';
import { Flex, Heading, Text } from '@chakra-ui/react';

function List() {
    const { id } = useParams();

    const filteredVocabularyLists = vocabularyLists.filter((list) => list.id === id);

    if (filteredVocabularyLists.length === 0) {
        return <p>List with id: {id} not found</p>;
    }

    const vocabularyList = filteredVocabularyLists[0];

    return (
        <>
            <Heading size="md">{vocabularyList.name}</Heading>
            {vocabularyList.words.map((word, index) => (
                <Flex key={index} p={5} shadow="md" my="2" borderRadius="lg" justifyContent="space-between">
                    <Text size="md">{word.word}</Text>
                    <Text></Text>
                    <p>{word.translations.en}</p>
                </Flex>
            ))}
        </>
    );
}

export default List;