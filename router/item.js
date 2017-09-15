const express = require('express');
const router  = express.Router();
const models = require('../models');

// Menampilkan data para Item
router.get('/', (req, res)=>{
    models.Item.findAll({
        order:[['id','ASC']]
    }).then(rows=>{
      res.render('item', {data:rows, err_msg:false})
    })
    .catch(err=>{
      throw err.toString()
    })
  })

// Menampilkan form tambah Item

router.get('/add', (req, res)=>{
    models.Item.findAll()
    .then(()=>{
      res.render('additem')
    })
    .catch(err=>{
      throw err.toString()
    })
  })

//  Menambahkan Item
  router.post('/add', (req, res)=>{

    models.Item.create({
                        name:`${req.body.name}`,
                        brand: `${req.body.brand}`,
                        codeitem: `${req.body.codeitem}`
                      })
    .then(()=>{
        res.redirect('/item')
    })
    .catch(err=>{
        throw err
    })
    
})

// DELETE Item
router.get('/delete/:id', (req, res)=>{
    models.Item.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(()=>{
        res.redirect('/item')
    })
    .catch(err=>{
        res.send(err)
    })
})

// EDIT Item
router.get('/edit/:id', (req, res)=> {
    models.Item.findAll({
        where : {
            id : req.params.id
        }
    })
    .then(rows =>{
        // res.send(rows)
        res.render('edititem', {data: rows})
    }) 
    .catch(err =>{
        res.send(err)
    })
})

router.post('/edit/:id', (req, res)=>{
    models.Item.update({
        name:`${req.body.name}`, 
        brand:`${req.body.brand}`,
        codeitem:`${req.body.codeitem}`
    },{
        where:{
            id : req.params.id
        }
    })
    .then(()=>{
        res.redirect('/item')
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router;