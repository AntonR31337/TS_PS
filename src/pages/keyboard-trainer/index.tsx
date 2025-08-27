import { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row, Statistic, Typography } from 'antd'
import './styles.css'
import Metronome from '../../components/metronome'
import StatisticPage from '../../components/statistic'
import { useNavigate } from 'react-router-dom'
import { textStore } from '../../store/text-store'
import { observer } from 'mobx-react-lite'
import { observable } from 'mobx'
import { useLocalStorage } from '../../hooks'

const { Countdown } = Statistic

const KeyboardTrainer = observer(() => {
	const navigate = useNavigate()

	const [value, setValue] = useLocalStorage([], 'results')

	const { rightText, leftText, loading, setRightText, setLeftText, resetRightText, resetLeftText } = textStore

	const [isFinish, setIsFinish] = useState<boolean>(false)
	const [isVisibleText, setIsVisibleText] = useState<boolean>(false)
	const [deadline, setDeadline] = useState<number>(0)
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [mistakesCount, setMistakesCount] = useState<number>(0)

	useEffect(() => {
		resetLeftText()
		resetRightText()

		let ignore = false
		if (!ignore) {
			textStore.getNewText()
		}

		return () => {
			ignore = true
		}
	}, [resetLeftText, resetRightText])

	const checkDeadline = () => {
		if (!isFinish && deadline < Date.now()) {
			setDeadline(Date.now() + 60 * 1000 * 1)
		}
	}

	const setResultData = () => {
		setValue([
			...value,
			{
				date: Date.now(),
				length: leftText.length,
				mistakesCount: mistakesCount,
				seqN: value.length + 1,
			},
		])
	}

	const handleKeyPress = (event: KeyboardEvent) => {
		const letter = event.key

		if (letter === 'Shift') {
			return
		}

		if (!isVisibleText) {
			setIsVisibleText(true)
		}

		if (rightText.length === 30 && !loading) {
			textStore.getNewText()
		}

		if (letter !== rightText[0]) {
			setMistakesCount(mistakesCount + 1)
		}

		if (rightText.length > 0 && letter === rightText[0]) {
			checkDeadline()

			setLeftText(leftText.concat(letter))
			setRightText(rightText.slice(1))
		}
	}

	const startGame = () => {
		setIsFinish(false)
		setIsOpenModal(false)
		resetLeftText()
		resetRightText()
		setMistakesCount(0)
		textStore.getNewText()
	}

	useEffect(() => {
		if (isFinish) {
			setIsOpenModal(true)
			setResultData()
		}
	}, [isFinish])

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isFinish) {
			handleKeyPress(event)
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown, mistakesCount])

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Countdown
						value={deadline}
						onFinish={() => {
							setIsFinish(true)
						}}
						style={{ textAlign: 'center' }}
					/>
					<Metronome />
					<Button
						onClick={() => {
							debugger
							setResultData()
						}}
					>
						Check!
					</Button>
				</Col>

				<Col span={24}>
					<Card bordered={true}>
						<div className="wrapper">
							{!isVisibleText ? (
								<Row gutter={[16, 16]}>
									<Typography.Title type={'warning'} style={{ margin: '10px auto' }}>
										Для старта нажмите пробел
									</Typography.Title>
								</Row>
							) : (
								<>
									<div className="left">{leftText}</div>
									<div className="right">{rightText}</div>
								</>
							)}
						</div>
					</Card>
				</Col>
			</Row>

			{/*{!deadline && (*/}
			{/*    <Row gutter={[16, 16]}>*/}
			{/*      <Typography.Title type={'warning'} style={{margin: '10px auto'}} >*/}
			{/*        Для старта начните печатать предложенный текст*/}
			{/*      </Typography.Title>*/}
			{/*    </Row>*/}
			{/*)}*/}

			<Modal
				open={isOpenModal}
				centered
				cancelText={'Еще раз'}
				okText={'Завершить'}
				closeIcon={null}
				onOk={() => navigate('/')}
				onCancel={startGame}
			>
				<StatisticPage length={leftText.length} mistakes={mistakesCount} />
			</Modal>
		</>
	)
})

export default observable(KeyboardTrainer)
