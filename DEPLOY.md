# 🚀 Guia de Deploy

## Deploy no Vercel

### 1. Preparação
- Certifique-se de que todos os arquivos estão commitados no Git
- O arquivo `vercel.json` já está configurado

### 2. Deploy via Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login no Vercel
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

### 3. Deploy via GitHub
1. Conecte seu repositório no [Vercel Dashboard](https://vercel.com/dashboard)
2. Configure o projeto:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: deixe vazio
   - **Output Directory**: `landing-page-main`

### 4. Configurações Importantes
- O Vercel irá servir os arquivos estáticos da pasta `landing-page-main`
- O formulário de contato funcionará em modo simulado (sem backend)
- Para backend em produção, considere:
  - Vercel Functions
  - Railway
  - Heroku
  - DigitalOcean

## Deploy no Netlify

### 1. Via Netlify CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=landing-page-main --prod
```

### 2. Via GitHub
1. Conecte o repositório no Netlify
2. Configure:
   - **Publish directory**: `landing-page-main`
   - **Build command**: deixe vazio

## Deploy no GitHub Pages

### 1. Configuração
1. Vá em Settings > Pages
2. Configure:
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: `/landing-page-main`

### 2. Ou via Actions
Crie `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./landing-page-main
```

## Backend em Produção

Para ter o formulário funcionando completamente, você precisa:

### Opção 1: Vercel Functions
Crie `api/contact.js`:
```javascript
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Salvar contato (ex: em banco de dados)
    res.status(200).json({ message: 'Contato salvo!' });
  }
}
```

### Opção 2: Railway
1. Deploy o servidor Node.js no Railway
2. Atualize a URL da API no `contact.js`

### Opção 3: Netlify Functions
Crie `netlify/functions/contact.js`:
```javascript
exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    // Processar contato
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contato salvo!' })
    };
  }
};
```

## URLs de Deploy

Após o deploy, sua landing page estará disponível em:
- **Vercel**: `https://seu-projeto.vercel.app`
- **Netlify**: `https://seu-projeto.netlify.app`
- **GitHub Pages**: `https://seu-usuario.github.io/seu-repositorio`

## Troubleshooting

### Erro 404 no Vercel
- Verifique se o `vercel.json` está correto
- Certifique-se de que a estrutura de pastas está correta
- Verifique os logs no dashboard do Vercel

### Formulário não funciona
- Em produção, o formulário funciona em modo simulado
- Para backend real, implemente uma das opções acima
- Verifique o console do navegador para erros

### Imagens não carregam
- Verifique se os caminhos das imagens estão corretos
- Certifique-se de que as imagens estão na pasta `landing-page-main/assets/img/`
