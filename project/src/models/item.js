import { db } from './database.js';

export class ItemModel {
  static getAll(search = '', page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    const query = search
      ? db.prepare(
          'SELECT * FROM items WHERE name LIKE ? ORDER BY date_created DESC LIMIT ? OFFSET ?'
        )
      : db.prepare('SELECT * FROM items ORDER BY date_created DESC LIMIT ? OFFSET ?');
    
    return search
      ? query.all(`%${search}%`, limit, offset)
      : query.all(limit, offset);
  }

  static getById(id) {
    return db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  }

  static create(item) {
    const { name, description } = item;
    const stmt = db.prepare(
      'INSERT INTO items (name, description) VALUES (?, ?)'
    );
    const result = stmt.run(name, description);
    return { id: result.lastInsertRowid, name, description };
  }

  static update(id, item) {
    const { name, description } = item;
    const stmt = db.prepare(
      'UPDATE items SET name = ?, description = ? WHERE id = ?'
    );
    stmt.run(name, description, id);
    return this.getById(id);
  }

  static patch(id, updates) {
    const current = this.getById(id);
    if (!current) return null;

    const fields = [];
    const values = [];
    
    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      fields.push('description = ?');
      values.push(updates.description);
    }

    if (fields.length === 0) return current;

    values.push(id);
    const stmt = db.prepare(
      `UPDATE items SET ${fields.join(', ')} WHERE id = ?`
    );
    stmt.run(...values);
    return this.getById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM items WHERE id = ?');
    return stmt.run(id);
  }
}