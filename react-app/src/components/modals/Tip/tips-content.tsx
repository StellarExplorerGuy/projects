import { Box, Link, Typography } from '@mui/joy'

export const TIP_HEADERS = [
  'Good PR',
  'Get faster feedback',
  'PR rules',
  'Review',
  'Offering feedback',
  'Responding to feedback',
  'Commit Hooks',
]

export function getTips() {
  return [
    <Box sx={{ ml: 4 }} fontWeight="sm">
      <ul style={{ marginTop: 0 }}>
        <li>A good pull request tends to be reviewed quickly.</li>
        <li>It reduces bug introduction into codebase.</li>
        <li>It does not block other developers.</li>
      </ul>
    </Box>,
    <Box sx={{ ml: 4 }} fontWeight="sm">
      <ul style={{ marginTop: 0 }}>
        <li>
          Large pull requests will take more time and will probably block other developers who may be depending on the
          code.
        </li>
        <li>
          Add some screenshots for your front-end changes! Screenshots simply make the job for the reviewer much easier.
          If you’re feeling extra generous, add a GIF or video; You can offer visual aids, like 'before' and' after'
          screenshots, while modifying existing features.
        </li>
      </ul>
    </Box>,
    <Box sx={{ ml: 4 }} fontWeight="sm">
      <ul style={{ marginTop: 0 }}>
        <li>Require a pull request before merging.</li>
        <li>Require approvals: 1.</li>
        <li>Require status checks to pass before merging (e.g. build, tests, linter).</li>
        <li>
          Enable the Squash and merge option. The individual commits from a contributor's pull request are combined into
          a single commit. This allows you to keep a clean git history.
        </li>
      </ul>
    </Box>,
    <Box sx={{ ml: 4 }} fontWeight="sm">
      <Box sx={{ ml: -2 }}>
        Whether providing or receiving feedback, it is always helpful to keep in mind the following points:
      </Box>
      <ul style={{ marginTop: 0 }}>
        <li>Avoid selective ownership of code (e.g. “mine”, “not mine”, “yours”).</li>
        <li>Do not make assumptions, ask for clarification.</li>
        <li>
          Accept that the same problem may have more than one good solution and yours may not be the best one. Discuss
          tradeoffs/risk/impact/reach a resolution quickly.
        </li>
        <li>
          Avoid long and unnecessary discussions that cause delays in the review process and also distract other team
          members.
        </li>
        <li>
          If you or someone else identifies an additional issue that requires more than 1 hour to resolve, you can
          insert a TODO comment in the code as a reference and create an associated issue where you will provide details
          regarding this TODO reference.
        </li>
        <li>Review your own code before assigning other reviewers.</li>
      </ul>
    </Box>,
    <Box sx={{ ml: 4 }} fontWeight="sm">
      <ul style={{ marginTop: 0 }}>
        <li>Do not change the code while reviewing.</li>
        <li>If you disagree strongly, consider giving it a few minutes before responding.</li>
        <li>Think before you react.</li>
        <li>Use emoji to clarify tone. Compare "Looks good :)", LGTM or “Looks good! 👍 " with “It’s fine."</li>
      </ul>
    </Box>,
    <Box sx={{ ml: 4 }} fontWeight="sm">
      <ul style={{ marginTop: 0 }}>
        <li>Be grateful for the reviewer’s suggestions.</li>
        <li>Extract some changes and refactorings into future tasks and stories.</li>
        <li>Try to respond to every comment.</li>
      </ul>
    </Box>,
    <Box sx={{ ml: 4 }} fontWeight="sm">
      <Typography sx={{ ml: -2 }} level="title-sm">
        Commit Linting [Node env]
      </Typography>
      <ul style={{ marginTop: 0 }}>
        <li>
          Commit messages can be linted using the{' '}
          <Link target="_blank" href="https://www.conventionalcommits.org">
            conventional commits guidelines
          </Link>{' '}
          and{' '}
          <Link target="_blank" href="https://www.npmjs.com/package/@commitlint/config-conventional">
            commitlint package
          </Link>
          .
        </li>
        <li>
          <Link target="_blank" href="https://typicode.github.io/husky/getting-started.html">
            Husky
          </Link>{' '}
          can be used for pre-commit linting of commit messages and code.
        </li>
      </ul>
      <br />
      <Box sx={{ ml: -2 }}>
        Detailed setup can be found{' '}
        <Link target="_blank" href="https://github.com/StellarExplorerGuy/projects/blob/main/docs/commit/commit.md">
          here
        </Link>
        .
      </Box>
    </Box>,
  ]
}
