const Lexer = require('./lexer');

const lexer = new Lexer();
lexer.tokenize('age>45').print();
lexer.tokenize('int age = 45').print();
lexer.tokenize('int age= 45').print();
lexer.tokenize('int age =45').print();
lexer.tokenize('int age =45;').print();
lexer.tokenize('int1=45').print();

lexer.tokenize('2*3+1/2-7').print();
lexer.tokenize('2 * (3 + 1)/2-7').print();

