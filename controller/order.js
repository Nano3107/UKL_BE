

const detail = require('../models/index').order_detail
const order = require('../models/index').order_list

exports.order = async (request, response) => {
    if (!request.body.order_detail) {
        return response.status(400).json({ error: 'Order details are missing.' });
    }

    let dataOrder = {
        customer_name: request.body.customer_name,
        table_number: request.body.table_number,
        order_date: request.body.order_date,
        status : request.body.status
    }
    order.create(dataOrder)
        .then(result => {
            
            let order_detail = request.body.order_detail
            let order_id = result.id
            let total = 0
            
            

            for (let i = 0; i < order_detail.length; i++) {
                order_detail[i].order_id = order_id
                order_detail[i].price = order_detail[i].quantity * order_detail[i].price;
                total += order_detail[i].price;
                if(order_detail[i].quantity<0) {
                    return response.json({
                        message: 'ini orderan anda Tuan'
                    })
                }
            }
            detail.bulkCreate(order_detail)
                .then(result => {
                    return response.json({
                        success: true,
                        data: result,
                        message: 'Order list created'
                    })
                })
                .catch(error => {
                    return response.json({
                        success: false,
                        message: error.message
                    })
                })
        })
}

exports.orderHistory = async (req, res) => {
    try {
        let data = await order.findAll({
            include:
                [
                    {
                        model: detail,
                        as: 'order_detail'
                    }
                ]
        })
        return res.status(200).json({
            status: true,
            data: data,
            message: "Order list loaded"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
exports.updateOrder = async (request, response) => {

upload(request, response, async error => {
    if (error) {
        return response.json({ message: error })
    }
    let id = request.params.id
    let updatedMenu = {
        name: request.body.name,
        spicy_level: request.body.spicy_level,
        price: request.body.price,
        status : request.body.status
        // image: request.file.filename
    }
    if (request.file) {
        const menu = await food.findOne({
            where: { id: id }
        })
        const fotolama = menu.image
        const pathfoto = path.join(__dirname, '../image', fotolama)
        if (fs.existsSync(pathfoto)) {
            fs.unlinkSync(pathfoto, error => console.log(error))
        }
        updatedMenu.image = request.file.filename
    }
    food.update(updatedMenu, { where: { id: id } })
        .then(result => {
            if (result[0] === 1) {
                return food.findByPk(id)
                    .then(updatedMenu => {
                        return response.json({
                            success: true,
                            data: updatedMenu,
                            message: 'Data food has been updated'
                        })
                    })
                    .catch(error => {
                        return response.json({
                            success: false,
                            message: error.message
                        })
                    })
            } else {
                return response.json({
                    success: false,
                    message: 'Data food not found or not updated'
                })
            }
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
})
}