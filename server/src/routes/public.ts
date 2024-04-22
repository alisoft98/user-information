import express from 'express'

const router = express.Router()

export default router

//  APIs
require('controllers/Auth/controller')
require('controllers/User/controller')


