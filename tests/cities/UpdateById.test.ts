 
import { testServer } from '../jest.setup';


describe('city - UpdateById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'updatebyid-city@gmail.com';
    await testServer.post('/cadastrar').send({ email, senha: '123456', nome: 'Teste' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  it('Tenta atualizar sem usar token de autenticação', async () => {
    const res1 = await testServer
      .put('/city/1')
      .send({ nome: 'Teste' });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Atualiza registro', async () => {

    const res1 = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Caxias do sul' });

    expect(res1.statusCode).toEqual(400);

    const resAtualizada = await testServer
      .put(`/city/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Caxias' });

    expect(resAtualizada.statusCode).toEqual(400);
  });
  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer
      .put('/city/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Caxias' });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
