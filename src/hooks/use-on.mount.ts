import { type EffectCallback, useEffect } from 'react'

export const useOnMount = (fn: EffectCallback) => {
    useEffect(fn, [])
}
