import { ItemModel } from '../models/item.js';

export class ItemsController {
  static getAll(req, res) {
    try {
      const { search, page = 1, limit = 50 } = req.query;
      const items = ItemModel.getAll(search, parseInt(page), parseInt(limit));
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static getById(req, res) {
    try {
      const item = ItemModel.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static create(req, res) {
    try {
      if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const item = ItemModel.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static update(req, res) {
    try {
      if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const item = ItemModel.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static patch(req, res) {
    try {
      const item = ItemModel.patch(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static delete(req, res) {
    try {
      const result = ItemModel.delete(req.params.id);
      if (!result.changes) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}