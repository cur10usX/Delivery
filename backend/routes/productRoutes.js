const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET - Lista todos os produtos
router.get('/', async (req, res) => {
	try {
		const produtos = await Product.find();
		res.json(produtos);
	} catch(err) {
		res.status(500).json({ message: err.message });
	}
});

// POST - Cria um novo produto
router.post('/', async (req, res) => {
	const { nome, descricao, preco, imagem } = req.body;
	try {
		const novoProduto = new Product({ nome, descricao, preco, imagem });
		const produtoSalvo = await novoProduto.save();
		res.status(201).json(produtoSalvo);
	} catch (err) {
		res.status(400).json({ message: err.message});
	}
});

// GET - Busca um produto especifico
router.get('/:id', async (req, res) => {
	try {
		const produto = await Product.findById(req.params.id);
		if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
		res.json(produto);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// PUT - Atualiza um produto
router.put('/:id', async (req, res) => {
	try {
		const produto = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true});
		if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
		res.json(produto);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE - Remove um produto
router.delete('/:id', async (req, res) => {
	try {
		const produto = await Product.findByIdAndDelete(req.params.id);
		if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
		res.json({ message: 'Produto removido' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
