# Landing Page - Fabrício Rosa

Landing page responsiva para desenvolvedor backend com formulário de contato funcional.

## 🚀 Funcionalidades

- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Formulário de Contato**: Sistema completo com backend Node.js + SQLite
- **Animações**: Efeitos AOS (Animate On Scroll)
- **Menu Mobile**: Hamburger menu com navegação suave
- **Botões Flutuantes**: WhatsApp e "Voltar ao Topo"

## 📁 Estrutura do Projeto

```
minha-landing-page/
├── landing-page-main/          # Frontend
│   ├── assets/
│   │   ├── css/               # Estilos
│   │   ├── js/                # JavaScript
│   │   ├── img/               # Imagens
│   │   └── fonts/             # Fontes
│   └── index.html             # Página principal
├── server/                    # Backend
│   ├── index.js              # Servidor Express
│   ├── package.json          # Dependências
│   └── contacts.db           # Banco SQLite (gerado automaticamente)
├── .gitignore                # Arquivos ignorados pelo Git
└── README.md                 # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (ES6+)
- Bootstrap Icons
- AOS (Animate On Scroll)

### Backend
- Node.js
- Express.js
- SQLite3
- CORS

## ⚡ Como Executar

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd minha-landing-page
```

### 2. Configure o Backend
```bash
cd server
npm install
npm start
```

O servidor estará rodando em `http://localhost:3001`

### 3. Abra o Frontend
Abra o arquivo `landing-page-main/index.html` no seu navegador ou use um servidor local.

## 📱 Responsividade

A página é totalmente responsiva e funciona em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Configurações

### Personalizar Informações
Edite o arquivo `landing-page-main/index.html` para alterar:
- Nome e descrição
- Links das redes sociais
- Informações de contato
- Imagens

### Modificar Estilos
Os estilos estão organizados em:
- `style.css`: Estilos principais
- `responsividade.css`: Media queries para responsividade
- `clash-grotesk.css`: Fontes personalizadas

### Backend
Para modificar o servidor, edite `server/index.js`:
- Porta do servidor (padrão: 3001)
- Estrutura do banco de dados
- Validações do formulário

## 📊 Banco de Dados

O banco SQLite (`contacts.db`) é criado automaticamente e contém:
- **Tabela**: `contacts`
- **Campos**: id, name, phone, email, message, created_at

### Visualizar Contatos
Para ver os contatos salvos, você pode:
1. Usar um visualizador SQLite (DB Browser for SQLite)
2. Acessar o arquivo `server/contacts.db`
3. Ou adicionar um endpoint para listar contatos

## 🚀 Deploy

### Frontend
Pode ser hospedado em qualquer servidor web estático:
- GitHub Pages
- Netlify
- Vercel
- Servidor tradicional

### Backend
Para produção, considere:
- Heroku
- Railway
- DigitalOcean
- AWS/GCP/Azure

**Importante**: Atualize a URL da API no arquivo `contact.js` para a URL de produção.

## 📝 Licença

Este projeto é de uso pessoal. Sinta-se livre para usar como referência.

## 👨‍💻 Autor

**Fabrício Rosa**
- GitHub: [@fabriciorosanet](https://github.com/fabriciorosanet)
- LinkedIn: [fabriciorosanet](https://www.linkedin.com/in/fabriciorosanet/)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
