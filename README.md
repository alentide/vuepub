# vuepub
Just a package for quick publish vue3 projects

## Usage
### publish to windows
Add the following script to your project's package.json.
```json
"scripts":{
    "publish:win": "publish-win --host yourServerIp --username yourWindowsUsername --password yourWindowsPassword --port yourServerSSHPortCanOmittedIfIs22 --origin \"./dist\" --goal \"C:\\test\" "
}
```
1. Fill in the correct parameters in the command.
2. Then in your shell, type `npm run publish:win`.
3. The example shows how to fill in the windows path.`origin` is the directory of your packaged project,`goal` is the directory of the remote server you want to deploy.


### publish to linux
Similar to publishing to windows.
```json
"scripts":{
    "publish:linux": "publish-linux --host yourServerIp --username yourWindowsUsername --password yourWindowsPassword --port yourServerSSHPortCanOmittedIfIs22 --origin \"./dist\" --goal xxx "
}
```