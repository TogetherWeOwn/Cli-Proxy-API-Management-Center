import { expect, test } from 'bun:test';
import { parse } from 'yaml';

test('CI retains default PR events and allows a label to refresh verification', async () => {
  const workflow = parse(await Bun.file('.github/workflows/ci.yml').text());

  expect(workflow.on.pull_request.types).toEqual(['opened', 'synchronize', 'reopened', 'labeled']);
  expect(workflow.on.push.branches).toEqual(['main', 'dev']);
  expect(
    workflow.jobs.verify.steps.some((step: { run?: string }) => step.run === 'bun run verify')
  ).toBe(true);
});
