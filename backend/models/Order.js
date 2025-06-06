const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itens: [
        {
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantidade:  {
                type: Number,
                required: true,
                min: [1, 'Quantidade mínima de 1']
            },
            preco: {
                type: Number,
                required: true,
                min: [0, 'Preço inválido']
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: [0, 'Total não pode ser negativo']
    },
    status: {
        type: String,
        enum:  ['pendente', 'aprovado', 'preparando', 'entregue', 'cancelado'],
        default: 'pendente'
    },
    endereco: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);