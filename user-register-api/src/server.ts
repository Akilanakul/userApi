import express from 'express';
import { databaseInitializer } from './config/database';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', userRoutes);

// Initialize the database before starting the server
if (process.env.NODE_ENV !== 'test') {
databaseInitializer().then(() => {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}).catch(err => {
    console.error('Failed to initialize the database', err);
    process.exit(1);
});
}

export { app };