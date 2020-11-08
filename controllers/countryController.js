const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Country = mongoose.model('Country')

router.get('/', (req,res)=>{
   res.render("country/addOrEdit",{
      viewTitle: "Добавление записи"
   });
});

router.post('/',(req,res)=>{
   if (req.body._id == '')
   insertRecord(req, res);
   else
      updateRecord(req,res);
});

function insertRecord(req, res){
   var country = new Country();
   country.NameKaz = req.body.NameKaz;
   country.NameRus = req.body.NameRus;
   country.Id = req.body.Id;
   country.Code = req.body.Code;
   country.save((err, doc)=> {
      if (!err)
         res.redirect('country/list');
      else {
         if (err.name == 'ValidationError') {
               handleValidationError(err, req.body);
            res.render("country/addOrEdit",{
               viewTitle: "Добавление записи",
               country: req.body
            });
         }
      else
         console.log('Error during record insertion : ' + err);
      }
   });
   }

   function updateRecord(req,res){
      Country.findOneAndUpdate({_id:req.body._id},req.body, {new:true}, (err, doc)=>{
         if (!err){res.redirect('country/list');}
         else {
            if (err.name == 'ValidationError'){
               handleValidationError(err, req.body);
               res.render("country/addOrEdit", {
                  viewTitle: "Обновить документ",
                  country: req.body
               });
            }
            else
               console.log('Error during record update: ' + err);
         }
      });
   }

router.get('/list', (req,res)=>{
   Country.find((err, docs)=>{
      if (!err){
         res.render("country/list",{
            list: docs.map(doc => doc.toJSON())
         });
      }
      else {
         console.log('Error in retrieving country list :' + err);
      }
   });
});

function handleValidationError(err, body){
   for(field in  err.errors){
      switch (err.errors[field].path){
         case 'NameKaz':
            body['NameKazError'] = err.errors[field].message;
            break;
         case 'NameRus':
            body['NameRusError'] = err.errors[field].message;
            break;
         case 'Id':
            body['IdError'] = err.errors[field].message;
            break;
         case 'Code':
            body['CodeError'] = err.errors[field].message;
            break;
         default:
            break;
      }
   }
}

router.get('/:id', (req, res) => {
   Country.findById(req.params.id, (err, doc) => {
      if (!err) {
         res.render("country/addOrEdit", {
            viewTitle: "Обновить документ",
            country: doc
         });
      }
   });
});

router.get('/delete/:id', (req, res) => {
   Country.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
         res.redirect('/country/list');
      }
      else { console.log('Error in country delete :' + err); }
   });
});

module.exports = router;