const generators = {
  name: () => {
    const names = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Juliana Lima', 'Fernando Alves', 'Patricia Rocha'];
    return names[Math.floor(Math.random() * names.length)];
  },
  email: () => {
    const users = ['luiz', 'ricardo', 'barel', 'ana', 'carlos', 'user', 'admin', 'teste', 'yan', 'giovani', 'roberto'];
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
    return `${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}${n()}`;
  },
  cnpj: () => {
    const base = randomCnpjBase('0123456789');
    return base + cnpjCheckDigits(base);
  },
  cnpj_alfa: () => {
    const base = randomCnpjBase('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return base + cnpjCheckDigits(base);
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
  password: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  },
  uuid: () => {
    return crypto.randomUUID()
  }
};

// Sorteia os 12 primeiros caracteres do CNPJ (8 da raiz + 4 da filial) usando o alfabeto dado.
// A filial "0000" não existe, então é sorteada de novo nesse caso.
function randomCnpjBase(alphabet) {
  const pick = (n) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return s;
  };

  let branch;
  do {
    branch = pick(4);
  } while (branch === '0000');

  return pick(8) + branch;
}

// Calcula os 2 DVs do CNPJ (numérico ou alfanumérico) a partir dos 12 primeiros caracteres.
// Cada caractere vale (código ASCII - 48): '0'-'9' => 0-9, 'A'-'Z' => 17-42.
function cnpjCheckDigits(base) {
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const values = [...base].map(c => c.charCodeAt(0) - 48);

  const digit = (weights) => {
    const sum = weights.reduce((acc, w, i) => acc + values[i] * w, 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const first = digit(weights1);
  values.push(first);
  const second = digit(weights2);

  return `${first}${second}`;
}

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
    { id: 'cnpj', title: 'CNPJ (legado)' },
    { id: 'cnpj_alfa', title: 'CNPJ alfanumérico' },
    { id: 'ie', title: 'Inscrição Estadual' },
    { id: 'password', title: 'Senha' },
    { id: 'uuid', title: 'UUID v4' }
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