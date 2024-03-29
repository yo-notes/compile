# 简单的词法解析器

一个字符一个字符的解析，理解底层原理，实际中不会逐个字符来比对解析，工程量太大。

```js
const Lexer = require('./lexer');
const script = 'int age = 45;';
new Lexer().tokenize(script).print();

// int age = 45; 输出
┌─────────┬──────────────┬────────┐
│ (index) │      0       │   1    │
├─────────┼──────────────┼────────┤
│    0    │    'INT'     │ 'int ' │
│    1    │ 'Identifier' │ 'age'  │
│    2    │ 'Assignment' │  '='   │
│    3    │   'Number'   │  '45'  │
│    4    │ 'SemiColon'  │  ';'   │
└─────────┴──────────────┴────────┘

// '2 * (3 + 1)/2-7' 输出
┌─────────┬──────────────┬─────┐
│ (index) │      0       │  1  │
├─────────┼──────────────┼─────┤
│    0    │   'Number'   │ '2' │
│    1    │    'Star'    │ '*' │
│    2    │ 'LeftParen'  │ '(' │
│    3    │   'Number'   │ '3' │
│    4    │    'Plus'    │ '+' │
│    5    │   'Number'   │ '1' │
│    6    │ 'RightParen' │ ')' │
│    7    │   'Slash'    │ '/' │
│    8    │   'Number'   │ '2' │
│    9    │   'Minus'    │ '-' │
│   10    │   'Number'   │ '7' │
└─────────┴──────────────┴─────┘
```
