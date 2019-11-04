const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const db_url = process.env.ATLAS_CONNECTION
const db_name = process.env.DB_NAME
const collection_name = process.env.CONTACT_COLLECTION

const settings = {
    reconnectTries: Number.MAX_VALUE,
    autoReconnect: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const getContacts = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(db_url, settings, async (err, client) => {
            if (err) {
                console.error('An error occurred connecting to MongoDB: ', err);
                reject(err)
            } else {
                const collection = client.db(db_name).collection(collection_name);
                // perform actions on the collection object
                const results = await collection.find({}).toArray((err, docs) => {
                    console.log('Read Contacts:', docs)
                    resolve(docs)
                });
            }
            client.close();
        });
    })
    return iou;
}

const getContact = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(db_url, settings, async (err, client) => {
            if (err) {
                console.error('An error occurred connecting to MongoDB: ', err);
                reject(err)
            } else {
                const collection = client.db(db_name).collection(collection_name);
                // perform actions on the collection object
                const results = await collection.find({ _id: ObjectId(id) }).toArray((err, docs) => {
                    console.log('Read Contact:', docs)
                    resolve(docs)
                });
            }
            client.close();
        });
    })
    return iou;
}

const createContact = (artist) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(db_url, settings, async (err, client) => {
            if (err) {
                console.error('An error occurred connecting to MongoDB: ', err);
                reject(err)
            } else {
                const collection = client.db(db_name).collection(collection_name);
                // perform actions on the collection object
                const result = await collection.insertOne(artist);
                console.log('Created Contact:', result)
                resolve(result.result)
            }
            client.close();
        });
    })
    return iou;
}

const updateContact = (artist, id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(db_url, settings, async (err, client) => {
            if (err) {
                console.error('An error occurred connecting to MongoDB: ', err);
                reject(err)
            } else {
                const collection = client.db(db_name).collection(collection_name);
                // perform actions on the collection object
                const result = await collection.updateOne(
                    { _id: ObjectId(id) },
                    { $set: artist }
                );
                console.log('Updated Contact:', result)
                resolve(result)
            }
            client.close();
        });
    })
    return iou;
}


const deleteContact = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(db_url, settings, async (err, client) => {
            if (err) {
                console.error('An error occurred connecting to MongoDB: ', err);
                reject(err)
            } else {
                const collection = client.db(db_name).collection(collection_name);
                // perform actions on the collection object
                const result = await collection.remove(
                    { _id: ObjectId(id) }
                );
                console.log('Delete Contact:', result)
                resolve(result)
            }
            client.close();
        });
    })
    return iou;
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}