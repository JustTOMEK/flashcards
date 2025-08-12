import { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import languages from '../filtered_languages.json'
import { useTranslation } from 'react-i18next'

interface LanguageOption {
    value: string
    label: string
}

interface LanguageSelectorProps {
    onChange: (selected: LanguageOption | null) => void
}

const LanguageSelector = ({ onChange }: LanguageSelectorProps) => {
    const [selectedOption, setSelectedOption] = useState<LanguageOption | null>(
        null
    )
    const { t } = useTranslation()

    const options: LanguageOption[] = languages.map((lang) => ({
        value: lang.code,
        label: lang.name,
    }))

    const handleChange = (newValue: LanguageOption | null) => {
        setSelectedOption(newValue)
        onChange(newValue)
    }

    return (
        <div data-testid="language-selector">
            <CreatableSelect
                inputId="languageSelect"
                isClearable
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder={t('language_selector_1')}
                data-testid="language-select"
                styles={{
                    control: (base, state) => ({
                        ...base,
                        backgroundColor: '#fefae0',
                        borderColor: state.isFocused ? '#bc6c25' : '#ffffff',
                        boxShadow: state.isFocused
                            ? '0 0 0 2px #606c38'
                            : 'none',
                        '&:hover': {
                            borderColor: '#b5c99a',
                        },
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: '#606c38',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: '#606c38',
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: '#fff',
                        zIndex: 10,
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? '#dda15e' : '#fff',
                        color: state.isSelected ? '#606c38' : '#606c38',
                        '&:active': {
                            backgroundColor: '#606c38',
                        },
                    }),
                }}
            />
        </div>
    )
}

export default LanguageSelector
