# Gerador de Inputs - Extensão de Navegador

## 📋 Descrição

Extensão que permite gerar dados automaticamente em campos de formulário através do menu de contexto (botão direito).

## 🚀 Tipos de Dados Suportados

Organizados em submenus no botão direito:

**Pessoais**
- Nome Completo
- E-mail
- Telefone
- Data de Nascimento
- CEP

**Documentos**
- CPF
- RG
- CNPJ (legado, numérico)
- CNPJ alfanumérico
- I.E

**Outros**
- Senha
- UUID v4

## 📦 Instalação Local (Modo Desenvolvedor)

### Chrome / Edge / Brave / Opera

1. **Prepare os arquivos:**
   
   - Clone este repositório
     
2. **Instale a extensão:**

   - Abra o navegador e digite `chrome://extensions/` na barra de endereços
   - Ative o "Modo do desenvolvedor" (canto superior direito)
   - Clique em "Carregar sem compactação"
   - Selecione a pasta do repositório
   - A extensão será instalada!

3. **Novas alterações:**
   Quando fizer alguma alteração no código (seja um git pull ou suas próprias alterações), será necessário atualizar a extensão manualmente.
   - Abra o navegador e entre na página de extensão `chrome://extensions/`
   - Encontre a extensão e clique no botão de "Atualizar" (icone de refresh)
   - Recarregue a página que você queira testar as mudanças e teste!

### Firefox

1. **Prepare os arquivos** (mesmos do Chrome)

2. **Instale temporariamente:**
   - Digite `about:debugging` na barra de endereços
   - Clique em "Este Firefox"
   - Clique em "Carregar extensão temporária"
   - Selecione o arquivo `manifest.json`

**Nota:** Para Firefox, a extensão precisa de ajustes no manifest (usar `manifest_version: 2`).

## 🎯 Como Usar

1. Acesse qualquer página com formulários
2. Clique com o **botão direito** em um campo de input
3. Selecione **"Gerar Input"**
4. Escolha o tipo de dado que deseja gerar
5. O campo será preenchido automaticamente!

## 📤 Publicação na Chrome Web Store

1. Rode `./package.sh` para gerar `gerador-de-inputs.zip` (manifest, scripts da extensão e ícones).
2. Envie o ZIP no [painel de desenvolvedor](https://chrome.google.com/webstore/devconsole).
3. Textos, justificativas de permissão e política de privacidade estão em `docs/store-listing.md`.

O preenchimento usa `activeTab` + `scripting`: o código só é injetado na aba após o clique no menu, sem permissão de host.

## 🔧 Personalização

Para adicionar um novo tipo, edite `generators.js`:

1. Escreva o gerador no objeto `implementations`:

```javascript
novoTipo: () => {
  // Sua lógica aqui
  return "valor gerado";
},
```

2. Registre-o na lista `GENERATORS` (o menu é montado a partir dela):

```javascript
{ id: 'novoTipo', title: 'Novo Tipo', group: 'group_others', generate: implementations.novoTipo }
```

## ⚠️ Observações

- Os dados gerados são fictícios e aleatórios
- Uso focado em testes e desenvolvimento
- Compatível com Chrome, Edge, Brave, Opera e navegadores Chromium

## 📝 Licença

Livre para uso pessoal e comercial.

## 👤 Autor

Luiz Barel
