module.exports = app => {
    const requests = require("../controllers/request.controller.js");
  
    var router = require("express").Router();
  
  
    // Retrieve all assets
    router.get("/", requests.findAll);
  
    // Retrieve a single alarm with id
    router.get("/:id", requests.findOne);
  
    // Update a alarm with id
    router.put("/:id", requests.update);
  
    // Delete a alarm with id
    router.delete("/:id", requests.delete);
  
    // Create a new alarm
    router.delete("/", requests.deleteAll);
  
    app.use('/api/requests', router);
};