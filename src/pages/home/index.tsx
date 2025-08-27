import React, { useEffect, useState } from 'react'
import StatisticPage from '../../components/statistic'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import ResultsTable from '../../components/results-table'
import { useLocalStorage } from '../../hooks'

const Home: React.FC = () => {
	const navigate = useNavigate()

	const [results] = useLocalStorage([], 'results')

	useEffect(() => {
		console.log(results)
	}, [results])

	return (
		<>
			<StatisticPage length={0} mistakes={0} />
			<Flex style={{ marginTop: '16px' }}>
				<Button danger type="primary" style={{ margin: 'auto' }} onClick={() => navigate('/keyboard-trainer')}>
					Старт
				</Button>
			</Flex>
			<ResultsTable />
		</>
	)
}

export default Home
