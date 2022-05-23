module.exports = {
  plugins: ["prettier"],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier'    
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  "rules": {
    "prettier/prettier": "error"
  }
}