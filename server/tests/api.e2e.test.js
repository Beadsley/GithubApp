const request = require('supertest');
const assert = require('assert');
const { app } = require('../../index.js');

describe('The API', () => {
  it('returns language statistics based on user', async function () {
    const expected = {
      name: 'Dan Beadleson',
      projects: 7,
      languages: {
        mostused: [
          {
            name: 'JavaScript',
            sum: 81910,
            fraction: 0.46463477585101737,
            label: 'JavaScript(46%)',
          },
          {
            name: 'CSS',
            sum: 3738,
            fraction: 0.021203818729472627,
            label: 'CSS(2%)',
          },
          {
            name: 'HTML',
            sum: 2228,
            fraction: 0.012638338183323973,
            label: 'HTML(1%)',
          },
          {
            name: 'Java',
            sum: 88413,
            fraction: 0.501523067236186,
            label: 'Java(50%)',
          },
        ],
        additional: [],
        total: 176289,
      },
    };
    const resp = await request(app).get('/api/languages/Beadsley').expect(200);
    assert.deepEqual(resp.body, expected);
  });
});
