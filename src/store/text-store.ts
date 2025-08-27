import { makeAutoObservable, runInAction } from 'mobx'

const URL = 'https://fish-text.ru/get?'

interface IText {
	status: 'success'
	text: string
}

class TextStore {
	loading: boolean = false
	rightText: string = ''
	leftText: string = ''

	constructor() {
		makeAutoObservable(this)
	}

	getNewText = async (): Promise<void> => {
		try {
			this.loading = true

			const { text }: IText = await fetch(URL + '&type=sentence&number=1').then((res) => res.json())

			runInAction(() => {
				this.rightText += !!this.rightText.length ? ' ' + text : text
				this.loading = false
			})
		} catch (error) {
			this.loading = false
			throw error
		}
	}

	setRightText = (value: string) => {
		this.rightText = value
	}

	setLeftText = (value: string) => {
		this.leftText = value
	}

	resetRightText = () => {
		this.rightText = ''
	}

	resetLeftText = () => {
		this.leftText = ''
	}
}

export const textStore = new TextStore()
