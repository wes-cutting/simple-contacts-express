var express = require('express');
var router = express.Router();
const { 
    getContacts, 
    createContact,
    updateContact,
    deleteContact 
} = require('../../data/mongo/contacts')

router.get('/', async (req, res, next) => {
    const results = await getContacts()
    res.send(results)
})

router.post('/', async (req, res, next) => {
    const body = req.body
    const result = await createContact(body)
    res.send(result)
})

router.put('/:id', async (req, res, next) => {
    const body = req.body
    const result = await updateContact(body, req.params.id)
    res.send(result)
})

router.delete('/:id', async (req, res, next) => {
    const result = await deleteContact(req.params.id)
    res.send(result)
})

module.exports = router;