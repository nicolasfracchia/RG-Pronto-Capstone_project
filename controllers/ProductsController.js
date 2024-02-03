const { Op, where } = require('sequelize');
const { Products, Categories, ProductPrices, Sections } = require('../models');
const CategoryController = require('./CategoryController');
const SectionsController = require('./SectionsController');


const ProductsController = {
    searchData: {
        attributes: ['id', 'name', 'image', 'order'],
        include: [
            {
                model: Categories,
                attributes: ['id', 'name']
            }, {
                model: ProductPrices,
                attributes: ['id', 'concept', 'price'],
                include: {
                    model: Sections,
                    attributes: ['id', 'name', 'web']
                }
            }
        ]
    },
    getProductById: async (ID) => {
        const productId = parseInt(ID);

        if (isNaN(productId)) { return false; }

        try {
            const results = await Products.findByPk(productId, ProductsController.searchData);
            return (!results) ? false : results;
        } catch (error) {
            return { error: error };
        }
    },
    searchByFilters: async (filters) => {
        let where = {}

        if (filters.name) { where.name = filters.name; }
        if (filters.categoryId) { where.categoryId = filters.categoryId; }

        let searchData = { ...ProductsController.searchData };
        searchData.where = where;

        try {
            const results = await Products.findAll(searchData);
            return (!results) ? false : results;
        } catch (error) {
            return { error: error };
        }
    },
    addPrices: async (productId, prices) => {
        let newPrices = [];

        try {
            for (const item of prices) {
                if (item.sectionId) {
                    const sectionExists = await SectionsController.getSectionById(parseInt(item.sectionId));

                    if (sectionExists) {
                        let price = {
                            'productId': productId,
                            'concept': item.concept || '',
                            'price': item.price || 0,
                            'sectionId': sectionExists.id,
                        };
                        newPrices.push(price);
                    }
                }
            }

            try {
                const createdPrices = await ProductPrices.bulkCreate(newPrices);
                return true;
            } catch (error) {
                console.error('Error creating prices:', error);
                return false;
            }
        } catch (error) {
            console.error('Error creating prices:', error);
            return false;
        }

    },
    searchByWebSection: async (web) => {
        try {
            const where = web ? { 'web': web } : {};
            const products = await Sections.findAll({
                where: where,
                include: [{
                    model: ProductPrices,
                    include: [{
                        model: Products,
                        include: [{
                            model: Categories,
                        }]
                    }]
                }],
                order: [['name', 'ASC']],
            });

            return ProductsController.formatResultFromWebSection(products);

        } catch (error) {
            console.error('Error getting products by section:', error);
            return false;
        }
    },
    formatResultFromWebSection: (products) => {
        const p = {
            sections: products.map((section) => {
                return {
                    name: section.name,
                    products: section.ProductPrices.map((productPrice) => {
                        return {
                            product: productPrice.Product.name,
                            category: productPrice.Product.Category.name,
                            prices: [
                                {
                                    concept: productPrice.concept,
                                    price: productPrice.price,
                                },
                            ],
                        };
                    }),
                };
            }),
        };

        // Group prices by produc
        p.sections.forEach((section) => {
            section.products.forEach((product, index) => {
                const existingProductIndex = p.sections.findIndex(
                    (s) => s.name === section.name && s.products.findIndex((p) => p.product === product.product) !== -1
                );

                if (existingProductIndex !== -1 && existingProductIndex !== index) {
                    p.sections[existingProductIndex].products
                        .find((p) => p.product === product.product)
                        .prices.push(...product.prices);
                    // Remove duplicated products
                    section.products.splice(index, 1);
                }
            });
        });
        return p;
    },


    // GET
    getAllProducts: async (req, res) => {
        let filters = {}

        if (req.query.name) { filters.name = { [Op.like]: `%${req.query.name}%` } }
        if (req.query.categoryId) { filters.categoryId = parseInt(req.query.categoryId) }

        try {
            let products = await ProductsController.searchByFilters(filters);

            if (products) {
                res.status(200).send(products);
            } else {
                res.status(404).send({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    getProduct: async (req, res) => {
        const productId = parseInt(req.params.productId);

        if (isNaN(productId)) {
            res.status(500).send({ error: 'The product ID must be a number' });
            return false;
        }

        try {
            let product = await ProductsController.getProductById(productId);

            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    getProductsBySection: async (req, res) => {
        const web = req.params.sectionName;

        try {
            let products = await ProductsController.searchByWebSection(web);

            if (products) {
                res.status(200).send(products);
            } else {
                res.status(404).send({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },

    // POST
    newProduct: async (req, res) => {
        const { name, categoryId, image, order, prices } = req.body;

        if (!name || !categoryId) {
            res.status(500).send('Wrong body params');
            return false;
        }

        try {
            const categoryExists = await CategoryController.getCategoryById(parseInt(categoryId));

            if (!categoryExists || categoryExists.length === 0) {
                res.status(500).send({ error: "The defined category does not exist." });
                return false;
            }

            const newProduct = await Products.create({
                'name': name,
                'categoryId': categoryId,
                image: image || 'default.png',
                order: parseInt(order) || 10,
            });

            if (prices) {
                try {
                    await ProductsController.addPrices(newProduct.id, prices);

                    const product = await ProductsController.getProductById(newProduct.id);
                    res.status(200).send(product);
                } catch (error) {
                    res.status(500).send({ error: error });
                }
            } else {
                res.status(201).send(newProduct);
            }
        } catch (error) {
            res.status(500).send({ error: error })
        }
    },
    addPrice: async (req, res) => {
        const productId = parseInt(req.params.productId);
        const { prices } = req.body;

        try {
            const productExists = await ProductsController.getProductById(productId);

            if (productExists) {
                if (prices) {
                    try {
                        await ProductsController.addPrices(productId, prices);

                        const product = await ProductsController.getProductById(productId);
                        res.status(200).send(product);
                    } catch (error) {
                        res.status(500).send({ error: error });
                    }
                } else {
                    res.status(201).send(newProduct);
                }
            } else {
                res.status(500).send({ error: "The requested product does not exist." });
                return false;
            }

        } catch (error) {
            res.status(500).send({ error: error })
        }

    },

    // PUT
    updateProduct: async (req, res) => {
        try {
            const product = await ProductsController.getProductById(parseInt(req.params.productId));
            if (!product) {
                res.status(404).send("The requested product does not exist");
            } else {
                product.name = req.body.name || product.name;
                product.order = req.body.order || product.order;
                product.image = req.body.image || product.image;
                if (req.body.categoryId) {
                    const category = parseInt(req.body.categoryId);
                    const categoryExists = await CategoryController.getCategoryById(category);

                    if (categoryExists) {
                        product.categoryId = category || product.categoryId;
                    }
                }

                product.save()
                    .then(function (results) {
                        res.status(200).send(results);
                    })
                    .catch(function (error) {
                        res.status(500).send({ error: error });
                    })
            }
        } catch (error) {
            res.status(500).send({ error: error });
        }
    },
    updatePrice: async (req, res) => {
        const priceId = (req.params.priceId);
        const { price, sectionId, concept } = req.body;

        if (isNaN(priceId)) {
            res.status(500).send({ error: 'The price ID must be a number' });
            return false;
        }

        ProductPrices.findByPk(parseInt(priceId))
            .then(function (productPrice) {
                productPrice.concept = concept || price.concept;
                productPrice.price = price || price.concept;
                productPrice.sectionId = (SectionsController.getSectionById(parseInt(sectionId))) ? sectionId : productPrice.sectionId;
                productPrice.save()
                    .then(function (results) {
                        res.status(200).send(results);
                    })
                    .catch(function (error) {
                        res.status(500).send({ error: error });
                    })
            })
            .catch(function (error) {
                res.status(500).send({ error: 'The price was not found' });
            });
    },

    // DELETE
    deleteProductPrice: (req, res) => {
        const priceId = parseInt(req.params.priceId);
        ProductPrices.findByPk(priceId)
            .then((price) => {
                if (price) {
                    price.destroy()
                        .then(function (results) {
                            res.status(200).send(results);
                        })
                        .catch(function (error) {
                            res.status(500).send({ error: error });
                        })
                } else {
                    res.status(500).send({ error: 'The price was not found' });
                }
            })
            .catch(function (error) {
                res.status(500).send({ error: error });
            })

    },
    deleteProduct: (req, res) => {
        const productId = parseInt(req.params.productId);
        Products.findByPk(productId)
            .then((product) => {
                if (product) {
                    product.destroy()
                        .then(function (productResults) {
                            ProductPrices.destroy({ where: { productId: productId } })
                                .then((priceResults) => {
                                    res.status(200).send({ 'product': productResults, 'prices': priceResults });
                                })
                                .catch(function (error) {
                                    res.status(500).send({ error: error });
                                })
                        })
                        .catch(function (error) {
                            res.status(500).send({ error: error });
                        })
                } else {
                    res.status(500).send({ error: 'The product was not found' });
                }
            })
            .catch(function (error) {
                res.status(500).send({ error: error });
            })

    },
};

module.exports = ProductsController;