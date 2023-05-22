const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;
describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: "Musa", password: '12345' })
            .end((err, res) => {
                token = res.body.token;
                console.log(token);

                done()

            })
    })

    describe('/GET movies', () => {
        it('it should GET all th movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    //bize dönen datanin bir array olduğunu test etmemiz gerkiyro
                    //burada bize bir array olamlaı demek istiyoruz
                    res.body.should.be.a('array')
                    done();
                })
        })
    })



    describe('POST movie', () => {
        it('it should POST a movie', (done) => {
            /*burada dönen datanın obje olup olmadığına bakmamız gerekiyor ve de dönen datanın 200 olup olmadığına
            bunun yanı sıra bir de property kontolu yapacağız.Elimizde olan bir filimin id sine ve created verilerine göre kontrol yapacağız
            movie datayı alacak bunu kayıt edecek
            propert özelliği ile preperty'nşn olup olmadığını kontrol edebiliyoruz

            */

            const movie = {
                title: "Udemy",
                director_id: "645cf5d300b8a93499f2a0ca",
                category: "ders",
                country: "Türkiye",
                year: 1950,
                imdb_score: 8
            }
            chai.request(server)
                /*send ile yukarıda yazdığımız movie içindeki data ları veri tabanımız kayıt edecek ve bende 
                bunlar kontrol edeceğim. gerçekten kayıt oldumu diye
                */
                .post('/api/movies')
                .send(movie)
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200)
                    /*isten yapıldı bana bir çıktı geldi bu çıktının obje olup olmadığını kontrol edeceğim ben */
                    res.body.should.be.a("object")
                    res.body.should.have.property('title')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('imdb_score')

                    movieId = res.body._id
                    console.log("_id", movieId);
                    done()

                    /* */
                })

        })
    })


    //movie_id test
    //burada postda kaıt edilen id neise onu çekip buraya koyuyor
    describe('/GET/:movie_id movie', () => {
        it('it should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('imdb_score')

                    //id property işeti olmali benim burada gönderdiğimi movieId eşit olmalı
                    res.body.should.have.property('_id').eql(movieId)

                    done()
                })
        })

    })




    describe('/PUT/:movie_id', () => {
        it('it should UPDATE a movie given by id', (done) => {
            const movie = {
                title: "93creative",
                director_id: "645cf5d300b8a93499f2a0ca",
                category: "Savaş",
                country: "Türkiye",
                year: "1970",
                imdb_score: 7
            }
            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token', "token")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("title").eql(movie.title)
                    res.body.should.have.property("director_id").eql(movie.director_id)
                    res.body.should.have.property("category").eql(movie.category)
                    res.body.should.have.property("country").eql(movie.country)
                    res.body.should.have.property("year").eql(movie.year)
                    res.body.should.have.property("imdb_score").eql(movie.imdb_score)

                    //aşağıda değiştiğini kontrol etmemiz gerkeyior

                    res.body.should.have.property('_id').eql(movieId)
                    done()
                })
        })
    })

    //burda silme işleminde dönen datanın 200 olduğunu tespt etmek /
    //delete tetsi sonucunda bize dönen objecti alacağız

    describe("/DELETE/:movie_id movie", ()=>{
        it('it should DELETE a movie given by id', (done)=>{
            chai.request(server)
                .delete('/api/movies/'+ movieId)
                .set('x-access-token', "ckldscna")
                .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql(1)

                    done()
                })
        })
    })
})