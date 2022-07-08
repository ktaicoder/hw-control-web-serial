const shell = require('shelljs')
const fs = require('fs')

function updatePackageDistJson() {
    const fromPkg = JSON.parse(fs.readFileSync('package.json'))
    const toPkg = { ...fromPkg }

    delete toPkg['devDependencies']
    toPkg['main'] = "cjs/index.js"
    toPkg['module'] = "es/index.js"
    return toPkg
}

async function main() {
    shell.rm('-rf', 'dist')
    shell.mkdir('dist')
    shell.cp('-rf', './build/cjs', './build/es', 'dist/')
    const pkgJson = updatePackageDistJson()
    fs.writeFileSync('dist/package.json', JSON.stringify(pkgJson, null, 4))
    shell.cp('-rf', 'README.md', 'dist/')
}

main()
