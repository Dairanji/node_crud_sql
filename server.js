const express=require('express');
const path=require('path');

const sequelize=require('./models/database')

const app=express();

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}));

const productRoute=require('./routes/productRoutes');
app.use(productRoute)

sequelize.sync().then(result=>{
    console.log('Table Created/Connected');
}).catch(err=>{
    console.log(err);
});

const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`connection successful`);
    console.log(`Server running at http://localhost:${port}`);
});