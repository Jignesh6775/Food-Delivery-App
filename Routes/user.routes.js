const express = require("express")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require("../Models/user.model")
require("dotenv").config()

//Registration
userRouter.post("register", async(req, res) =>{
    const { name, email, password, address } = req.body
    try {
        //Check user
        const userExist = await UserModel.findOne({ email })
        if(userExist){
            return res.status(400).send({ message : 'User already exists, Please go to login.' })
        }

        //Create new user
        bcrypt.hash(password, 5, async (err, hash) =>{
            const user = new UserModel({ name, email, password: hash, address })
            await user.save()
            res.status(201).send({ 'msg': 'User Register Successfully' })
        })

    } catch (err) {
        res.status(404).send({ 'msg': err.message })
    }
})


//Login
userRouter.post("/login", async(req, res) =>{
    const { email, password } = req.body
    try {
        //Check user
        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(404).json({ message : 'Invalid Username..!' })
        }

        //Check password
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(404).json({ message : 'Invalid Password..!' })
        }

        //Create access token
        const accesstoken = jwt.sign({ email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        //Create refresh token
        const refreshtoken = jwt.sign({ email, userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' })

        res.status(201).send({ 'msg': 'User Login Successfully', accesstoken, refreshtoken })

    } catch (err) {
        res.status(404).send({ 'msg': err.message })
    }
})

//Reset Password
userRouter.patch("user/:id/reset", async (req, res) =>{
    try {
        const { id } = req.params
        const { currPass, newPass } = req.body
        const user = await UserModel.findOne({ _id: id })

        bcrypt.compare(currPass, user.password, async (err, result)=>{
            if(result) {
                const hash = bcrypt.hashSync(newPass, 5)
                const updatePass = await UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
                res.status(204).send({ 'msg': 'User Password Reset Successfully' })
            } else {
                res.status(404).send({ 'msg': "Wrong Credentials.!!" })
            }
        })
    } catch (err) {
        res.status(404).send({ 'msg': err.message })
    }
})

module.exports = { userRouter }