const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {

  const router = express.Router();


  // index - get all
  router.get('/', (req, res) =>{
    // res.send("Hello World") - just to see if the browser is working... and it is, now we can delete this line 
    collection.find().toArray()
    .then(docs => res.json(docs))
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({status: 500, error: err})
    })
  })



//show - get one by id (get long id in insomnia get  and paste on insomnia/show the super long number receveid as id )
router.get('/:id', (req, res) => {
  const id = req.params.id 
  collection.findOne({_id: ObjectID(id)})
  .then((doc) => res.json(doc))
  .catch((err) => {
    console.error(err)
    res.status(500)
    res.json({status: 500, error: err})
  })
})

//create - post a new game
router.post('/', (req, res) =>{
  const newData = req.body
  collection.insertOne(newData)
  // .then(() => collection.find().toArray())
  // .then((docs) => res.json(docs))
  .then((result) => res.json(result.ops[0]))
  .catch((err) => {
    console.error(err)
    res.status(500)
    res.json({status: 500, error: err})
  })
})

//delete - remove by id
router.delete('/:id', (req, res) => {
  const id = req.params.id 
  collection.deleteOne({_id: ObjectID(id)})
  .then((result) => res.json(result))
  .catch((err) => {
    console.error(err)
    res.status(500)
    res.json({status: 500, error: err})
  })
})

//update - put request 
router.put('/:id', (req, res) => {
  const id = req.params.id 
  const updatedData = req.body
  collection.updateOne(
    {_id: ObjectID(id)},
    {$set: updatedData}
    )
  .then((result) => res.json(result))
  .catch((err) => {
    console.error(err)
    res.status(500)
    res.json({status: 500, error: err})
  })
})

  return router;

};

module.exports = createRouter;
