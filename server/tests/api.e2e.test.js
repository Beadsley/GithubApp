const request = require('supertest');
const assert = require('assert');
const { app } = require('../index.js');

describe('The API', () => {
  it('returns language statistics based on user', async function () {
    const expected = {
      projects: 6,
      languages: [
        {
          name: 'JavaScript',
          sum: 54530,
          fraction: 0.3684832922255634,
          label: 'JavaScript(37%)',
        },
        {
          name: 'CSS',
          sum: 3342,
          fraction: 0.022583369936142177,
          label: 'CSS(2%)',
        },
        {
          name: 'HTML',
          sum: 1700,
          fraction: 0.011487650775416428,
          label: 'HTML(1%)',
        },
        {
          name: 'Java',
          sum: 88413,
          fraction: 0.597445687062878,
          label: 'Java(60%)',
        },
      ],
      total: 147985,
    };
    const resp = await request(app)
      .get('/api/languages/Beadsley')
      .expect(200);
    assert.deepEqual(resp.body, expected);
  });
});
