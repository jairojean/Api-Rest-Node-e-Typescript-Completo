import { testServer } from "../jest.setup";


describe('Cidades - Create',()=>{

it('Cria registro',async()=>{

const res1 = await testServer.post('/city').send({name: 'Lima Duarte'})
expect(res1.statusCode).toEqual(201);
expect(typeof res1.body).toEqual('number');
})


    it('Teste criar Nome muito curto',async()=>{

    const res1 = await testServer.post('/city').send({name: 'L'});

    expect(res1.statusCode).toEqual(401);
    expect(res1.body).toHaveProperty('erros.body.name');
    })
    });