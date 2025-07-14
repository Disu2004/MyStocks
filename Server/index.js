const express = require("express")
const app = express();
const PORT = 8000;
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const TWELVE_DATA_API_KEY = 'ba7283c3499b455ca70b6aa4eff60102';

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const User = require('./Schemas/userSchema');
const Stock = require('./Schemas/stockSchema');
mongoose.connect(("mongodb://127.0.0.1:27017/FS-Project"))
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log(err)
    })

const validateId = async (id) => {
    const foundUser = await User.findOne({ id });
    if (foundUser) {
        return true;
    } else {
        return false;
    }
}

app.post('/register', async (req, res) => {
    try {
        const lastUser = await User.findOne().sort({ id: -1 }); // Get last User by ID
        const newId = lastUser ? lastUser.id + 1 : 1;

        const { name, email, password } = req.body; // Destructure fields
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash password

        const newUser = new User({
            id: newId,
            name,
            email,
            password: hashedPassword,
        });

        console.log('Saving User:', newUser);
        await newUser.save();

        res.json({ message: "User saved successfully", id: newId });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: "Error saving User" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        console.log('Found User:', foundUser);
        console.log(foundUser.id)
        if (!foundUser) {
            return res.status(404).json({ message: "Email not registered!" });
        }
        if (await bcrypt.compare(password, foundUser.password)) {
            return res.json({ message: "Login Success", id: foundUser.id });
        } else {
            return res.status(401).json({ message: "Invalid Password" });
        }

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/mystocks/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!(await validateId(id))) {
        return res.status(404).json({ message: "Invalid User ID" });
    }
    const StockData = await Stock.find({ id })
    res.json(StockData)
})

app.get('/api/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "error") {
            return res.status(400).json({ error: data.message });
        }

        res.json({ symbol, price: data.price });
        console.log(`${symbol} price: ${data.price}`);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
});

app.post('/buy/stock/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!(await validateId(id))) {
        return res.status(404).json({ message: "Invalid User ID" });
    }
    console.log(id)
    const { symbol, price, quantity } = req.body;
    const name = symbol;
    const totalPrice = quantity * price;
    const StockData = new Stock({
        id,
        name,
        price,
        quantity,
        totalPrice
    });
    console.log(StockData);
    await StockData.save();
    res.json({ message: "Stock Data saved Success!!" })
})

app.delete('/delete/:symbol/:id',(req,res)=>{
    res.json({message : "Delete Success!!"})
})

app.listen(PORT, () => {
    console.log("http://localhost:" + PORT)
})