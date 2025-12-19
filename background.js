const generators = {
  name: () => {
    const names = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Juliana Lima', 'Fernando Alves', 'Patricia Rocha'];
    return names[Math.floor(Math.random() * names.length)];
  },
  email: () => {
    const users = ['luiz', 'ricardo', 'barel', 'ana', 'carlos', 'user', 'admin', 'teste'];
    const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'empresa.com.br'];
    const selectedUser = users[Math.floor(Math.random() * users.length)];
    const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${selectedUser}${Math.floor(Math.random() * 999)}@${selectedDomain}`;
  },
  phone: () => {
    const validDdds = [
      11, 12, 13, 14, 15, 16, 17, 18, 19,
      21, 22, 24, 27, 28,
      31, 32, 33, 34, 35, 37, 38,
      41, 42, 43, 44, 45, 46,
      47, 48, 49,
      51, 53, 54, 55,
      61,
      62, 64,
      63,
      65, 66,
      67,
      68,
      69,
      71, 73, 74, 75, 77,
      79,
      81, 82, 83, 84, 85, 86, 87, 88, 89,
      91, 92, 93, 94, 95, 96, 97, 98, 99
    ];

    const ddd = validDdds[Math.floor(Math.random() * validDdds.length)];

    let phone = '9';
    for (let i = 0; i < 8; i++) {
      phone += Math.floor(Math.random() * 10);
    }

    return `${ddd}${phone}`;
  },
  cpf: () => {
    const cpf = [];

    for (let i = 0; i < 9; i++) {
      cpf.push(Math.floor(Math.random() * 10));
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += cpf[i] * (10 - i);
    }
    let firstValidatorDigit = (sum * 10) % 11;
    if (firstValidatorDigit === 10) firstValidatorDigit = 0;
    cpf.push(firstValidatorDigit);

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += cpf[i] * (11 - i);
    }
    let secondValidatorDigit = (sum * 10) % 11;
    if (secondValidatorDigit === 10) secondValidatorDigit = 0;
    cpf.push(secondValidatorDigit);

    return cpf.join('');
  },
  rg: () => {
    const n = () => Math.floor(Math.random() * 10);
    return `${n()}${n()}.${n()}${n()}${n()}.${n()}${n()}${n()}-${n()}`;
  },
  cnpj: () => {
    const cnpj = [];

    for (let i = 0; i < 8; i++) {
      cnpj.push(Math.floor(Math.random() * 10));
    }
    cnpj.push(0, 0, 0, 1);

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += cnpj[i] * weights1[i];
    }
    let firstValidatorDigit = sum % 11;
    firstValidatorDigit = firstValidatorDigit < 2 ? 0 : 11 - firstValidatorDigit;
    cnpj.push(firstValidatorDigit);

    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += cnpj[i] * weights2[i];
    }
    let secondValidatorDigit = sum % 11;
    secondValidatorDigit = secondValidatorDigit < 2 ? 0 : 11 - secondValidatorDigit;
    cnpj.push(secondValidatorDigit);

    return cnpj.join('');
  },
  ie: () => {
    const base = [];
    for (let i = 0; i < 8; i++) {
      base.push(Math.floor(Math.random() * 10));
    }

    const weights1 = [1, 3, 4, 5, 6, 7, 8, 10];
    let sum1 = base.reduce((acc, num, i) => acc + num * weights1[i], 0);
    const firstDigit = sum1 % 11 % 10;

    const base2 = [...base.slice(0, 3), firstDigit, ...base.slice(3)];
    const weights2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum2 = base2.reduce((acc, num, i) => acc + num * weights2[i], 0);
    const secondDigit = sum2 % 11 % 10;

    return `${base.join('')}${firstDigit}${secondDigit}`;
  },
  cep: () => {
    const num = Math.floor(Math.random() * 90000000) + 10000000;
    return `${num.toString().slice(0, 5)}-${num.toString().slice(5)}`;
  },
  address: () => {
    const streets = ['Rua das Flores', 'Av. Paulista', 'Rua XV de Novembro', 'Av. Brasil', 'Rua São João'];
    const selectedStreet = streets[Math.floor(Math.random() * streets.length)];
    const number = Math.floor(Math.random() * 9999) + 1;
    return `${selectedStreet}, ${number}`;
  },
  date: () => {
    const dia = Math.floor(Math.random() * 28) + 1;
    const mes = Math.floor(Math.random() * 12) + 1;
    const ano = Math.floor(Math.random() * 50) + 1970;
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  },
  password: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  }
};

// create contextMenu when install extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'inputGenerator',
    title: 'Gerar Input',
    contexts: ['editable']
  });

  const types = [
    { id: 'name', title: 'Nome Completo' },
    { id: 'email', title: 'E-mail' },
    { id: 'phone', title: 'Telefone' },
    { id: 'cpf', title: 'CPF' },
    { id: 'rg', title: 'RG' },
    { id: 'cnpj', title: 'CNPJ' },
    { id: 'ie', title: 'Inscrição Estadual' },
    { id: 'cep', title: 'CEP' },
    { id: 'address', title: 'Endereço' },
    { id: 'date', title: 'Data' },
    { id: 'password', title: 'Senha' }
  ];

  types.forEach(tipo => {
    chrome.contextMenus.create({
      id: tipo.id,
      parentId: 'inputGenerator',
      title: tipo.title,
      contexts: ['editable']
    });
  });
});

// Manipulate clicks on menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (generators[info.menuItemId]) {
    const generatedValue = generators[info.menuItemId]();

    console.log('Generating:', info.menuItemId, '=', generatedValue);

    chrome.tabs.sendMessage(tab.id, {
      action: 'fillInput',
      value: generatedValue
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error on send message:', chrome.runtime.lastError);
      } else {
        console.log('Response:', response);
      }
    });
  }
});