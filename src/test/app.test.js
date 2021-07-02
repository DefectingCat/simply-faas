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
  it('base test', async () => {
    await request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Home!');
  });
  it('run func 1', async () => {
    await request(server)
      .get('/func')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('{"message":"it works!","status":"ok "}');
  });
});
