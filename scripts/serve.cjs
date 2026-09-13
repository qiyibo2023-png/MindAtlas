const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../dist');
http.createServer((req,res)=>{
  let requested;
  try{requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  const file=path.resolve(root,'.'+(requested==='/'?'/index.html':requested));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,body)=>{if(error){res.writeHead(404);res.end('Not found');return;}
    res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':'text/html; charset=utf-8');
    res.setHeader('Cache-Control','no-store');res.end(body);
  });
}).listen(4173,'127.0.0.1',()=>console.log('MindAtlas: http://127.0.0.1:4173/'));
