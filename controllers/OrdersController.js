const { Op, where } = require('sequelize');
const { Orders, OrdersProducts, OrdersStatus, Users, ProductPrices, Products, Sections, Categories } = require('../models');
const productsControler = require('./ProductsController');

const OrdersController = {
    searchData: {
        attributes: ['id', 'createdAt', 'updatedAt', 'forDate', 'forTime', 'total', 'points'],
        include: [
            {
                model: OrdersStatus,
                attributes: ['id', 'name']
            }, {
                model: Users,
                attributes: ['id', 'name', 'lastName', 'email', 'address']
            },{
                model: OrdersProducts,
                attributes: ['unitPrice', 'quantity'],
                include: [
                    {
                        model: ProductPrices,
                        attributes: ['concept', 'price'],
                        include: [
                            {
                                model: Products,
                                attributes: ['name'],
                                include: [
                                    {
                                        model: Categories,
                                        attributes: ['name']
                                    }
                                ]
                            },{
                                model: Sections,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            }
        ]
    },
    getFullOrderById: async (ID) => {
        const orderId = parseInt(ID);

        if (isNaN(orderId)) { return false; }

        try {
            const order = await Orders.findByPk(orderId, OrdersController.searchData);
            return (!order) ? false : order;
        } catch (error) {
            return { error: error };
        }
    },
    getOrderProductsDetail: async (products) => {
        let orderTotal = 0;
        let orderProducts = [];

        for (const pp of products) {
            const productPrice = await productsControler.getProductPriceById(pp.productPriceId);
            if (productPrice) {
                orderTotal += productPrice.price * pp.quantity;
                orderProducts.push({
                    productPricesId: productPrice.id,
                    quantity: pp.quantity,
                    unitPrice: productPrice.price
                });
            }
        }

        return { "total": orderTotal, "products": orderProducts };
    },
    createOrder: async (userId, forDate, forTime, total, points) => {
        const newOrder = await Orders.create({
            'userId': userId,
            'ordersstatusesId': 1,
            'forDate': forDate,
            'forTime': forTime,
            'total': total,
            'points': points
        });

        return newOrder.dataValues.id;
    },
    addProductsToOrder: async (orderId, products) => {
        const productsWithOrderId = products.map(product => {
            return {
                ...product,
                orderId: orderId
            };
        });
        console.log('PRODUCTS BULK WITH ORDER ID: ', productsWithOrderId);
        const addProducts = await OrdersProducts.bulkCreate(productsWithOrderId);
        return addProducts;
    },

    // GET
    

    // POST
    
    newOrder: async (req, res) => {
        const userRole = req.userRole;
        const userId = req.userId;
        const { forDate, forTime, points, productPrices } = req.body;

        if (!forDate || !forTime || !productPrices) {
            res.status(500).send('Wrong body params');
            return false;
        }

        // Get order total and products with current price
        const productsDetails = await OrdersController.getOrderProductsDetail(productPrices);
        // Create the order and return its ID
        const orderId = await OrdersController.createOrder(userId, forDate, forTime, productsDetails.total, points);
        // Creates the ordersProducts records and returns boolean
        const addProducts = await OrdersController.addProductsToOrder(orderId, productsDetails.products);
        // Get full order to return
        const fullOrder = await OrdersController.getFullOrderById(orderId);

        res.status(200).send(fullOrder);
    },

    // PUT
    

    // DELETE
    
};

module.exports = OrdersController;