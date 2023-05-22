const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


router.post('/register', (req, res)=>{
  const {username, password} = req.body;

  bcrypt.hash(password, 10).then((hash)=>{
    const user = new User({
      username,
      password:hash
    })
  
    const promise = user.save()
    promise.then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json(err)
    })
  })
 
})
/*bcrypt.compare(password, user.password).then((result)=>
birinci parametree olrak kullnaıcının girdiği servisten gelen 
parametre neyse onu yazacağız, ikinci parametre olarka veri tabanından
 kulllanıcın şifrelenmiş olarka gelen şifresinii yazacağım
*/

router.post('/authenticate', (req, res)=>{
  const {username, password }= req.body;

  User.findOne({
    username
  }, (err, user)=>{
    if(err)
      throw err;
    if(!user){
      res.json({
        status: false,
        message: "Authentication failed user not found"
      })
    }else{
      bcrypt.compare(password, user.password).then((result)=>{
        if(!result){
          res.json({
            status:false,
            message:"Authentication failed, wrong password"
          })
        }else{

          //eğere gelen şifre dopruysa token oluşturacağız
          //payload oluşturduk. Bu payload da usernmae ' i taşıycağız
          const payload = {
            username
          };

          /*burada token oluştururken birinci parametre olarak payloadımız verioz
          ikinci paramterre olarakta secrept keyımız verioz
          3 parameter olarak bun ecperın ile süre veriyoruz

          bu token'ı requesti eklemem gerkiyorki bunndan sonraki api erişimlerinde bu token kullanıyım.Bu token verify edilirse
          api'yaya erieşbiliyim. verify edilmez ise api eriemeiyim
          */
          const token= jwt.sign(payload, req.app.get("api_secret_key"),{
            expiresIn:720
          })

          res.json({
            status: true,
            token
          })
        }
      })
    }
  })
})
module.exports= router