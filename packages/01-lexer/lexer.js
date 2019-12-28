const State = {
  Init: 'Init',
  Id: 'Id',
  Number: 'Number',
  GE: 'GE',
  GT: 'GT',
  Int_1: 'Int_1',
  Int_2: 'Int_2',
  Int: 'Int',
  If_1: 'If_1',
  If: 'If',
  Else_1: 'Else_1',
  Else_2: 'Else_2',
  Else_3: 'Else_3',
  Else: 'Else',
  SemiColon: 'SemiColon',
  LeftParen: 'LeftParen',
  RightParen: 'RightParen',
  Assignment: 'Assignment',
  Plus: 'Plus',
  Minus: 'Minus',
  Star: 'Star',
  Slash: 'Slash'
};
const TokenType = {
  Identifier: 'Identifier',
  Number: 'Number',
  GE: 'GE',
  GT: 'GT',
  If: 'IF',
  Int: 'INT',
  Assignment: 'Assignment',
  Else: 'Else',
  Plus: 'Plus',
  Minus: 'Minus',
  Star: 'Star',
  Slash: 'Slash',
  SemiColon: 'SemiColon',
  LeftParen: 'LeftParen',
  RightParen: 'RightParen'
};

function isDigit(c) {
  return /\d/.test(c);
}

function isAlpha(c) {
  return c && /[a-zA-Z]/.test(c);
}

function isBlank(c) {
  return c == ' ' || c == '\t' || c == '\n';
}

class Token {
  constructor(type = null, text = '') {
    this.type = type;
    this.text = text;
  }
}

class Lexer {
  constructor() {
    this.tokens = [];
  }
  tokenize(script) {
    this.tokens = [];
    const changeState = c => {
      if (token.text) {
        this.tokens.push(token);
        token = new Token();
      }
      currentState = State.Init;
      if (isDigit(c)) {
        currentState = State.Number;
        token.type = TokenType.Number;
        token.text += c;
      } else if (c === 'i') {
        token.type = TokenType.Identifier;
        currentState = State.Int_1;
        token.text += c;
      } else if (isAlpha(c)) {
        currentState = State.Id;
        token.type = TokenType.Identifier;
        token.text += c;
      } else if (c === '>') {
        currentState = State.GT;
        token.type = TokenType.GT;
        token.text += c;
      } else if (c === '=') {
        currentState = State.Assignment;
        token.type = TokenType.Assignment;
        token.text += c;
      } else if (c === '+') {
        currentState = State.Plus;
        token.type = TokenType.Plus;
        token.text += c;
      } else if (c === '-') {
        currentState = State.Minus;
        token.type = TokenType.Minus;
        token.text += c;
      } else if (c === '*') {
        currentState = State.Star;
        token.type = TokenType.Star;
        token.text += c;
      } else if (c === '/') {
        currentState = State.Slash;
        token.type = TokenType.Slash;
        token.text += c;
      } else if (c === ';') {
        currentState = State.SemiColon;
        token.type = TokenType.SemiColon;
        token.text += c;
      } else if (c === '(') {
        currentState = State.LeftParen;
        token.type = TokenType.LeftParen;
        token.text += c;
      } else if (c === ')') {
        currentState = State.RightParen;
        token.type = TokenType.RightParen;
        token.text += c;
      }
    };

    let token = new Token();
    let currentState = State.Init;

    for (const c of script) {
      switch (currentState) {
        case State.Init:
          changeState(c);
          break;
        case State.Id:
          if (isDigit(c) || isAlpha(c)) {
            // currentState = State.Id;
            // token.type = TokenType.Identifier;
            token.text += c;
          } else {
            changeState(c);
          }
          break;
        case State.Number:
          if (isDigit(c)) {
            token.text += c;
          } else {
            changeState(c);
          }
          break;
        case State.GT:
          if (c === '=') {
            currentState = State.GE;
            token.type = TokenType.GE;
            token.text += c;
          } else {
            changeState(c);
          }
          break;
        case State.GE:
          changeState(c);
          break;
        case State.Int_1:
          if (c === 'n') {
            currentState = State.Int_2;
            token.text += c;
          } else if (c === 'f') {
            currentState = State.If_1;
            token.text += c;
          } else if (isAlpha(c) || isDigit(c)) {
            currentState = State.Id;
            token.text += c;
          } else {
            changeState(c);
          }
          break;
        case State.Int_2:
          if (c === 't') {
            currentState = State.Int;
            token.text += c;
          } else if (isAlpha(c) || isDigit(c)) {
            currentState = State.Id;
            token.text += c;
          } else {
            changeState(c);
          }
          break;
        case State.Int:
          if (isBlank(c)) {
            token.type = TokenType.Int;
            token.text += c;
            changeState(c);
          } else if (isAlpha(c) || isDigit(c)) {
            currentState = State.Id;
            token.text += c;
          } else {
            changeState(c);
          }
          break;
        case State.Assignment:
        case State.Star:
        case State.Plus:
        case State.Minus:
        case State.Slash:
        case State.LeftParen:
        case State.RightParen:
          changeState(c);
          break;
      }
    }
    changeState();
    return this;
  }
  print() {
    // console.log('----------------');
    console.table(this.tokens.map(({ type, text }) => [type, text]));
    // for (const token of this.tokens) {
    //   const { type, text } = token;
    //   console.log(`${type}\t\t${text}`);
    // }
  }
}

module.exports = Lexer;
