import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog-xgrow-tallents', {

        });
        console.log('Conexão com o MongoDB estabelecida.');
    } catch (error) {
        console.error('Erro ao conectar com o MongoDB:', error);
        process.exit(1);
    }
}

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Conexão com o MongoDB fechada.');
    } catch (error) {
        console.error('Erro ao fechar a conexão com o MongoDB:', error);
    }
};