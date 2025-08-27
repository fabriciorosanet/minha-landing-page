const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

let db;

function initDb() {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database('./contacts.db', (err) => {
            if (err) {
                reject(err);
                return;
            }

            db.run(`CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}

app.post('/api/contacts', (req, res) => {
    try {
        const { name, phone, email, message } = req.body || {};
        if (!name || !phone || !email || !message) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
        }

        const stmt = db.prepare('INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)');
        stmt.run([name, phone, email, message], function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao salvar contato.' });
            }
            res.status(201).json({ id: this.lastID, ok: true });
        });
        stmt.finalize();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar contato.' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`API de contatos rodando em http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Falha ao iniciar o banco de dados', err);
    process.exit(1);
});


