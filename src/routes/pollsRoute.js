import express from 'express';

const pollRouter = express.Router();

pollRouter.post('/polls', (req, res) => {
    // Route to handle incoming post request - Creation of new Poll
});

pollRouter.post('/polls/:id/vote', (req, res) => {
    // Handle casted vote by poll ID
});

export default pollRouter;

