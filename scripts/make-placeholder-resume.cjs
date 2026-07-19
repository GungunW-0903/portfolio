// One-off generator for a placeholder resume PDF.
// Replace public/resume.pdf with the real resume when ready.
const fs = require('fs');

const lines = [
  'Gungun Wadhwani - Full Stack Web Developer',
  'Placeholder resume. Replace public/resume.pdf with the real resume PDF.',
];

let stream = 'BT /F1 14 Tf 50 750 Td 18 TL\n';
for (const line of lines) {
  const esc = line
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
  stream += '(' + esc + ') Tj T*\n';
}
stream += 'ET';
const sBuf = Buffer.from(stream);

const objs = [
  Buffer.from('<< /Type /Catalog /Pages 2 0 R >>'),
  Buffer.from('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'),
  Buffer.from(
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>'
  ),
  Buffer.concat([
    Buffer.from('<< /Length ' + sBuf.length + ' >>\nstream\n'),
    sBuf,
    Buffer.from('\nendstream'),
  ]),
  Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'),
];

let out = Buffer.from('%PDF-1.4\n');
const offsets = [];
objs.forEach((o, i) => {
  offsets.push(out.length);
  out = Buffer.concat([
    out,
    Buffer.from(i + 1 + ' 0 obj\n'),
    o,
    Buffer.from('\nendobj\n'),
  ]);
});
const xref = out.length;
let tail = 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n';
offsets.forEach((off) => {
  tail += String(off).padStart(10, '0') + ' 00000 n \n';
});
tail +=
  'trailer\n<< /Size ' +
  (objs.length + 1) +
  ' /Root 1 0 R >>\nstartxref\n' +
  xref +
  '\n%%EOF';
out = Buffer.concat([out, Buffer.from(tail)]);
fs.writeFileSync('public/resume.pdf', out);
console.log('wrote public/resume.pdf', out.length, 'bytes');
