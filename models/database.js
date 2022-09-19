const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-crud','root','',{
    host:'localhost',
    dialect:'mysql',
});

sequelize.authenticate()
.then(()=>{
    console.log('database connected');
})
.catch(err=>{
    console.log(err);
})

module.exports=sequelize;