const request = require('supertest');
const assert = require('assert');
const { app } = require('../index.js');

describe('The API', () => {
  it('returns pong', async function () {
    const resp = await request(app).get('/api/ping').expect(200);
    assert.deepEqual(resp.body.message, 'pong');
  });
});
