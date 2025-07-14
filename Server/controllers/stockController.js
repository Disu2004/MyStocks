const Stock = require('../Schemas/stockSchema');
const { validateId } = require('./authController');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;

const getUserStocks = async (req, res) => {
    const id = Number(req.params.id);
    if (!(await validateId(id))) {
        return res.status(404).json({ message: "Invalid User ID" });
    }
    const stockData = await Stock.find({ id });
    res.json(stockData);
};

const getStockPrice = async (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "error") {
            return res.status(400).json({ error: data.message });
        }

        res.json({ symbol, price: data.price });
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
};

const buyStock = async (req, res) => {
    const id = Number(req.params.id);
    if (!(await validateId(id))) {
        return res.status(404).json({ message: "Invalid User ID" });
    }

    const { symbol, price, quantity } = req.body;
    const totalPrice = quantity * price;

    const newStock = new Stock({
        id,
        name: symbol,
        price,
        quantity,
        totalPrice,
    });

    await newStock.save();
    res.json({ message: "Stock Data saved successfully!" });
};

const deleteStock = async (req, res) => {
    res.json({ message: "Delete Success!!" }); // Implement logic later
};

module.exports = { getUserStocks, getStockPrice, buyStock, deleteStock };
