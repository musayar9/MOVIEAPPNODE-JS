const chai = require('chai');
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../../app')


chai.use(chaiHttp)

describe('Node Server', ()=>{



    it('(GET /) anasayfayı döndürür', function(done){
//aşağıda reuest 200 kontrolu yapıoyırz
      chai.request(server)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200)
            done()
        })

    })
    // it('(GET /) anasayfayı döndürür', function(done){

    //     done()

    // })
})