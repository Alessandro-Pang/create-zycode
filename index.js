/*
 * @Author: zi.yang
 * @Date: 2025-01-07 11:09:12
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-01-07 11:11:03
 * @Description: 
 * @FilePath: /create-zycode/index.js
 */
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const projectName = args[0] || 'my-project';

const cwd = process.cwd();
const projectPath = path.join(cwd, projectName);
const templatePath = path.join(__dirname, 'template-vue');

// 创建项目目录
if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log(`Project directory ${projectName} created.`);
} else {
    console.error(`Directory ${projectName} already exists.`);
    process.exit(1);
}

// 复制模板文件到项目目录
function copyTemplateFiles(srcDir, destDir) {
    const files = fs.readdirSync(srcDir);

    files.forEach(file => {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);

        if (fs.lstatSync(srcFile).isDirectory()) {
            fs.mkdirSync(destFile);
            copyTemplateFiles(srcFile, destFile);
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    });
}

copyTemplateFiles(templatePath, projectPath);

console.log('Template project initialized.');
