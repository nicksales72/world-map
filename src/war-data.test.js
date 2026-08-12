import assert from 'node:assert/strict';
import test from 'node:test';
import { countries } from './country-data.js';
import { getMajorWar, majorWars } from './war-data.js';

const countryCodes = new Set(countries.map((country) => country.cca3));

test('provides the expected selectable war layers', () => {
  assert.deepEqual(
    majorWars.map((war) => war.id),
    ['ww1', 'ww2', 'korean-war', 'gulf-war', 'vietnam-war', 'afghanistan-war'],
  );
  assert.equal(getMajorWar('ww2')?.name, 'World War II');
  assert.equal(getMajorWar('missing'), null);
});

test('includes Canada in each war where it was a selected combat contributor', () => {
  assert.equal(getMajorWar('ww1').participants.CAN.joined, '4 August 1914');
  assert.equal(getMajorWar('ww2').participants.CAN.joined, '10 September 1939');
  assert.equal(getMajorWar('korean-war').participants.CAN.side, 'unCommand');
  assert.equal(getMajorWar('gulf-war').participants.CAN.side, 'coalition');
  assert.equal(getMajorWar('afghanistan-war').participants.CAN.side, 'coalition');
});

test('includes every foreign state that deployed Korean War combat units under UN Command', () => {
  const koreanWar = getMajorWar('korean-war');
  const combatContributors = [
    'AUS',
    'BEL',
    'CAN',
    'COL',
    'ETH',
    'FRA',
    'GRC',
    'LUX',
    'NLD',
    'NZL',
    'PHL',
    'ZAF',
    'THA',
    'TUR',
    'GBR',
    'USA',
  ];

  for (const countryCode of combatContributors) {
    assert.equal(koreanWar.participants[countryCode]?.side, 'unCommand', countryCode);
  }
});

test('marks indivisible modern polygons as historical proxies', () => {
  assert.equal(getMajorWar('vietnam-war').participants.VNM.side, 'divided');
  assert.equal(getMajorWar('afghanistan-war').participants.AFG.side, 'contested');
});

test('war participants map to countries and include complete factoids', () => {
  for (const war of majorWars) {
    assert.ok(Object.keys(war.sides).length >= 2, `${war.id} needs at least two sides`);
    assert.ok(Object.keys(war.participants).length >= 2, `${war.id} needs participants`);
    assert.match(war.source.url, /^https:\/\//);

    for (const side of Object.values(war.sides)) {
      assert.match(side.color, /^#[0-9a-f]{6}$/i);
      assert.match(side.borderColor, /^#[0-9a-f]{6}$/i);
      assert.ok(['solid', 'dashed', 'dotted'].includes(side.pattern));
    }

    for (const [countryCode, participant] of Object.entries(war.participants)) {
      assert.ok(countryCodes.has(countryCode), `${war.id} uses unknown country ${countryCode}`);
      assert.ok(war.sides[participant.side], `${war.id}/${countryCode} uses an unknown side`);
      assert.ok(participant.entity, `${war.id}/${countryCode} has no historical entity`);
      assert.ok(participant.joined, `${war.id}/${countryCode} has no entry date`);
      assert.ok(participant.entry, `${war.id}/${countryCode} has no entry context`);
      assert.ok(participant.role, `${war.id}/${countryCode} has no role`);
    }
  }
});
