import express from 'express';
import { submitData, getAllUsers} from '../controllers/userControllers.js';
import { subscribeToNews, unsubscribeFromNews, getAllSubscribers } from '../controllers/newsLetterController.js';
import { createContact, getContacts } from '../controllers/contactusController.js';

const UserRouter = express.Router();

// Submit user data with screenshot
UserRouter.post('/submit', submitData);

// Get all users (admin route)
UserRouter.get('/get_users', getAllUsers);

// Subscribe to newsletter
UserRouter.post('/subscribe', subscribeToNews);
UserRouter.post('/unsubscribe', unsubscribeFromNews);

// POST /api/users/contact
UserRouter.post("/contact", createContact);

// GET /api/users/contacts (for admin )
UserRouter.get("/get_contacts", getContacts);

// Protected admin routes
UserRouter.get('/subscribers', getAllSubscribers);

export default UserRouter;
