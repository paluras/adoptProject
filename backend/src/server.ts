import app from './app'
import process from 'process';
import console from 'console';

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});