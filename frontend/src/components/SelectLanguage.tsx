import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import languages from '../filtered_languages.json';

interface LanguageOption {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  onChange: (selected: LanguageOption | null) => void;
}

const LanguageSelector = ({ onChange }: LanguageSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<LanguageOption | null>(null);

  const options: LanguageOption[] = languages.map(lang => ({
    value: lang.code,
    label: lang.name
  }));

  const handleChange = (newValue: LanguageOption | null) => {
    setSelectedOption(newValue);
    onChange(newValue);
    console.log('Selected:', newValue);
  };

  return (
    <div>
      <CreatableSelect
        id="languageSelect"
        isClearable
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Type to search or create..."
      />
    </div>
  );
};

export default LanguageSelector;
