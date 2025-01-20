

import { testServer } from '../jest.setup';


describe('city - GetAll', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getall-city@gmail.com';
    await testServer.post('/cadastrar').send({ email, senha: '123456', nome: 'Teste' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  it('Tenta consultar sem usar token de autenticação', async () => {
    const res1 = await testServer
      .get('/city')
      .send();
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Buscar todos os registros', async () => {

    const res1 = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Caxias do sul' });

    expect(res1.statusCode).toEqual(400);

    const resBuscada = await testServer
      .get('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(400);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
