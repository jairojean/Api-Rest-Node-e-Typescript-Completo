 

import { testServer } from '../jest.setup';


describe('city - GetById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'getbyid-city@gmail.com';
    await testServer.post('/cadastrar').send({ email, senha: '123456', nome: 'Teste' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  it('Tenta consultar sem usar token de autenticação', async () => {
    const res1 = await testServer
      .get('/city/1')
      .send();
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Busca registro por id', async () => {

    const res1 = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Caxias do sul' });

    expect(res1.statusCode).toEqual(400);

    const resBuscada = await testServer
      .get(`/city/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(400);
    expect(resBuscada.body).toHaveProperty('nome');
  });
  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer
      .get('/city/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
