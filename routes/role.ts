const express = require('express');
const router = express.Router();
const UserRoleController = require('../app/role/UserRoleController')

router.get('/user-roles', UserRoleController.getUserRole);

module.exports = router;