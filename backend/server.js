const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

require('dotenv').config();

const app = express();

// CORS must come first
app.use(cors({
    origin: "*",
    methods: ["GET","POST","OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req,res) => res.send("Server running"));

// Contact form route
app.post('/contact', async (req,res) => {
    console.log("BODY RECEIVED:", req.body); // Should print your data

    const { name, email, message } = req.body || {};

    if(!name || !email || !message){
        return res.status(400).json({ error: "All fields required" });
    }

    try {
        const { data, error } = await supabase
          .from('contactss')
          .insert([{ name, email, message }]);

        if(error) throw error;

        res.status(200).json({ success:true, message: "Message Saved Successfully" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
