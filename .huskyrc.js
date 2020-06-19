module.exports = {
  hooks: {
    // "pre-push": "npm test",
    // "pre-commit": "npm run format",
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
