import express, { Express, Request, Response } from 'express';
import { createUser, getUserByID, getUsers, updateUser, deleteUser } from '../views/users';
import {getBoard} from '../views/main'
const router = express.Router()


//get all users
router.get('/', async (req:Request, res:Response) => {
    let data = await getUsers()
    res.send(data)
})


// get user by ID
router.get('/:id', async (req:Request, res:Response) => {
    let data = await getUserByID(req.params.id)
    res.send(data)
})


// create user
router.post('/new', async (req:Request, res:Response) => {
    let data = await createUser(req.body)
    if (data.status === 201) {
        data = await getBoard()
    }
    res.status(data.status).json(data.json)
})

// update user
router.patch('/:id', async (req:Request, res:Response) => {
    let data = await updateUser(req.params.id, req.body)
    if (data.status === 200) {
        data = await getBoard()
    }
    res.status(data.status).json(data.json)
})


// delete user
router.delete('/:id', async (req:Request, res:Response) => {
    let data = await deleteUser(req.params.id)
    if (data.status === 204) {
        data = await getBoard()
    }
    res.status(data.status).json(data.json)
})

export default router
