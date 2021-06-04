const express = require('express');
const Role = require('../db/models/role');
const router = express.Router();
const logError = require('../error_log');
const auth = require('../auth/auth');
const permission_role = require('../db/models/permission_role');
const Permission = require('../db/models/permission');

router.get('/roles', auth(''), async(req, res) => {
    try{
        const where = {};
        if(req.query.id !== undefined) where.id = req.query.id;
        if(req.query.uid !== undefined) where.user_id = req.query.uid;
        res.json(await Role.findAll({
            where: where
        }));
    }catch(err) {
        logError(err);
    }
});

/*
body {
    role_title: "",
    permission_ids: []
}
*/
router.post('/roles', auth(''), async (req, res) => {
    try{
        const role_title = req.body.role_title;
        const permission_ids = req.body.permission_ids;
        const role = await Role.create({title: role_title});
        permission_ids.forEach(async (permission_id) => {
            const permission = await Permission.findOne({
                where: {
                    id: permission_id,
                }
            })
            role.addPermission(permission);
        });
        res.json(role);
    }catch(err){
        logError(err);
    }
});

/*
body {
    role_title: "",
}
*/
//change role title
router.put('/roles/:id', auth(''), async (req, res) => {
    try{
        const title = req.body.role_title;
        res.json(await Role.update({title: title}, {
            where: {
                id: req.params.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

/*
body {
    permission_ids: []
}
*/
//change role permissions
router.put('/roles/:id/permissions', auth(''), async(req, res) => {
    try{
        const role_id = req.params.id;
        const role = await Role.findOne({
            where: {
                id: role_id,
            }
        });
        const new_permissions = req.body.permission_ids;
        const cur_permissions = await permission_role.findAll({
            where:{
                role_id: role_id,
            }
        });
        //remove permissinos
        cur_permissions.forEach(async(permission_id) => {
            if(!new_permissions.includes(permission_id)){
                role.removePermission(await Permission.findOne({
                    where: {
                        id: permission_id
                    }
                }));
            }
        })
        //add new permissions
        new_permissions.forEach(async (permission_id) => {
            if(!cur_permissions.includes(permission_id)){
                role.addPermission(await Permission.findOne({
                    where: {
                        id: permission_id
                    }
                }));
            }
        });
        res.json(role);
    }catch(err){
        logError(err);
    }
});

router.delete('/roles/:id', auth(''), async (req, res) => {
    try{
        res.json(await Role.destroy({
            where:{
                id: req.params.id
            }
        }));
    }catch(err){
        logError(err);
    }
});

module.exports = router;