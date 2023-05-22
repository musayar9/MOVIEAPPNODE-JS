const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;
describe("/api/directors tests", ()=>{
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({username:"Musa", password:'12345'})
            .end((err, res)=>{
                token= res.body.token
                done()
            })
    })

    describe('/GET directors', ()=>{
        it('it should Get all the directors', (done)=>{
            chai.request(server)
                .get('/api/directors')
                .set("x-access-token", token)
                .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
            })
    })


    describe("/POST MOVİE", ()=>{
        it('it should POST a director', (done)=>{
            const director = {
                name:"Ayda",
                surname:"Çiçek",
                bio:"Ev Hanımı"

            }
            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token', token)
                .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("name")
                    res.body.should.have.property("surname")
                    res.body.should.have.property("bio")

                    directorId = res.body._id
                    console.log("director_id", directorId)

                    done()
                })

        })
    })

    describe("/put direcctors/:directro_id", ()=>{
        it('it should update a movie given by id', (done)=>{
            const director = {
                name:"Toykan",
                surname:"Aliş", 
                bio:"Pazarlamacı"
            }

            chai.request(server)
                .put("/api/directors/"+ directorId )
                .send(director)
                .set("x-access-token", token)
                .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("name").eql(director.name)
                    res.body.should.have.property("surname").eql(director.surname)
                    res.body.should.have.property("bio").eql(director.bio)


                    res.body.should.have.property('_id').eql(directorId)
                    done()
                })
        })
    })
    
    describe('/DELETE/:movie_id movie', ()=>{
        it('it should DELETE a director given by id', (done)=>{
            chai.request(server)
                .delete("/api/directors/"+ directorId )
                .set("x-access-token", token)
                .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql(1)

                    done()
                })
        })
    })


    //director detail testinin yazılması

    describe("/Get/:director_id director", ()=>{
        it('it shoul get a director detail', (done)=>{
            chai.request(server)
                .get("/api/directors/"+ directorId)
                .set("x-access-token", token)
                .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a("array")

                    done()
                })
        })
    })
})