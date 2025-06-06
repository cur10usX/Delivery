const mongoose = require('mongoose');

const ProdutSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true,
        min: [0, 'Preço não pode ser negativo']
    },
    imageUrl: {
        type: String,
        default: ''
    },
    disponivel: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Product', ProdutSchema);