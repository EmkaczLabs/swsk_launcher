import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'

if (!existsSync(join(__dirname, 'dist'))) {
  mkdirSync(join(__dirname, 'dist'))
}

if (!existsSync(join(__dirname, '.env'))) {
  writeFileSync(join(__dirname, '.env'), 'CURSEFORGE_API_KEY=')
}

function resolveAppBuilderPath(subPath: string) {
  // Try to resolve with require.resolve (works when package files are accessible)
  try {
    return require.resolve(subPath)
  } catch {
    // If that fails, try resolve the package root then join
    try {
      const pkgMain = require.resolve('app-builder-lib')
      return join(dirname(pkgMain), subPath.replace(/^app-builder-lib[\\/]/, ''))
    } catch {
      // Fallback to the original relative path inside project
      return join(__dirname, '..', subPath.replace(/^\.\/?node_modules[\\/]/, ''))
    }
  }
}

if (process.platform === 'win32') {
  try {
    const appxManifestFilePath = resolveAppBuilderPath('app-builder-lib/templates/appx/appxmanifest.xml')
    const content = readFileSync(appxManifestFilePath, 'utf-8')
      // eslint-disable-next-line no-template-curly-in-string
      .replace("Publisher='${publisher}'", 'Publisher="${publisher}"')
    writeFileSync(appxManifestFilePath, content, 'utf-8')
    console.log('Patched appx manifest at', appxManifestFilePath)
  } catch (e) {
    console.warn('Failed to patch appx manifest:', e && (e as Error).message)
  }
}

if (process.platform === 'linux' || process.platform === 'openbsd' || process.platform === 'freebsd') {
  // Overwrite the linux electron-builder js code
  try {
    const fpmTargetFilePath = resolveAppBuilderPath('app-builder-lib/out/targets/FpmTarget.js')
    const linuxTargetHelperFilePath = resolveAppBuilderPath('app-builder-lib/out/targets/LinuxTargetHelper.js')
    const linuxAfterInstallShPath = resolveAppBuilderPath('app-builder-lib/templates/linux/after-install.tpl')

    writeFileSync(fpmTargetFilePath, readFileSync(fpmTargetFilePath, 'utf-8')
      // eslint-disable-next-line no-template-curly-in-string
      .replace('installPrefix}/${appInfo.sanitizedProductName}', 'installPrefix}/xmcl'), 'utf-8')
    writeFileSync(linuxTargetHelperFilePath, readFileSync(linuxTargetHelperFilePath, 'utf-8')
      // eslint-disable-next-line no-template-curly-in-string
      .replace('installPrefix}/${appInfo.sanitizedProductName}', 'installPrefix}/xmcl'), 'utf-8')
    writeFileSync(linuxAfterInstallShPath, readFileSync(linuxAfterInstallShPath, 'utf-8')
      // eslint-disable-next-line no-template-curly-in-string
      .replaceAll('${sanitizedProductName}', 'xmcl'), 'utf-8')
    console.log('Patched linux build target')
  } catch (e) {
    console.warn('Failed to patch linux targets:', e && (e as Error).message)
  }
}
