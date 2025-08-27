import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, Result, theme } from 'antd'
import KeyboardTrainer from './pages/keyboard-trainer'
import Home from './pages/home'
import Counter from './sandbox'

const { Header, Sider, Content } = Layout

const App: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const navigate = useNavigate()

	return (
		<Layout style={{ height: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					onClick={({ key }) => {
						navigate(key)
					}}
					items={[
						{
							key: '/',
							icon: <HomeOutlined />,
							label: 'Главная',
						},
						{
							key: '/test-page',
							icon: null,
							label: 'Test page',
							disabled: false,
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
						overflow: 'auto',
					}}
				>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/keyboard-trainer" element={<KeyboardTrainer />} />
						<Route path="/test-page" element={<Counter />} />
						<Route
							path="*"
							element={
								<Result
									status="404"
									title="404"
									subTitle="Sorry, the page you visited does not exist."
									extra={
										<Button type="primary" onClick={() => navigate('/')}>
											Back Home
										</Button>
									}
								/>
							}
						/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default App
