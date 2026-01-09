const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../src/pages/design/EventDrivenArchitecture.jsx');
let s = fs.readFileSync(file, 'utf8');
// remove backtick/template literals
s = s.replace(/`[\s\S]*?`/g, '');
// remove single and double quoted strings
s = s.replace(/'([^'\\]|\\.)*'/g, '');
s = s.replace(/"([^"\\]|\\.)*"/g, '');
// remove block and line comments
s = s.replace(/\/\*[\s\S]*?\*\//g, '');
s = s.replace(/\/\/.*$/gm, '');

const lines = s.split(/\r?\n/);
let stack = [];
let opens = [];
let closes = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let idx = 0;
  while ((idx = line.indexOf('<div', idx)) !== -1) {
    stack.push({type:'open', line: i+1});
    opens.push(i+1);
    idx += 4;
  }
  idx = 0;
  while ((idx = line.indexOf('</div>', idx)) !== -1) {
    closes.push(i+1);
    if (stack.length > 0) stack.pop();
    else console.log('Unmatched closing </div> at line', i+1);
    idx += 6;
  }
}
console.log('Opens:', opens.length, 'Closes:', closes.length, 'Unclosed opens (remaining):', stack.length);
if (stack.length) console.log('Remaining open lines:', stack.map(x=>x.line));
else console.log('All divs balanced.');
