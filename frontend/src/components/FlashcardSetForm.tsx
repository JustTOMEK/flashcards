import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
interface FlashcardSetFormProps {
  userId: string;
  setflashcardSets?: React.Dispatch<React.SetStateAction<any[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LanguageOption {
  label: string;
  value: string;
}

const FlashcardSetForm: React.FC<FlashcardSetFormProps> = ({ userId, setflashcardSets, setShowForm }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('');
  const [sourceLanguageCode, setSourceLanguageCode] = useState<string>('');
  const [targetLanguageCode, setTargetLanguageCode] = useState<string>('');

  const handleAddSet = async () => {
    try {
      const token = localStorage.getItem('token');

      const addRes = await fetch('http://localhost:3000/flashcardSets', {
        method: 'POST',
        headers: {
          token: token ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          userId,
          sourceLanguage,
          targetLanguage,
          sourceLanguageCode,
          targetLanguageCode,
        }),
      });

      const newFlashcardSet = await addRes.json();

      if (setflashcardSets) {
        setflashcardSets((prevSets) => [...prevSets, newFlashcardSet]);
      }

      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating flashcard set:', error);
    }
  };

  return (
    <div className="relative bg-tan p-8 rounded-lg shadow-lg w-full max-w-xl space-y-4">
        <button
            onClick={() => {setShowForm(false), console.log("zabawa")}}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
        >
            X
        </button>

        <h2 className="text-2xl text-olive font-semibold">Create a New Flashcard Set</h2>

        <input
            type="text"
            placeholder="Name"
            value={name}
            className="w-full px-4 py-2 bg-cream text-olive rounded"
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type="text"
            placeholder="Description"
            value={description}
            className="w-full px-4 py-2 bg-cream text-olive rounded"
            onChange={(e) => setDescription(e.target.value)}
        />

        <label className="text-olive">Choose source language:</label>
        <LanguageSelector
            onChange={(selected: LanguageOption | null) => {
            setSourceLanguage(selected?.label || '');
            setSourceLanguageCode(selected?.value || '');
            }}
        />

        <label className="text-olive">Choose target language:</label>
        <LanguageSelector
            onChange={(selected: LanguageOption | null) => {
            setTargetLanguage(selected?.label || '');
            setTargetLanguageCode(selected?.value || '');
            }}
        />

        <button
            onClick={handleAddSet}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
            Add Set
        </button>
    </div>

  );
};

export default FlashcardSetForm;
