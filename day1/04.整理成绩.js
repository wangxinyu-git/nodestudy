// 1. 导入 fs 文件系统模块
const fs = require('fs')
// 2. 调用 fs.readFile() 读取文件的内容
fs.readFile('./files/成绩.txt', 'utf8', (err, data) => {
  // 3. 判断是否读取成功
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }
  // console.log('读取文件成功！' + data)
  /*   // 4.1 先把成绩的数据，按照空格进行分割
    const arrOld = data.split(' ')
    // 4.2 循环分割后的数组，对每一项数据，进行字符串的替换操作
    const arrNew = []
    arrOld.forEach(item => {
      arrNew.push(item.replace('=', '：'))
    })
    // 4.3 把新数组中的每一项，进行合并，得到一个新的字符串
    const newStr = arrNew.join('\r\n')
    // 5. 调用 fs.writeFile() 方法，把处理完毕的成绩，写入到新文件中 */
  let newStr = data.split(' ').map(item => item.replace('=', '：')).join('\r\n')
  console.log(newStr);
  fs.writeFile('./files/成绩-ok.txt', newStr, err => {
    if (err) {
      return console.log('写入文件失败！' + err.message)
    }
    console.log('成绩写入成功！')
  })
})