require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('./app');
const pool = require('./lib/utils/pool');
const fs = require('fs');

describe('test filament model', () => {

  beforeAll(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('insert Filament Green', async() => {
    const newFilament = {
      filamentName: 'Mystic Green',
      brand: 'Prusa',
      type: 'PLA',
      meltingPoint: 230,
      yearlySales: 500000 };

    const expectation = { 'id': '1',
      filamentName: 'Mystic Green',
      brand: 'Prusa',
      type: 'PLA',
      meltingPoint: 230,
      yearlySales: 500000 };

    const data = await fakeRequest(app)
      .post('/filament')
      .send(newFilament)
      .expect(200);

    expect(expectation).toEqual(data.body);
  });

  it('insert Filament Black', async() => {    
    const newFilament = {
      filamentName: 'Galaxy Black',
      brand: 'Matter Hacks',
      type: 'PLA',
      meltingPoint: 210,
      yearlySales: 0 };

    const expectation = { 'id': '2',
      filamentName: 'Galaxy Black',
      brand: 'Matter Hacks',
      type: 'PLA',
      meltingPoint: 210,
      yearlySales: 0 };

    const data = await fakeRequest(app)
      .post('/filament')
      .send(newFilament)
      .expect(200);

    expect(expectation).toEqual(data.body);
  });

  it('get all Filament', async() => {

    const expectation = [
      { 'id': '1',
        filamentName: 'Mystic Green',
        brand: 'Prusa',
        type: 'PLA',
        meltingPoint: 230,
        yearlySales: 500000 },
      { 'id': '2',
        filamentName: 'Galaxy Black',
        brand: 'Matter Hacks',
        type: 'PLA',
        meltingPoint: 210,
        yearlySales: 0 }
    ];

    const data = await fakeRequest(app)
      .get('/filament')
      .expect(200);

    expect(expectation).toEqual(data.body);

  });

  it('get Green', async() => {

    const id = 1;

    const expectation = { 'id': '1',
      filamentName: 'Mystic Green',
      brand: 'Prusa',
      type: 'PLA',
      meltingPoint: 230,
      yearlySales: 500000 };

    const data = await fakeRequest(app)
      .get(`/filament/${id}`)
      .expect(200);

    expect(expectation).toEqual(data.body);

  });

  it('update Black Filament', async() => {

    const id = 2;

    const updateFilament = {
      filamentName: 'Galaxy Black',
      brand: 'Prusa',
      type: 'PETG',
      meltingPoint: 240,
      yearlySales: 8000000 };

    const expectation = { 'id': '2',
      filamentName: 'Galaxy Black',
      brand: 'Prusa',
      type: 'PETG',
      meltingPoint: 240,
      yearlySales: 8000000 };

    const data = await fakeRequest(app)
      .put(`/filament/${id}`)
      .send(updateFilament)
      .expect(200);

    expect(expectation).toEqual(data.body);

  });

  it('delete Filament Green', async() => {

    const id = 1;

    const expectation = { 'id': '1',
      filamentName: 'Mystic Green',
      brand: 'Prusa',
      type: 'PLA',
      meltingPoint: 230,
      yearlySales: 500000 };

    const data = await fakeRequest(app)
      .delete(`/filament/${id}`)
      .expect(200);

    expect(expectation).toEqual(data.body);

  });

  

});