// Local synthetic acceptance harness; never part of the deployed application.
const fs=require('fs'),path=require('path'),http=require('http');
const project=path.resolve(__dirname,'..'),root=path.join(project,'dist');
http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 const fixtures={'/shared.js':'differential-fixtures.js','/cases.js':'eating-fixtures.js','/adhd.js':'adhd-fixtures.js','/trauma.js':'trauma-fixtures.js','/fixture.js':'eating-browser.js'};
 if(fixtures[pathname]){res.setHeader('Content-Type','text/javascript;charset=utf-8');res.end(fs.readFileSync(path.join(project,'tests',fixtures[pathname])));return;}
 if(pathname==='/'){res.setHeader('Content-Type','text/html;charset=utf-8');res.end(fs.readFileSync(path.join(root,'index.html'),'utf8').replace('</body>','<script src="/cases.js"></script><script src="/shared.js"></script><script src="/trauma.js"></script><script src="/adhd.js"></script><script src="/fixture.js"></script></body>'));return;}
 const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)){res.writeHead(404).end();return;}
 fs.readFile(file,(error,bytes)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'text/plain');res.end(bytes);});
}).listen(4179,'127.0.0.1',()=>console.log('Synthetic Eating harness: http://127.0.0.1:4179/'));
