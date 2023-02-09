import { deleteUser, forgotePassword, getCurrentUser, loginUser, ragistarUser, sendOtp, verifyOtp } from "../Schima/RagistarUser.js"


export const AddUser = (req, res) => {
    try {
        ragistarUser(req, res)
    } catch (error) {
        res.send(error)
    }
}


export const deleteUsers = (req, res) => {
    try {
        deleteUser(req, res)
    } catch (error) {
        res.send(error)
    }
}

export const loginUsers = (req, res) => {
    try {
        loginUser(req, res)
    } catch (error) {
        res.send(error)
    }
}


export const forgotePasswords = (req, res) => {
    try {
        forgotePassword(req, res)
    } catch (error) {
        res.send(error)
    }
}


export const sendOtps = (req, res) => {
    try {
        sendOtp(req, res)
    } catch (error) {
        res.send(error)
    }
} 

export const Otpverifys = (req, res) => {
    try {
        verifyOtp(req, res)
    } catch (error) {
        res.send(error)
    }
} 

export const getCurrentUserdetails = (req, res) => {
    try {
        getCurrentUser(req, res)
    } catch (error) {
        res.send(error)
    }
} 

