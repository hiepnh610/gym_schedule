const PORT     = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/gym_schedule';

module.exports = { PORT, mongoUri }