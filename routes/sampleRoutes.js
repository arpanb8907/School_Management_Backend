import express from 'express';

const router = express.Router();

// Define a GET route
router.get('/sample', (req, res) => {
    res.status(200).json({
        message: 'Sample GET request successful!',
        data: [
            { id: 1, name: 'John Doe', age: 30 },
            { id: 2, name: 'Jane Doe', age: 25 },
        ],
    });
});

export default router;
