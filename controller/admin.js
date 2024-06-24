const admin = require('../models/index').admin
const md5 = require('md5')

const jsonwebtoken = require('jsonwebtoken')
const SECRET_KEY = "ybgtlh"

exports.Login = async (request, response) => {
    try {
        const data = { //email dan password admin
            email: request.body.email,
            password: (request.body.password)
        }
        console.log(data) 
        const cariAdmin = await admin.findOne({ where: data }) 
        console.log(md5(request.body.password));
        if (cariAdmin == null) {
            return response.status(400).json({
                message: "You can't log in"
            })
        }
        let tokenPayLoad = { //data di dalam token
            id_admin: cariAdmin.id,
            nama: cariAdmin.nama,
            email: cariAdmin.email,
        }
        tokenPayLoad = JSON.stringify(tokenPayLoad) //dibikin jadi token
        let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY)
        return response.status(200).json({
            status: true,
            message: "You are logged in",
            data: {
                id_admin: cariAdmin.id,
                nama: cariAdmin.nama,
                email: cariAdmin.email,
                token: token
            }
        })
    }
    catch (error) {
        console.log(error);
        return response.status(400).json({
            message: error
})
}
}