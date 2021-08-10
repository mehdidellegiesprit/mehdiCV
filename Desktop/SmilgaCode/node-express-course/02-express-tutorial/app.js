const express = require('express')
const app = express()

const {products} = require('./data.js')
 
app.disable('etag');


app.get('/',(req,res)=>{
    res.send('<h1>Home page </h1> <a href="/api/products">products</a>')
})
app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const{id,name,image}=product ; 
        return {id,name,image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productID',(req,res)=>{

     const {productID} = req.params
     console.log(productID);

    const singleProduct = products.find((product)=>product.id===Number(productID))
    
    if (!singleProduct){
        return res.status(404).send('page not exists')
    }
    
    return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params);
    res.send('hello world ')
})

app.get('/api/v1/query',(req,res)=>{
    // console.log(req.query);
    const {search , limit} =req.query
    let sortedProducts = [...products] /// !!!!! 3 points 
    if (search) {
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if (limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length<1){
        return res.status(200).json({sucess:true,data:[]})
    }
    // console.log(sortedProducts);
    res.status(200).json(sortedProducts)
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000 ...');
})