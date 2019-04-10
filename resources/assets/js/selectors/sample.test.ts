import * as sample from './sample';

it('returns no samples', () => {
  expect(sample.getSamples({ sample: [] })).toEqual([]);
});

it('returns with samples', () => {
  const s = {
    id: 1,
    name: 'Sample 1'
  };
  expect(sample.getSamples({ sample: [s] })).toEqual([s]);
});
