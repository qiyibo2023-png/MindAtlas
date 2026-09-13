// Local-only synthetic browser acceptance harness. Never deployed with dist/.
const fs=require('fs'),path=require('path'),http=require('http');
const project=path.resolve(__dirname,'..'),root=path.join(project,'dist');
http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname==='/'){let html=fs.readFileSync(path.join(root,'index.html'),'utf8');html=html.replace(/(src|href)="(?!data:|https?:)([^"]+)"/g,'$1="/assets/$2"').replace('</body>','<script src="/fixture.js"></script></body>');res.setHeader('Content-Type','text/html;charset=utf-8');res.end(html);return;}
 if(pathname==='/fixture.js'){res.setHeader('Content-Type','text/javascript;charset=utf-8');res.end(fs.readFileSync(path.join(project,'tests/bilingual-fixture.js')));return;}
 const file=path.resolve(root,'.'+pathname.replace(/^\/assets/,''));if(!pathname.startsWith('/assets/')||!file.startsWith(root+path.sep)){res.writeHead(404).end();return;}
 fs.readFile(file,(error,bytes)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'text/plain');res.setHeader('Cache-Control','no-store');res.end(bytes);});
}).listen(4175,'127.0.0.1',()=>console.log('Synthetic bilingual harness: http://127.0.0.1:4175/'));
