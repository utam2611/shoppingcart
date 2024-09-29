const port = 3010;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const { lutimesSync } = require("fs");


app.use(express.json());
app.use(cors());

// Datbase Connection Mongodb

mongoose.connect("mongodb+srv://utam:utam123@cluster0.bkj3m2i.mongodb.net/projectsem3");
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

//update image


// app.put('/upload/:filename', upload.single('file'), (req, res) => {
//     const { filename } = req.params;
//     const { file } = req;
//     // Here you can handle the logic to update the file with the given filename
//     console.log('New file details:', file);
//     res.json({
//         success: 1,
//         image_url: `File ${filename} updated successfully`
// });
// });

//Image storage

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })


//Creating Upload Image
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})



// new product add display
app.get('/newcollection', async (req, res) => {
    let product = await Product.find({});
    let newcollection = product.slice(1).slice(-8)
    res.send(newcollection)
})

// populer product

app.get('/popularproduct', async (req, res) => {
    let product = await Product.find({ category: "Jars & Container" });
    let popular = product.slice(0, 4)
    res.send(popular)
})

//related product 
app.get('/relatedproduct', async (req, res) => {
    let product = await Product.find({ category: req.category });
    let related = product.slice(0, 4)
    res.send(related)
})

//creating middelwear to fetch user 
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ errors: "Please Login First " })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ errors: "Pleasse Login" })
        }
    }
}

// remove from cart data

app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    if (userData.cartdata[req.body.itemId] > 0) {
        console.log(req.body.itemId)
        userData.cartdata[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartdata: userData.cartdata })
    }
})

// get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartdata)
})

//get order
app.post('/getorder', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.order)
})


//Add to cart data  

app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    userData.cartdata[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartdata: userData.cartdata })

})

//add to order

app.post('/addorder', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    userData.orderdata[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { orderdata: userData.orderdata })

})


//Schema Create Product 
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: String,
        required: true,
    },
    old_price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },

})


//Add product database
app.post('/addproduct', async (req, res) => {

    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {

        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,

    });

    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    })
})


//Creating API for Delting Product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        name: req.body.name
    })

})

//Creating API for Delting Product
app.put('/updateproduct/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({ id: req.params.id }, { $set: req.body });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})


app.get('/allproduct/:id', async (req, res) => {
    const user = await Product.findOne({ id: req.params.id })
    res.send(user);
})

//Creating Api get all
app.get('/allproduct', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
})



//Schema For User MOdel
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartdata: {
        type: Object,
    },
    orderdata: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isadmin: {
        type: Boolean,
        default: 0,
    }
})


//Creating end point registertion user 
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "Existing User Email Address Found " })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartdata: cart,
        orderdata: cart,
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})


//creat admin middelwear check 
const isAdmin = async (req, res,next) => {
    const isadmin = await Users.findOne({ email: req.body.email })
    console.log(isadmin)
    if (isadmin == null) {
        res.status(504).send({errors : "PLease login"});
    }
    else {
        try {
            if (!isadmin.isadmin) {
                console.log("user panel")
                next()
            }
            else {
                try {
                    console.log("admin panel")
                    next()

                }
                catch (error) {
                    console.log("hello")
                    res.status(504).send("PLease Valid USer Or Email")
                }
            }
        }
        catch (errors) {
            res.status(504).send({errors: "please valid useer name"})
        }
    }

}



//User Login
app.post('/login', isAdmin, async (req, res) => {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            if (user.isadmin) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token, isadmin: true });
            }
            else {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            }

        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }

    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" })
    }
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Started")
    }
    else {
        console.log("Server is not Start")
    }
})