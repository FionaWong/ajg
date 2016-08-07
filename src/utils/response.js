


let status ={
  success : '000000',
  unlogin : '900002'
}


export function responseAdapter(code,cbObj){
  for(var x in cbObj){
    status[x] ?
      cbObj[x].bind(this)
      : cbObj['fail'].bind(this);

  }
}
