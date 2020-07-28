// 给定不限长度的文本，包含无数行字符串，每行字符串包含8到12个字符，要求写一个工具，以较高效率查询给定字符串所在的行

const text = 'hello world!\n hello body!\n hello world2!\n hello body2!\n hello world3!\n hello body3!\n'


function getLinePosition(text, reg){
  const regLine =  /.*\n/g;

  let xArray, line = 0;

  while(xArray = regLine.exec(text)){

    console.log(xArray)

    const result = reg.test(xArray[0])

    if(result){
      console.log(line)
    }

    line++;
    
  }
}


getLinePosition(text, /body/)

