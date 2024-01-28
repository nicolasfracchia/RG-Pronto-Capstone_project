const { Op, where } = require('sequelize');
const {
    Users,
    UserTypes
} = require('../models');

const UserController = {
    searchData: {
        attributes: ['id','name','lastName','address','email'],
        include: [{
            model: UserTypes,
            attributes: ['id','type']
        }]
    },
    getUserById: async (ID) => {
        const userId = parseInt(ID);

        if (isNaN(userId)){ return false; }

        try {
            const results = await Users.findByPk(userId, UserController.searchData);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },
    searchByFilters: async (filters) => {
        let where = {}
        
        if(filters.type){ where.usertypesId = parseInt(filters.type)}
        if(filters.name){ where.name = filters.name; }
        if(filters.lastName){ where.lastName = filters.lastName; }
        if(filters.email){ where.email = filters.email; }
        if(filters.address){ where.address = filters.address; }

        let searchData = {...UserController.searchData};
        searchData.where = where;

        try {
            const results = await Users.findAll(searchData);
            return (!results) ? false : results;
        } catch (error) {
            return {error: error};
        }
    },

    // GET
    getAllUsers: async (req, res) => {

        let filters = {}
        
        if(req.query.type){ filters.usertypesId = parseInt(req.query.type)}
        if(req.query.name){ filters.name = { [Op.like]: `%${req.query.name}%` }}
        if(req.query.lastName){ filters.lastName = { [Op.like]: `%${req.query.lastName}%` }}
        if(req.query.email){ filters.email = { [Op.like]: `%${req.query.email}%` }}
        if(req.query.address){ filters.address = { [Op.like]: `%${req.query.address}%` }}

        try {
            let users = await UserController.searchByFilters(filters);

            if (users) {
                res.status(200).send(users);
            }else{
                res.status(404).send({error: 'User not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    getUser: async (req, res) => {
        const userId = parseInt(req.params.userId);
        
        if (isNaN(userId)){
            res.status(500).send({error: 'The user ID must be a number'});
            return false;
        }
        
        try {
            let user = await UserController.getUserById(userId);

            if (user) {
                res.status(200).send(user);
            }else{
                res.status(404).send({error: 'User not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    },
    
    // POST
    newUser: async (req, res) => {
        const { type, name, lastName, email, address } = req.body;
        
        if(!type || !name || !lastName || !email || !address){
            res.status(500).send('Wrong body params');
            return false;
        }

        try{
            // TO-DO: VALIDATE TYPE BY ID, NOT JUST INTEGER
            const userExists = await UserController.searchByFilters({email: email});

            if(userExists && userExists.length > 0){
                res.status(500).send({error: "An user with that email already exists."})
            }else{
                Users.create({'usertypesId': type, 'name': name, 'lastName': lastName, 'email': email, 'address': address})
                .then(function(results){
                    res.status(200).send(results);
                })
                .catch(function(error){
                    res.status(500).send(error);
                })
            }

        } catch (error){
            res.status(500).send({error:error})
        }
    },

    // PUT
    updateUser: async (req, res) => {
        try {
            const user = await UserController.getUserById(parseInt(req.params.userId));
            if(!user){
                res.status(404).send("The requested user does not exist");
            }else{
                // TO-DO: VALIDATE TYPE BY ID, NOT JUST INTEGER
                user.usertypesId = parseInt(req.body.type) || user.usertypesId;
                user.name = req.body.name || user.name;
                user.lastName = req.body.lastName || user.lastName;
                user.address = req.body.address || user.address;
                if(req.body.email){
                    try { 
                        const userExists = await UserController.searchByFilters({email: req.body.email});
                        if(!userExists || userExists.length === 0){
                            user.email = req.body.email;
                        }
                    }catch(error){
                        res.status(500).send({error:error});
                    }
                } 
                
                user.save()
                .then(function(results){
                    res.status(200).send(results);
                })
                .catch(function(error){
                    res.status(500).send({error:error});
                })
            }
        } catch(error){
            res.status(500).send({error: error});
        }
    },

    // DELETE
    deleteUser: async (req, res) => {
        const user = await UserController.getUserById(req.params.userId);
        
        if(!user){
            res.status(500).send("The user does not exist");
        }else{
            user.destroy()
            .then(function(results){
                res.status(200).send(results);
            })
            .catch(function(error){
                res.status(500).send({error:error});
            })
        }
    }
};

module.exports = UserController;