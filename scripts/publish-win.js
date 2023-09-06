#!/usr/bin/env node
var minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const {host,username,password,port=22,goal='',origin=''} = args
if(!host){
  console.error('please set: --host')
  return
}
if(!username){
  console.error('please set: --username')
  return
}
if(!password){
  console.error('please set: --password')
  return
}
if(!origin){
  console.error('Please set the local directory path: --origin')
  return
}
if(!goal){
  console.error('Please set the destination directory path: --goal')
  return
}
const server = {
  host,
  username,
  password,
  port,
}
// 上传到服务器的地址
const remotePath = goal;

(async function start() {
  const fs = require('fs');
  const path = require('path');
  const Client = require('ssh2-sftp-client');
  
  let sftp = new Client();
  
  const uploadDir = async (sftp, localDir, remoteDir) => {
    let files = fs.readdirSync(localDir);
  
    for (let filename of files) {
      let localFile = path.join(localDir, filename);
      let remoteFile = path.join(remoteDir, filename);
  
      if (fs.statSync(localFile).isDirectory()) {
        await sftp.mkdir(remoteFile, true);
        await uploadDir(sftp, localFile, remoteFile);
      } else {
        await sftp.fastPut(localFile, remoteFile);
      }
    }
  };
  
  sftp.connect(server)
  .then(() => uploadDir(sftp, origin, remotePath))
  .catch(err=>{
    console.log(err)
  })
  .finally(() => sftp.end());
  
}())

