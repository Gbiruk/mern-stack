const express= require('express');
const {graphqlHTTP}= require('express-graphql');
const schema= require('./schema/schema')
const mongo= require('mongoose');
const cors= require('cors');
mongo.connection.once('open',()=>{
    console.log('the connection is stablished');       
})
const app= express();

app.use(cors());
app.listen(4000,()=>{
    console.log("we are listen on server port on 4000");
})
app.use('/graphql',graphqlHTTP({
    schema:schema,
}))
const dburl = 'mongodb://localhost:27017/hel';
mongo.connect(dburl, {
    useUnifiedTopology: true, // Corrected the option name
    useNewUrlParser: true
}); 