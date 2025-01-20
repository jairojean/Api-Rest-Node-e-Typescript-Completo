 
import { testServer } from '../jest.setup';


describe('city - DeleteById', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'deletebuid-city@gmail.com';
    await testServer.post('/cadastrar').send({ email, senha: '123456', nome: 'Teste' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  it('Tenta apagar registro sem usar token de autenticação', async () => {
    const res1 = await testServer
      .delete('/city/1')
      .send();
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.default');
  });
  it('Apaga registro', async () => {

    const res1 = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'Caxias do sul' });

    expect(res1.statusCode).toEqual(200);

    const resApagada = await testServer
      .delete(`/city/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resApagada.statusCode).toEqual(400);
  });
  it('Tenta apagar registro que não existe', async () => {

    const res1 = await testServer
      .delete('/city/99999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(500);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
