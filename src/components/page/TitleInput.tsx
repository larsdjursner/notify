import React from 'react'

type TitleInputProps = {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange, disabled = false }) => {
    return (
        <input
            placeholder="Untitled"
            className="h-16 w-full text-5xl mx-2 focus:outline-none"
            maxLength={32}
            value={value}
            autoComplete="off"
            onChange={(e) => {
                onChange(e.target.value)
            }}
            disabled={disabled}
        />
    )
}

export default TitleInput
