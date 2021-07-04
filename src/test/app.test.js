/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// const sum = require('./sum');
import server from '../app';
import request from 'supertest';

afterAll((done) => {
  server.close();
  done();
});

describe('Base tests', () => {
  it('run func 1', async () => {
    await request(server)
      .get('/func')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(
        '{"message":"it works!","status":"ok ","event":{},"ctx":{"request":{"method":"GET","url":"/func","header":{"host":"127.0.0.1:3001","accept-encoding":"gzip, deflate","accept":"application/json","connection":"close"}},"response":{"status":404,"message":"Not Found","header":{"access-control-allow-origin":"*","access-control-allow-methods":"OPTIONS, GET, PUT, POST, DELETE","access-control-allow-headers":"x-requested-with, accept, origin, content-type","content-type":"application/json;charset=utf-8"}},"app":{"subdomainOffset":2,"proxy":false,"env":"test"},"originalUrl":"/func","req":"<original node req>","res":"<original node res>","socket":"<original node socket>"}}'
      );
  });
  it('run func 1 with post', async () => {
    await request(server)
      .post('/func')
      .set('Accept', 'application/json')
      .send({ name: 'xfy' })
      .expect(200)
      .expect(
        '{"message":"it works!","status":"ok ","event":{"name":"xfy"},"ctx":{"request":{"method":"POST","url":"/func","header":{"host":"127.0.0.1:3001","accept-encoding":"gzip, deflate","accept":"application/json","content-type":"application/json","content-length":"14","connection":"close"}},"response":{"status":404,"message":"Not Found","header":{"access-control-allow-origin":"*","access-control-allow-methods":"OPTIONS, GET, PUT, POST, DELETE","access-control-allow-headers":"x-requested-with, accept, origin, content-type","content-type":"application/json;charset=utf-8"}},"app":{"subdomainOffset":2,"proxy":false,"env":"test"},"originalUrl":"/func","req":"<original node req>","res":"<original node res>","socket":"<original node socket>"}}'
      );
  });
});

describe('API test', () => {
  it('create func', async () => {
    await request(server)
      .post('/api/create')
      .set('Accept', 'application/json')
      .send({
        userId: 'bc3832d9-db47-4104-94ac-ebe43c21d29a',
        funcName: 'xfy',
        funContext: `module.exports = (event, ctx) => {
          return { message: 'it works!', status: 'ok ', event, ctx };
        };`,
      })
      .expect(200)
      .expect('{"userId":"bc3832d9-db47-4104-94ac-ebe43c21d29a","state":"ok"}');
  });
  it('list func', async () => {
    await request(server)
      .post('/api/list')
      .set('Accept', 'application/json')
      .send({
        userId: 'bc3832d9-db47-4104-94ac-ebe43c21d29a',
      })
      .expect(200)
      .expect(
        '{"userId":"bc3832d9-db47-4104-94ac-ebe43c21d29a","list":["xfy.js"]}'
      );
  });
  it('delete func', async () => {
    await request(server)
      .delete('/api/list')
      .set('Accept', 'application/json')
      .send({
        userId: 'bc3832d9-db47-4104-94ac-ebe43c21d29a',
        funcName: 'xfy',
      })
      .expect(200)
      .expect('{"userId":"bc3832d9-db47-4104-94ac-ebe43c21d29a","state":"ok"}');
  });
});
