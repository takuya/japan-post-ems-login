#!/usr/bin/env node

let main = async (id , pw)=>{
  const send_request = require('../lib/japan-post-ems').send_request;
  let ret = await send_request(id,pw)
  console.log(ret);
}

console.log( );

if (process.argv.length === 4 ){
  main(process.argv[2],process.argv[3]);
}else{
  console.log('使い方');
  console.log(`node bin/${process.argv[1].split(/\//).pop()} $USER $PASS`);
  return;
}


