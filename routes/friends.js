var express = require('express');
var router = express.Router();
const { getContacts, createContact } = require('../data/mongo/contacts')

/* GET Contacts page. */
router.get('/', async (req, res, next) => {
    const contacts = await getContacts()
    console.log('Render Contacts', contacts)
    res.render('contacts', { 
        title: 'Contacts',
        contacts
     });
});

router.get('/data', async (req, res, next) => {
    const results = await getContacts()
    res.send(results)
})

router.post('/data', async (req, res, next) => {
    const body = req.body
    const result = await createContact(body)
    res.send(result)
})

/* GET Contact Details page. */
router.get('/:name', async (req, res, next) => {
    const contacts = await getContacts()
    const contact = contacts.filter((contact) => contact.name == req.params.name)[0]
    console.log('Single Contact', contact)
    res.render('contactDetails', {
        title: 'Details',
        contact
    });
});

module.exports = router;
