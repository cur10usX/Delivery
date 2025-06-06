const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET - Lista todos os pedidos
router.get('/', async (req, res) => {
	try {
		const pedidos = await Order.find().populate('usuario').populate('itens.produto');
		res.json(pedidos);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//POST - Cria um novo pedido
router.post('/', async (req, res) => {
	const { usuario, itens, total, endereco } = req.body;
	try {
		const novoPedido = new Order({ usuario, itens, total, endereco });
		const pedidoSalvo = await novoPedido.save();
		res.status(201).json(pedidoSalvo);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// GET - Busca um pedido especifico
router.get('/:id', async (req, res) => {
	try {
		const pedido = await Order.findById(req.params.id).populate('usuario').populate('itens.produto');
		if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
		res.json(pedido);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// PUT - Atualiza status ou informações do pedido
router.put('/:id', async (req, res) => {
	try {
		const pedido = await Order.findByIdAndDelete(req.params.id);
		if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
		res.json(pedido);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

//Delete - Cancela ou exclui um pedido
router.delete('/:id', async (req, res) => {
	try {
		const pedido = await Order.findByIdAndDelete(req.params.id);
		if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
		res.json({ message: 'Pedido cancelado ou removido' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
