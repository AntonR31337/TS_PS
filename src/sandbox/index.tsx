// class Counter extends Component {
//   state = {
//     count2: 0,
//   };

//   componentDidMount(): void {}

//   render(): React.ReactNode {
//     return (
//       <div>
//         <p>Вы нажали {this.state.count2} раз</p>
//         <button
//           onClick={() => this.setState({ count2: this.state.count2 + 1 })}
//         >
//           Нажми меня 2
//         </button>
//       </div>
//     );
//   }
// }

// export default Counter;

import { useLocalStorage } from '../hooks'
import { textStore } from '../store/text-store'
import { useEffect, useMemo, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { fetchUserData, UserDataType } from '../tests/test'

const Counter = () => {
	for (let i = 0; i <= 100; i++) {
		console.log(i)
	}

	// Object.name - просто показывает имя функции или класса
	// Object.call() - вызывается сразу, аргументы после первого перечисляются последовательно
	// Object.apply() - вызывается сразу, аргументы после первого перечисляются в едином массиве
	// Object.bind() - привязывает нужный контекст один раз, аргументы после первого перечисляются последовательно
	//
	// Object[Symbol] - примитивный тип, уникальный и неизменяемый идентификатор
	//
	// Object.values() - получает массив со всеми собственными значениями
	// Object.keys() - получает массив со всеми собственными ключами значений
	// Object.entries() - получает массив массивов с ключами и значениями [[0: "key", 1: "value"]]
	// Object.fromEntries() - преобразует массив массивов с ключами и значениями [[0: "key", 1: "value"]]
	//
	// Object.assign() - копирует в целевой объект (первый аргумент) все последующие объекты (аргументы)
	// ~>>>----> [HEAD] <----<<<~
	// Object.hasOwn()
	// Object.create() - создает объект, первый аргумент объект, а второй - дескрипторы его свойств
	// Object.defineProperty() -
	// Object.defineProperties() -
	// Object.getOwnPropertyDescriptor()
	// Object.getOwnPropertyDescriptors() -
	// Object.getOwnPropertyNames() -
	// Object.getOwnPropertySymbols() -
	//
	// Object.prototype
	// Object.getPrototypeOf()
	// Object.setPrototypeOf()
	//
	// Object.toString() - есть два разных метода, один Object.toString возвращает строковое представление самой функции.
	// Второй, доступный всем объектам, который возвращает строковое представление объекта.
	// Object.groupBy() - группирует по заданным признакам.
	// Object.is() - проверяет на равенства объектов
	//
	// Object.isExtensible()
	// Object.preventExtensions()
	// Object.seal()
	// Object.isSealed()
	// Object.freeze()
	// Object.isFrozen()
	// * Map
	// * Set

	// =============== Array ====================

	// const arr: Array<any> = []

	// arr.join()
	// arr.push()
	// arr.slice()
	// arr.lastIndexOf()
	// arr.indexOf()
	// arr.includes()
	// arr.some()
	// arr.map(item => {})

	// const [user, setUser] = useState<UserDataType>()

	// const fetchData = async () => {
	// 	try {
	// 		const uData = await fetchUserData(1)
	// 		setUser(uData)
	// 	} catch (err) {
	// 		throw err
	// 	}
	// }
	//
	// useEffect(() => {
	// 	fetchData()
	// }, [])
	//
	// useEffect(() => {
	// 	console.log(user)
	// }, [user])

	function changeBalance(getData: (params: any) => any) {
		// debugger
		return function (params: any) {
			const data = getData(params)

			return { ...data, ...params }
		}
	}

	function getName(name: any) {
		return name + name
	}

	const user = changeBalance(getName({ name: 'Anton' }))

	function decorateTableWithUrlState(): (params?: any) => any {
		return function useInitialState(params?: any): any {
			const { showQueryParamsInUrl } = params || {}
			const initialState = {
				sortedInfo: {},
				filteredInfo: {},
				searchText: '',
				searchedColumn: '',
			}

			return { state: initialState }
		}
	}

	return (
		<>
			<Form onFinish={(fromData) => console.log(fromData)}>
				<Form.Item name="text">
					<Input type="text" />
				</Form.Item>

				<Form.Item>
					<Input type="number" />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default Counter
