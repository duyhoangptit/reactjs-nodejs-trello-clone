module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  // define rule scan code.
  rules: {
    // default reactjs
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    // MUI
    'no-restricted-imports': [
      'error',
      {
        'patterns': ['@mui/*/*/*']
      }
    ],

    // important
    // Không console.log trong dự án.
    'no-console': 1,
    // if else hiệu quả
    'no-lonely-if': 1,
    // thông báo biến tạo ra mà không sử dụng đến
    'no-unused-vars': 1,
    // cảnh báo thừa dấu space
    'no-trailing-spaces': 1,
    // support format đẹp, không thừa line trống
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    // giúp format code, thêm space vào các đoạn ){}
    'space-before-blocks': ['error', 'always'],
    // luôn là 1 space
    'object-curly-spacing': [1, 'always'],
    // config 2 space thay vì tab hoặc 4 space
    'indent': ['warn', 2],
    // remove, ko cần dấu ; cuối cùng
    'semi': [1, 'never'],
    // sử dụng double hay single word, sử dụng ' hay "
    'quotes': ['error', 'single'],
    // format cho một array với 1 space
    'array-bracket-spacing': 1,
    // không phân biệt os
    'linebreak-style': 0,
    // cảnh báo những dư thừa không dùng tới.
    'no-unexpected-multiline': 'warn',
    // format space vào if, else.
    'keyword-spacing': 1,
    // remove những dấu , cuối cùng của một array hoặc trong 1 object
    'comma-dangle': 1,
    // format space khi khai bao kieu du lieu, vi du. let a ,b => let a, b
    'comma-spacing': 1,
    // add khoảng trống vào trước vào sau arrow func
    'arrow-spacing': 1
  },
}
