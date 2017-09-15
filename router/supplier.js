const express = require('express');
const router  = express.Router();
const models = require('../models');

// Menampilkan data para supplier
router.get('/', (req, res)=>{
    models.Supplier.findAll({
        include:[{model: models.Item}],
        order:[['id','ASC']]
    }).then(rows=>{
      res.render('supplier', {data:rows, err_msg:false})
    })
    .catch(err=>{
      throw err.toString()
    })
  })

// Menampilkan form tambah supplier

router.get('/add', (req, res)=>{
    models.Supplier.findAll()
    .then(()=>{
      res.render('addsupplier')
    })
    .catch(err=>{
      throw err.toString()
    })
  })

//  Menambahkan Supplier
  router.post('/add', (req, res)=>{

    models.Supplier.create({
                        name:`${req.body.name}`,
                        kota: `${req.body.kota}`
                      })
    .then(()=>{
        res.redirect('/supplier')
    })
    .catch(err=>{
        throw err
    })
    
})

// DELETE Supplier
router.get('/delete/:id', (req, res)=>{
    models.Supplier.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(()=>{
        res.redirect('/supplier')
    })
    .catch(err=>{
        res.send(err)
    })
})

// EDIT Supplier
router.get('/edit/:id', (req, res)=> {
    models.Supplier.findAll({
        where : {
            id : req.params.id
        }
    })
    .then(rows =>{
        // res.send(rows)
        res.render('editsupplier', {data: rows})
    }) 
    .catch(err =>{
        res.send(err)
    })
})

router.post('/edit/:id', (req, res)=>{
    models.Supplier.update({
        name:`${req.body.name}`, 
        kota:`${req.body.kota}`
    },{
        where:{
            id : req.params.id
        }
    })
    .then(()=>{
        res.redirect('/supplier')
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router;