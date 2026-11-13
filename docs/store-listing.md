# Listagem na Chrome Web Store (pt-BR)

## Nome
Gerador de Inputs

## Descrição curta (máx. 132 caracteres)
Gere dados fictícios (CPF, CNPJ, nome, e-mail e mais) em campos de formulário pelo botão direito.

## Descrição detalhada
Gerador de Inputs preenche campos de formulário com dados fictícios e válidos, direto pelo menu do botão direito. Ideal para quem desenvolve e testa sistemas e cansa de inventar CPF, CNPJ ou e-mail toda hora.

Como usar:
1. Clique com o botão direito em um campo de texto.
2. Escolha "Gerar Input" e o tipo de dado.
3. O campo é preenchido na hora.

Tipos disponíveis:
• Pessoais: nome completo, e-mail, telefone, data de nascimento, CEP
• Documentos: CPF, RG, CNPJ (numérico), CNPJ alfanumérico, inscrição estadual
• Outros: senha aleatória, UUID v4

Documentos como CPF e CNPJ são gerados com dígitos verificadores válidos. Os dados são totalmente aleatórios e fictícios, para uso em testes e desenvolvimento.

Privacidade: a extensão não coleta, não armazena e não envia nenhuma informação. Tudo é gerado localmente no seu navegador.

## Categoria
Ferramentas para desenvolvedores

## Idioma
Português (Brasil)

## Finalidade única
Gerar dados fictícios e preencher o campo de formulário selecionado pelo usuário, por meio do menu de contexto.

## Justificativa das permissões
- **contextMenus**: cria o menu "Gerar Input" exibido ao clicar com o botão direito em campos editáveis.
- **activeTab**: concede acesso temporário à aba atual somente após o usuário clicar em um item do menu.
- **scripting**: injeta, na aba ativa e apenas após o clique no menu, a função que escreve o valor gerado no campo selecionado.

A extensão não solicita permissões de host e não executa código remoto.

## Práticas de privacidade (aba "Privacidade" do painel)
- Dados do usuário coletados: nenhum (marcar todas as categorias como "não coleta").
- Certificar que os dados não são vendidos, não são usados fora da finalidade única e não são usados para crédito/empréstimo.
- Código remoto: não.

## Política de privacidade (publicar em uma URL)

> **Política de Privacidade — Gerador de Inputs**
>
> O Gerador de Inputs não coleta, armazena, compartilha nem transmite dados pessoais ou de navegação. Todos os valores são gerados localmente no seu navegador e escritos apenas no campo que você selecionou. A extensão não utiliza servidores, cookies, analytics nem serviços de terceiros.
>
> Dúvidas: abra uma issue em https://github.com/LuizBarel/input-generator

Sugestão: publicar este texto via GitHub Pages ou como arquivo do repositório e usar a URL no painel.

## Materiais gráficos
- Ícone da loja: `icons/icon128.png`
- Screenshots: 1280x800 (mín. 1, ideal 3-5), mostrando o menu do botão direito e um formulário preenchido
- Tile promocional pequeno: 440x280 (obrigatório)
