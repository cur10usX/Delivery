const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
    },
    telefone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?\d{9,15}$/, 'Telefone inválido: deve conter 9 dígitos']
    },
    senha: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    },
    endereco: {
        type: String,
        default: ''
    }, 
}, {
    timestamps: true
});

// Middleware para criptografar a senha
UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Método para comparar senha no login
UserSchema.methods.comparePassword = async function (senhaDigitada) {
    return bcrypt.compare(senhaDigitada, this.senha);  
};

module.exports = mongoose.model('User', UserSchema);