import express from 'express';
import { ItemsController } from '../controllers/items.js';

export const itemsRouter = express.Router();

itemsRouter.get('/', ItemsController.getAll);
itemsRouter.get('/:id', ItemsController.getById);
itemsRouter.post('/', ItemsController.create);
itemsRouter.put('/:id', ItemsController.update);
itemsRouter.patch('/:id', ItemsController.patch);
itemsRouter.delete('/:id', ItemsController.delete);