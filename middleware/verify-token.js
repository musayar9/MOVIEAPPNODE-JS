const jwt = require("jsonwebtoken")

module.exports = (req, res, next)=>{
    //token bana 3 durumda gelebilir. x-access-token olarka gelelbili.
    //request body token body ile post içeriğinde gelebilir.
    //ayrıca query tokenn olarakda gelebilir
    const  token = req.headers['x-access-token'] || req.body.token || req.query.token
         /*öncellikler   urda token varmı yokmu ona bakacağız  token varsa bu tokenı verify etmemız gerekiyor bunun içinde jwt kullnacağız
         burada gelen token yazıyoruz ve ikinic parametre olrak benim secret_keyım neyse onu yazacağım
         sonra callback fonksiyon yazacağız birincii paramtere err, ikinci paramtere
         ise decode edilmiş dataı getireceğiz eğer hata varsa status false diyoruz
        eğer hata yoksa her şey yolun da ise requestiem bu decode edilmiş olan şifreyi koymamız gerekiyor
            daha sonrada next diyrouz next dememizin sebebi herley yolunda demek

         */
    if(token){
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded)=>{
            if(err){
                res.json({
                    status: false,
                    message: 'Failed to authentocate token'
                })
            }else{
                req.decoded = decoded;
                console.log(decoded);
                next()
            }
        })
    }else{
        res.json({
            status : false,
            message : 'No token provided'
        })
    }
}