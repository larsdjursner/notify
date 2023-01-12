import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

interface Props {
    value: string
    text: string
    handleChange: (s: string) => void
    placeholder?: string
    password?: boolean
    required: boolean
    focus?: boolean
}

export default function FormInput({
    text,
    value,
    placeholder,
    password = false,
    required = false,
    focus,
    handleChange,
    ...props
}: Props) {
    const [showPassword, setShowPassword] = useState(false)
    const input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        focus && input.current?.focus()

        return () => {
            input.current?.blur()
        }
    }, [])

    return (
        <div className="flex flex-col justify-between gap-2 h-20">
            <p className="text-lg">{text}</p>

            <div className="flex relative h-12">
                <input
                    className="rounded-md h-full w-full p-4 shadow-md"
                    ref={input}
                    required={required}
                    value={value}
                    placeholder={placeholder}
                    type={showPassword || !password ? "text" : "password"}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {password && (
                    <button
                        className="absolute bottom-4 right-4"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-4 w-4" />
                        ) : (
                            <EyeIcon className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
