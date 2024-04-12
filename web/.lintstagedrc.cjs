module.exports = {
  "*.vue": ["eslint --fix", "prettier --write"],
  "*.{ts, tsx}": ["eslint --fix", "prettier --parser=typescript --write"],
  "*.{js, jsx}": ["eslint --fix", "prettier --write"],
  "*.{json, md}": ["prettier --write"],
};
