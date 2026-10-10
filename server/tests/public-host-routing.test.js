import test from 'node:test';
import assert from 'node:assert/strict';
import {publicHostRedirect} from '../src/public-host-routing.js';

test('routes misplaced Shareholder hostname while preserving language', () => {
  assert.equal(
    publicHostRedirect('shareholderreview.adamasadvisors.com', '/?lang=cs'),
    'https://shareholderreview-staging.onrender.com/?lang=cs'
  );
});

test('routes misplaced Adviser hostname while preserving invitation query', () => {
  assert.equal(
    publicHostRedirect('adviserreview.adamasadvisors.com:443', '/?lang=de&invite=example'),
    'https://adviserreview.onrender.com/?lang=de&invite=example'
  );
});

test('does not redirect the legitimate NextGen hostname', () => {
  assert.equal(publicHostRedirect('nextgenreview.adamasadvisors.com', '/?lang=en'), null);
});
