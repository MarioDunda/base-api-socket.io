var express = require("express");
var router = express.Router();

const _ = require("lodash");

function indexRouter(dependencies) {

 const { db, io } = dependencies;
  

  io.on('connect', (socket) => {
    console.log('novo cliente conectado')
  })

  /* GET home page. */
  router.get("/", function(req, res) {
    const valores = db.get("valores").value();
    res.json({ return: valores });
  });
  
  router.post("/post/:valor", function(req, res) {
    db.set('valores', parseInt(req.params.valor)).write();
    const valores = db.get("valores").value();
    io.emit('valores', {
      return: valores
    })
  });


  /* GET match */
  return router;
}

module.exports = indexRouter;
