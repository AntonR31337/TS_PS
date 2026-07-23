import React, { useEffect } from 'react'
import { Divider, Space, Table, Tag, Typography } from 'antd'
import type { TableProps } from 'antd'

interface DataType {
	key: string
	seqN: number
	date: number
	length: number
	mistakesCount: number
}

const columns: TableProps<DataType>['columns'] = [
	{
		title: '#',
		dataIndex: 'seqN',
		key: '0',
		sorter: true,
	},
	{
		title: 'Дата',
		dataIndex: 'date',
		key: '1',
		sorter: (a, b) => a.date - b.date,
		defaultSortOrder: 'descend',
		render: (text, record) =>
			new Date(text).toLocaleDateString('ru-RU', {
				hour: 'numeric',
				minute: 'numeric',
			}),
	},
	{
		title: 'Скорость зн/м',
		dataIndex: 'length',
		key: '2',
		sorter: true,
	},
	{
		title: 'Ошибок %',
		dataIndex: 'mistakesCount',
		key: '3',
		sorter: true,
	},
]

const ResultsTable: React.FC = () => {
	const [columnData, setColumnData] = React.useState<DataType[]>([])

	useEffect(() => {
		const tableD = localStorage.getItem('results')

		tableD && setColumnData(JSON.parse(tableD))
	}, [])

	return (
		<>
			<Divider>
				<Typography.Title>История </Typography.Title>
			</Divider>
			<Table<DataType> columns={columns} dataSource={columnData} />
		</>
	)
}

export default ResultsTable
