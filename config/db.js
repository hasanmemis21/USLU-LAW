const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Parola içerisinde özel karakterler varsa uygun şekilde kodlayın.
        const password = encodeURIComponent('Teslam98');
        const conn = await mongoose.connect(`mongodb+srv://hasan21memis:${password}@cluster0.sj7cetd.mongodb.net/?retryWrites=true&w=majority`, {
            // useNewUrlParser ve useUnifiedTopology kaldırıldı.
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
