require('dotenv').config()

const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const port = process.env.PORT || 3000;

const db = new Database('data.db');



db.exec(`
  CREATE TABLE IF NOT EXISTS ukoly (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    hotovo INTEGER NOT NULL DEFAULT 0
     )
    `);

    app.use(cors());
    app.use(express.json());

    app.get('/kontakt', (req, res) => {
  res.json ({
    email: process.env.KONTAKT_EMAIL,
    telefon: process.env.KONTAKT_TELEFON
  });
});

    app.get('/ukoly', (req, res) => {
      const nacist = db.prepare('SELECT * FROM ukoly');
      const vsechnyUkoly = nacist.all();
      res.json(vsechnyUkoly);
    });

    app.post('/ukoly', (req, res) => {
      const text = req.body.text;

      if (!text || text.trim() === '') {
        return res.status(400).json({chyba: 'Text úkolu nesmí být prázdný.' });
      }

      try {
        const vlozit = db.prepare('INSERT INTO ukoly (text) VALUES (?)');
        const vysledek = vlozit.run(text);

      res.json({
        zprava: 'Úkol byl přidán.',
        id: vysledek.lastInsertRowid
      });
    } catch (chyba) {
      console.error('Chyba při ukládání úkolu:', chyba);
      res.status(500).json({chyba: 'Nepodařilo se uložit úkol.'});
    }
    });

    app.put('/ukoly/:id', (req, res) => {
      const id = req.params.id;
      const hotovo = req.body.hotovo;

      const upravit = db.prepare('UPDATE ukoly SET hotovo = ? WHERE id = ?');
      const vysledek = upravit.run(hotovo, id);

      res.json({
        zprava: `Úkol s ID ${id} byl upraven.`,
        zmenenoRadku: vysledek.changes
      });
    });

    app.delete('/ukoly/:id', (req, res) => {
      const id = req.params.id;

      const smazat = db.prepare('DELETE FROM ukoly WHERE id = ?');
      const vysledek = smazat.run(id);

      res.json({
        zprava: `Úkol s ID ${id} byl smazán.`,
        smazanoRadku: vysledek.changes
      });
    });

    app.listen(port, () => {
      console.log(`Server běží na http://localhost:${port}`);
    });