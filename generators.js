const implementations = {
  name: () => {
    const { first, lasts, particle } = randomPerson();
    const parts = [first, ...lasts.slice(0, -1)];
    if (particle) parts.push(particle);
    parts.push(lasts[lasts.length - 1]);
    return parts.join(' ');
  },
  email: () => {
    const person = randomPerson();
    const first = removeAccents(person.first).toLowerCase();
    const last = removeAccents(person.lasts[person.lasts.length - 1]).toLowerCase();
    const digits = () => String(randInt(0, 9999)).padStart(randInt(2, 4), '0');

    const localParts = [
      `${first}.${last}`,
      `${first}.${last}`,
      `${first}${last}`,
      `${first}_${last}`,
      `${first[0]}${last}`,
      `${first}.${last}${digits()}`,
      `${first}${last}${digits()}`,
      `${first}${digits()}`
    ];

    // domínios repetidos aumentam o peso no sorteio
    const domains = [
      'gmail.com', 'gmail.com', 'gmail.com', 'gmail.com',
      'outlook.com', 'outlook.com', 'hotmail.com', 'hotmail.com',
      'yahoo.com.br', 'icloud.com', 'uol.com.br', 'bol.com.br', 'empresa.com.br'
    ];

    return `${pick(localParts)}@${pick(domains)}`;
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
  },
  cep: () => {
    // faixas de prefixo (5 primeiros dígitos) por UF
    const ranges = [
      [1000, 19999], [20000, 28999], [29000, 29999], [30000, 39999],
      [40000, 48999], [49000, 49999], [50000, 56999], [57000, 57999],
      [58000, 58999], [59000, 59999], [60000, 63999], [64000, 64999],
      [65000, 65999], [66000, 68899], [69000, 69299], [70000, 72799],
      [72800, 76799], [77000, 77995], [78000, 78899], [79000, 79999],
      [80000, 87999], [88000, 89999], [90000, 99999]
    ];
    const [min, max] = pick(ranges);
    const prefix = String(randInt(min, max)).padStart(5, '0');
    const suffix = String(randInt(1, 999)).padStart(3, '0');
    return `${prefix}${suffix}`;
  },
  birthdate: () => {
    const now = new Date();
    const youngest = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
    const oldest = new Date(now.getFullYear() - 80, now.getMonth(), now.getDate());
    const time = randInt(oldest.getTime(), youngest.getTime());
    // formato ISO (YYYY-MM-DD); o content.js converte para dd/mm/aaaa quando o campo não é type="date"
    return new Date(time).toISOString().slice(0, 10);
  }
};

const FIRST_NAMES = [
  'João', 'Pedro', 'Lucas', 'Gabriel', 'Mateus', 'Rafael', 'Guilherme', 'Felipe', 'Bruno', 'Thiago',
  'Carlos', 'Fernando', 'Ricardo', 'Eduardo', 'Rodrigo', 'Marcelo', 'André', 'Paulo', 'Diego', 'Vinícius',
  'Leonardo', 'Gustavo', 'Henrique', 'Daniel', 'Marcos', 'Luiz', 'Renato', 'Caio', 'Samuel', 'Otávio',
  'Maria', 'Ana', 'Juliana', 'Fernanda', 'Patrícia', 'Camila', 'Amanda', 'Beatriz', 'Larissa', 'Mariana',
  'Letícia', 'Bruna', 'Aline', 'Carolina', 'Gabriela', 'Isabela', 'Renata', 'Vanessa', 'Natália', 'Priscila',
  'Luciana', 'Débora', 'Tatiane', 'Raquel', 'Cristina', 'Daniela', 'Sabrina', 'Helena', 'Laura', 'Sofia'
];

const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa',
  'Rocha', 'Dias', 'Nascimento', 'Andrade', 'Moreira', 'Nunes', 'Marques', 'Machado', 'Mendes', 'Freitas',
  'Cardoso', 'Ramos', 'Gonçalves', 'Santana', 'Teixeira', 'Araújo', 'Pinto', 'Cunha', 'Moura', 'Castro',
  'Correia', 'Monteiro', 'Barros', 'Azevedo', 'Campos', 'Melo', 'Cavalcanti', 'Duarte', 'Borges', 'Batista',
  'Farias', 'Miranda', 'Pires', 'Fonseca', 'Tavares', 'Medeiros', 'Siqueira', 'Reis', 'Peixoto', 'Guimarães'
];

// só "de" combina com qualquer sobrenome (evita "do Miranda", "dos Melo")
const NAME_PARTICLES = ['de'];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// inteiro aleatório entre min e max (inclusive)
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeAccents(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Monta uma pessoa fictícia: 1 nome, 1 ou 2 sobrenomes e, às vezes, uma partícula ("da", "de"...)
function randomPerson() {
  const lasts = [pick(LAST_NAMES)];
  if (Math.random() < 0.6) {
    let second = pick(LAST_NAMES);
    while (second === lasts[0]) second = pick(LAST_NAMES);
    lasts.push(second);
  }

  return {
    first: pick(FIRST_NAMES),
    lasts,
    particle: Math.random() < 0.2 ? pick(NAME_PARTICLES) : null
  };
}

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

const GROUPS = [
  { id: 'group_personal', title: 'Pessoais' },
  { id: 'group_documents', title: 'Documentos' },
  { id: 'group_others', title: 'Outros' }
];

// Fonte única dos tipos: para criar um novo, escreva o gerador em `implementations`
// e adicione uma linha aqui (o menu é montado a partir desta lista).
const GENERATORS = [
  { id: 'name', title: 'Nome Completo', group: 'group_personal', generate: implementations.name },
  { id: 'email', title: 'E-mail', group: 'group_personal', generate: implementations.email },
  { id: 'phone', title: 'Telefone', group: 'group_personal', generate: implementations.phone },
  { id: 'birthdate', title: 'Data de Nascimento', group: 'group_personal', generate: implementations.birthdate },
  { id: 'cep', title: 'CEP', group: 'group_personal', generate: implementations.cep },
  { id: 'cpf', title: 'CPF', group: 'group_documents', generate: implementations.cpf },
  { id: 'rg', title: 'RG', group: 'group_documents', generate: implementations.rg },
  { id: 'cnpj', title: 'CNPJ (legado)', group: 'group_documents', generate: implementations.cnpj },
  { id: 'cnpj_alfa', title: 'CNPJ alfanumérico', group: 'group_documents', generate: implementations.cnpj_alfa },
  { id: 'ie', title: 'Inscrição Estadual', group: 'group_documents', generate: implementations.ie },
  { id: 'password', title: 'Senha', group: 'group_others', generate: implementations.password },
  { id: 'uuid', title: 'UUID v4', group: 'group_others', generate: implementations.uuid }
];

const GENERATORS_BY_ID = Object.fromEntries(GENERATORS.map(g => [g.id, g]));

export { GROUPS, GENERATORS, GENERATORS_BY_ID };
