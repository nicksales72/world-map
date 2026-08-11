import assert from 'node:assert/strict';
import test from 'node:test';
import { countries } from './country-data.js';
import { getMajorWar, majorWars } from './war-data.js';

const countryCodes = new Set(countries.map((country) => country.cca3));

test('provides the expected selectable war layers', () => {
  assert.deepEqual(
    majorWars.map((war) => war.id),
    ['ww1', 'ww2', 'korean-war', 'gulf-war'],
  );
  assert.equal(getMajorWar('ww2')?.name, 'World War II');
  assert.equal(getMajorWar('missing'), null);
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
