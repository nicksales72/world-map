import assert from 'node:assert/strict';
import test from 'node:test';
import { countries, formatCallingCode, getCountryFacts } from './country-data.js';

const country = (code) => countries.find((entry) => entry.cca3 === code);

test('contains the current 27 EU members', () => {
  const members = countries.filter((entry) => entry.atlas.euMemberSince);

  assert.equal(members.length, 27);
  assert.equal(country('HRV').atlas.euMemberSince, 2013);
  assert.equal(country('GBR').atlas.euMemberSince, null);
});

test('applies reviewed current-data corrections', () => {
  assert.deepEqual(Object.keys(country('BGR').currencies), ['EUR']);
  assert.deepEqual(Object.keys(country('CUW').currencies), ['XCG']);
  assert.deepEqual(Object.keys(country('SLE').currencies), ['SLE']);
  assert.deepEqual(country('GNQ').capital, ['Ciudad de la Paz']);
  assert.deepEqual(country('LKA').borders, []);
  assert.equal(country('SJM').area, 61399);
  assert.equal(country('VAT').unMember, false);
  assert.equal(Object.values(country('ZAF').languages).length, 12);
});

test('formats shared and multi-prefix calling codes without truncating them', () => {
  assert.equal(formatCallingCode(country('USA')), '+1');
  assert.equal(formatCallingCode(country('GBR')), '+44');
  assert.equal(formatCallingCode(country('SHN')), '+290, +247');
});

test('builds several rotating facts for every country record', () => {
  for (const entry of countries) {
    assert.ok(entry.area > 0, `${entry.cca3} has an invalid area`);

    const facts = getCountryFacts(entry);

    assert.ok(facts.length >= 3, `${entry.cca3} only has ${facts.length} facts`);
    assert.equal(new Set(facts).size, facts.length, `${entry.cca3} has duplicate facts`);
  }
});
