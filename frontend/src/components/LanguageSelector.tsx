import { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import languages from '../filtered_languages.json'

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

    const options: LanguageOption[] = languages.map((lang) => ({
        value: lang.code,
        label: lang.name,
    }))

    const handleChange = (newValue: LanguageOption | null) => {
        setSelectedOption(newValue)
        onChange(newValue)
    }

    return (
        <div>
            <CreatableSelect
                id="languageSelect"
                isClearable
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder="Type to search or create..."
                
                styles={{
                    control: (base, state) => ({
                        ...base,
                        backgroundColor: '#fefae0',
                        borderColor: state.isFocused ? '#bc6c25' : '#ffffff', // olive on focus
                        boxShadow: state.isFocused ? '0 0 0 2px #606c38' : 'none',
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
                    })

                }}

            />
        </div>
    )
}

export default LanguageSelector
