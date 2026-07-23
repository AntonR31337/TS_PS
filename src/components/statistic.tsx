import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'

interface IResults {
	length: number
	mistakes: number
}

const StatisticPage: React.FC<IResults> = ({ length, mistakes }: IResults) => {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<Card bordered={false}>
						<Statistic
							title="Скорость"
							value={length}
							precision={0}
							valueStyle={{ color: '#3f8600' }}
							prefix={<ArrowUpOutlined />}
							suffix="сим/мин"
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false}>
						<Statistic
							title="Ошибок"
							value={length > 0 ? (mistakes / length) * 100 : 0}
							precision={1}
							valueStyle={{ color: '#cf1322' }}
							prefix={<ArrowDownOutlined />}
							suffix="%"
						/>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default StatisticPage
