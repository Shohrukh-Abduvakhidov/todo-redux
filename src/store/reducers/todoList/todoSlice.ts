import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
	name: 'todoList',
	initialState: {
		data: [
			{
				id: '1',
				title: 'Todo-1',
				description: 'description',
				status: true,
			},
			{
				id: '2',
				title: 'Todo-2',
				description: 'description-2',
				status: false,
			},
			{
				id: '3',
				title: 'Todo-3',
				description: 'description-3',
				status: true,
			},
			{
				id: '4',
				title: 'Todo-4',
				description: 'description-4',
				status: false,
			},
			{
				id: '5',
				title: 'Todo-5',
				description: 'description-5',
				status: true,
			},
		],
	},
	reducers: {
		setData: (state, actions) => {
			state.data = actions.payload
		},
		deleteTodo : (state,actions) => {
			state.data = state.data.filter((todo) => todo.id !== actions.payload)
		},
		checked : (state,actions) => {
			state.data = state.data.map((todo) => todo.id == actions.payload ? {...todo, status : !todo.status} : todo)
		},
		postTodo : (state,actions) => {
			state.data = [...state.data, actions.payload]
		},
		putTodo : (state,actions) => {
			state.data = state.data.map((todo) => todo.id == actions.payload.id ? actions.payload : todo)
		}
	},
})

export const {deleteTodo, checked, postTodo, putTodo} = todoSlice.actions
export default todoSlice.reducer