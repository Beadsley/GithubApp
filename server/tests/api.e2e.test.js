const request = require('supertest');
const assert = require('assert');
const { app } = require('../index.js');

describe('The API', () => {
  it('returns pong', async function () {
    const expected = {
      projects: 6,
      languages: {
        JavaScript: 54530,
        CSS: 3342,
        HTML: 1700,
        Java: 88413,
      },
    };
    const resp = await request(app)
      .get('/api/languages/Beadsley')
      .expect(200);
    assert.deepEqual(resp.body, expected);
  });
});
