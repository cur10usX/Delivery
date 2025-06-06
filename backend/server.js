const express = require('express');
const mongoose = require('mongoose');
const dotenv = require ('dotenv');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = rquire('./routes/orderRoutes');

dotenv.config();

const app = express();

//Middleware para aceitar JSON
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlsparser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Conectado ao MongoDB');
		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => console.log('Servidor rodando na porta $(PORT)'));
	})
	.catch(err => console.error('Erro ao conectar ao MongoDB', err));
