const express = require('express')
const Sequelize = require('sequelize')

//conectare la baza de date
const sequelize = new Sequelize('biblioteca_mea', 'root', '', {
    dialect: "mysql",
    host: "localhost" })

//autentificare la baza de date
sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database") })

//definire tabele
var Users= sequelize.define ('users', { 
    id:  {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    id_library: Sequelize.INTEGER})

var Categories = sequelize.define('categories',{
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: Sequelize.STRING, unique: true } })
    
var Libraries = sequelize.define('libraries',{
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    status: Sequelize.STRING,
    favorite: Sequelize.BOOLEAN })
    
var Books = sequelize.define('books',{
    id:  {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    nr_pages: Sequelize.INTEGER,
    publisher: Sequelize.STRING,
    id_category: Sequelize.INTEGER })


//definire relatii intre tabele
Users.belongsTo(Libraries, {foreignKey: 'id_library'})
Books.belongsTo(Categories, {foreignKey: 'id_category'})

Books.belongsToMany(Libraries,{through:'Books_Library' })
Libraries.belongsToMany(Books, {through:'Books_Library'})

//creare tabele
new Users(sequelize,Sequelize)
new Categories(sequelize,Sequelize)
new Libraries(sequelize,Sequelize)
new Books(sequelize,Sequelize)

//{force:true} va suprascrie tabelele
sequelize.sync().then(()=>{console.log("tables creates")})

const app = express()
app.use('/', express.static('public'))

app.use(express.json())
//app.use(express.urlencoded())

//get all categories
app.get('/categories', function(request, response) {
    Categories.findAll().then( function(categories){
        response.status(200).send(categories)
    })
})


// get one category by id
app.get('/categories/:id', function(request, response) {
    Categories.findOne({where: {id:request.params.id}}).then(
        function(category) {
                        if(category) {
                                       response.status(200).send(category)
                            } else {
                                     response.status(404).send()}           
                             })  
  
})

//create a new category
app.post('/categories', function(request, response) {
    console.log(request.body)
    
    Categories.findOne({where: {name:request.body.name}}).then(
        category => { if(category)
    {
        response.send("categoria deja exista") } else{
            
        Categories.create(request.body).then(function(category) {
        response.status(201).send(category)})
         }})
    
})

app.delete('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

//create a new book
app.post('/books',function(request,response){
    Books.create(request.body).then(function(book){ 
        response.status(201).send(book)
    })
})

//get all books
app.get('/books',function(request,response){
    Books.findAll(
    {
        include:[{
            model: Categories
            
        }]
    }
    ).then(
            function(book) {
                response.status(200).send(book)
            }
        )
})

//delete book
app.delete('/books/:id',function(request,response){
    
        Books.findById(request.params.id).then(function(book) {
        if(book) {
            book.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

//update book
app.put('/books/:id',function(request,response){
    
    Books.findById(request.params.id).then(function(book) {
        if(book) {
            book.update(request.body).then(function(book){
                response.status(201).send(book)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
    
})

//create a new library
app.post('/libraries',function(request,response){
    Libraries.create(request.body).then(function(library){ 
        response.status(201).send(library)
    })
})

//get all libaries
app.get('/libraries',function(request,response){
    Libraries.findAll(
    {
        include:[{
            model: Books
            
        }]
    }
    ).then(
            function(library) {
                response.status(200).send(library)
            }
        )
})

//create a new user
app.post('/users',function(request,response){
    Users.create(request.body).then(function(user){ 
        response.status(201).send(user)
    })
})

//update user
app.put('/users/:id',function(request,response){
    
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.update(request.body).then(function(user){
                response.status(201).send(user)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
    
})
//get all users
app.get('/users',function(request,response){
    Users.findAll(
    {
        include:[{
            model: Libraries
            
        }]
    }
    ).then(
            function(user) {
                response.status(200).send(user)
            }
        )
})
//delete users
app.delete('/users/:id',function(request,response){
    
        Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})





app.listen(8080)
