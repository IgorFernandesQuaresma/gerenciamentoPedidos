// testHashing.ts

import { Bcrypt } from "./bcrypt";
import * as bcrypt from 'bcrypt';


async function testHashing() {
    const senhaSimples = '123456'; // Senha conhecida
    const saltRounds = 10; // Número de saltos para o hash

    // Cria o hash da senha
    const hashSimples = await bcrypt.hash(senhaSimples, saltRounds);
    console.log('Hash Simples:', hashSimples);

    // Verifica se a senha fornecida corresponde ao hash
    const matchSimples = await bcrypt.compare(senhaSimples, hashSimples);
    console.log('Senhas Simples coincidem?:', matchSimples); // Deve ser true
}

// Execute o teste
testHashing();
