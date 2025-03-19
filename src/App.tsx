import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import {
	deleteTodo,
	checked,
	postTodo,
  putTodo,
} from './store/reducers/todoList/todoSlice'
import { useEffect, useState } from 'react'

interface ITodo {
	id: number | string
	title: string
	description: string
	status: boolean
}

const App = () => {
	const { data } = useSelector((state: RootState) => state.todo)
	const dispatch = useDispatch()
	const [open, setOpen] = useState<boolean>(false)
	const [openE, setOpenE] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [desc, setDesc] = useState<string>('')
	const [nameE, setNameE] = useState<string>('')
	const [descE, setdescE] = useState<string>('')
	const [edit, setEdit] = useState<null | ITodo>(null)

	useEffect(() => {
		if (edit) {
			setNameE(edit.title)
			setdescE(edit.description)
		}
	}, [edit])

	const addUser = () => {
		const newTodo: ITodo = {
			id: Date.now(),
			title: name,
			description: desc,
			status: false,
		}
		dispatch(postTodo(newTodo))
		setOpen(false)
		setName('')
		setDesc('')
	}

	const editF = (todo: ITodo) => {
		setEdit(todo)
		setOpenE(true)
	}

  function editTodo()
  {
    const updateTodo = {
      ...edit,
      title : nameE,
      description : descE,
    }
    dispatch(putTodo(updateTodo))
    setOpenE(false)
  }
	return (
		<>
			<div className='flex gap-[10px] items-center w-[90%] justify-between py-[20px] m-auto'>
				<h1 className='text-[black] font-bold text-[30px]'>
					TodoLIST <span className='text-purple-500 font-bold'>REDUX</span>
				</h1>
				<button
					onClick={() => setOpen(true)}
					className='border-2 rounded-md px-[10px] py-[7px] cursor-pointer bg-blue-500 text-[#fff] font-bold'
				>
					+ Add New
				</button>
			</div>
			<table className='w-[90%] m-auto mt-[50px] text-center'>
				<thead className=''>
					<tr className='border-b-2 py-[10px]'>
						<th className=''>Title</th>
						<th className=''>description</th>
						<th className=''>status</th>
						<th className=''>actions</th>
					</tr>
				</thead>
				<tbody className=''>
					{data.map(todo => (
						<tr key={todo.id} className='border-b-2 font-bold'>
							<td className='py-[10px]'>{todo.title}</td>
							<td className='py-[10px]'>{todo.description}</td>
							<td className='py-[10px] w-[200px]'>
								<p
									className={
										todo.status
											? 'text-[#fff] bg-[green] rounded-md font-bold px-[10px] py-[5px]'
											: 'text-[#fff] bg-[red] rounded-md font-bold px-[10px] py-[5px]'
									}
								>
									{todo.status ? 'Active' : 'Inactive'}
								</p>
							</td>
							<td className='py-[10px] w-[300px]'>
								<div className='flex gap-[10px] items-center px-[50px]'>
									<button
										onClick={() => dispatch(deleteTodo(todo.id))}
										className='border-2 font-bold text-[#fff] bg-[red] cursor-pointer px-[10px] py-[5px] rounded-md'
									>
										Delete
									</button>
									<button
										onClick={() => editF(todo)}
										className='border-2 font-bold text-[#fff] bg-blue-700 cursor-pointer px-[10px] py-[5px] rounded-md'
									>
										Edit
									</button>
									<input
										type='checkbox'
										onChange={() => dispatch(checked(todo.id))}
										checked={todo.status}
										className='w-[25px] h-[25px] cursor-pointer'
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{open && (
				<div className='fixed inset-0 flex items-center justify-center'>
					<div className='fixed w-[500px] bg-white rounded-2xl border h-[300px] shadow-2xs'>
						<div className='flex flex-col w-[90%] py-[50px] gap-[30px] m-auto'>
							<input
								value={name}
								onChange={e => setName(e.target.value)}
								type='text'
								placeholder='Title...'
								className='w-full px-[10px] py-[10px] rounded-sm border-2'
							/>
							<input
								value={desc}
								onChange={e => setDesc(e.target.value)}
								type='text'
								placeholder='Description...'
								className='w-full px-[10px] py-[10px] rounded-sm border-2'
							/>
							<div className='flex gap-[10px] items-center'>
								<button
									onClick={addUser}
									className='border-2 text-[#fff] py-[5px] rounded-md cursor-pointer font-bold px-[10px] bg-blue-500'
								>
									Save
								</button>
								<button
									onClick={() => setOpen(false)}
									className='cursor-pointer'
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{openE && (
				<div className='fixed inset-0 flex items-center justify-center'>
					<div className='fixed w-[500px] bg-white rounded-2xl border h-[300px] shadow-2xs'>
						<div className='flex flex-col w-[90%] py-[50px] gap-[30px] m-auto'>
							<input
								value={nameE}
								onChange={e => setNameE(e.target.value)}
								type='text'
								placeholder='Title...'
								className='w-full px-[10px] py-[10px] rounded-sm border-2'
							/>
							<input
								value={descE}
								onChange={e => setdescE(e.target.value)}
								type='text'
								placeholder='Description...'
								className='w-full px-[10px] py-[10px] rounded-sm border-2'
							/>
							<div className='flex gap-[10px] items-center'>
								<button
									onClick={editTodo}
									className='border-2 text-[#fff] py-[5px] rounded-md cursor-pointer font-bold px-[10px] bg-blue-500'
								>
									Save
								</button>
								<button
									onClick={() => setOpenE(false)}
									className='cursor-pointer'
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default App
