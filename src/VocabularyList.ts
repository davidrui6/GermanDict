export interface VocabularyList {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  words: VocabularyWord[];
}

export interface VocabularyWord {
  word: string;
  imageUrl?: string;
  translations: {
    en: string;
    es: string;
  };
}
