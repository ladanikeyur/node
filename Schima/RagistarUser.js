import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../Config/mailerConfig.js";
import nodemailer from 'nodemailer'
import otpGenerator from 'otp-generator'

const registarUserSchima = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    parmition: { type: String || Number, require: true }
})

const OTPSchima = new mongoose.Schema({
    email: { type: String, require: true },
    OTP: { type: String, require: true },
})

const ragistarUsermodel = mongoose.model("ragistarUser", registarUserSchima)
const userOtpmodel = mongoose.model("UserOtp", OTPSchima)

const ragistarUser = async (req, res, next) => {
    const { email, password, confirmPassword, parmition } = req.body
    const oldEmail = await ragistarUsermodel.findOne({ email: email })

    if (oldEmail) {
        res.status(401).send({ Status: "Faild", Message: "user already exist" })
    } else {
        if (email && password && confirmPassword && parmition) {
            if (password === confirmPassword) {
                const salt = await bcrypt.genSalt(10)
                const hashpassword = await bcrypt.hash(password, salt)
                const user = new ragistarUsermodel({
                    email: email,
                    password: hashpassword,
                    parmition: parmition
                })
                user.save()
                res.status(200).send({ Status: "success", Message: "user register successfully" })
            } else {
                res.status(401).send({ Status: "Faild", Message: "not match password and confirm password" })
            }
        } else {
            res.status(401).send({ Status: "Faild", Message: "required all filde" })
        }
    }
}


const deleteUser = async (req, res) => {
    try {
        const { email } = req.body
        const Id = await ragistarUsermodel.findOne({ email: email })
        if (Id) {
            const a = await ragistarUsermodel.findByIdAndDelete(Id._id)
            res.send({ status: "success", message: "user delete successfully" })
        } else {
            res.status(401).send({ status: "faild", message: "user not exist" })
        }
    } catch (error) {
        res.status(401).send({ status: "faild", message: "user not delete successfully" })
    }
}



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const finduser = await ragistarUsermodel.findOne({ email: email })
        const finduserPassword = await bcrypt.compare(password, finduser.password)
        if (finduser.email === email && finduserPassword === true) {
            const token = await jwt.sign({ id: finduser._id, email: finduser.email }, process.env.JWT_KEY)
            res.status(200).send({ status: "success", message: "user login successfully", token: token })
        } else {
            res.status(401).send({ status: "faild", message: "invalid user id and password" })
        }
    } catch (error) {
        res.send(error)
    }
}

const sendOtp = async (req, res) => {
    const OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const { email } = req.body
    const userEmail = await ragistarUsermodel.findOne({ email: email })
    if (userEmail) {
        let info = await transporter.sendMail({
            from: 'keyurpatel5943@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1>${OTP}</h1>`, // html body
        });
        const salt = await bcrypt.genSalt(10)
        const a = OTP.toString()
        const hasOTP = await bcrypt.hash(a, salt)
        await userOtpmodel.deleteOne({ email: email })
        const Otpdoc = new userOtpmodel({
            email: email,
            OTP: hasOTP
        })
        Otpdoc.save()
        res.status(200).send({ status: "success", message: "OTP send successfully" })
        setTimeout(async () => {
            await userOtpmodel.deleteOne({ email: email })
        }, 60000)
    } else {
        res.status(401).send({ status: "fail", message: "invalide email id" })
    }
}

const verifyOtp = async (req, res) => {
    const { OTP, email } = req.body
    const findOtp = await userOtpmodel.findOne({ email: email })
    const a = OTP.toString()
    const finduserPassword = await bcrypt.compare(a, findOtp?.OTP)
    if (finduserPassword) {
        res.send({ status: "Success", message: "OTP verify successfully" })
        await userOtpmodel.deleteOne({ email: email })
    } else {
        res.status(401).send({ status: "fail", message: "invelide OTP" })
    }
}

const forgotePassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body
        if (email && password && confirmPassword) {
            if (password === confirmPassword) {
                const salt = await bcrypt.genSalt(10)
                const hashpassword = await bcrypt.hash(password, salt)
                const userfind = await ragistarUsermodel.findOne({ email: email })
                await ragistarUsermodel.updateOne({ id: userfind._id.toHexString() }, { password: hashpassword })
                res.send({ status: "success", message: "password change successfully" })
            }
        } else {
            res.status(401).send({ Status: "Faild", Message: "required all filde" })
        }
    } catch (error) {
        res.send(error)
    }
}

const getCurrentUser = async (req, res) => {
    const { token } = req.headers
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const CurrentUser = await ragistarUsermodel.findOne({ id: decoded.id }).select(["email", "parmition"])
    if (CurrentUser) {
        res.status(200).send({ Status: "success", message: "User find successfully", data: CurrentUser })
    }else{
        res.status(401).send({Status:"fail",message:"invelide user"})
    }
}


export { ragistarUser, deleteUser, loginUser, forgotePassword, sendOtp, verifyOtp, getCurrentUser }