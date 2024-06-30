// app.use('*',async (c,next) => {
// 	const { DATABASE_URL } = env<{ DATABASE_URL : string }>(c)
// 	await createConnection(DATABASE_URL)
// 	await next()
// })

import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const app = new Hono()

// post a todo with title and description
app.post('/todos/create', async (c) => {
	// the connection
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())
	
	const body : {
		title : string,
		description : string
	} = await c.req.json()

	const res = await prisma.todos.create({
		data : body
	})

	return c.json(res);
})

// update a todo so that it toggles done
app.put('/todos/update',async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())

	const body : {
		title : string,
		description : string,
		done : boolean
	} = await c.req.json()

	const id = Number(c.req.query('id')) 
	const res = await prisma.todos.update({
		where : {
			id
		},
		data : body
	})
	return c.json(res)
})

// get all todos
app.get('/todos/bulk',async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())

	const todos = await prisma.todos.findMany();
	return c.json(todos)
})

// remove a todo
app.delete('/todos/delete',async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())

	const id = Number(c.req.query('id'))

	const res = await prisma.todos.delete({
		where : {
			id
		}
	})

	return c.json(res)
}) 

app.put('/todos/done',async (c) => {
	const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
	const prisma = new PrismaClient({
		datasourceUrl: DATABASE_URL,
	}).$extends(withAccelerate())

	const id = Number(c.req.query('id'))
	const currentTodo = await prisma.todos.findFirstOrThrow({
		where : {
			id
		}
	})

	const res = await prisma.todos.update({
		where : {
			id
		},
		data : {
			done : !currentTodo.done
		}
	})

	return c.json(res)
})

export default app