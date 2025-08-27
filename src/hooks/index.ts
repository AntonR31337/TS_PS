import { Dispatch, useEffect, useState } from 'react'

export interface IResults {
	date: Date
	length: number
	mistakesCount: number
	seqN: number
}

const useLocalStorage = (initialValue: any, valueKey: string) => {
	const getValue: any = () => {
		const localData = localStorage.getItem(valueKey)

		if (localData) {
			return JSON.parse(localData)
		} else {
			return initialValue
		}
	}

	const [value, setValue] = useState(getValue)

	useEffect(() => {
		localStorage.setItem(valueKey, JSON.stringify(value))
	}, [value, valueKey])

	return [value, setValue]
}

export { useLocalStorage }
