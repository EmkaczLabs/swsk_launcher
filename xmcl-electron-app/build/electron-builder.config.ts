/* eslint-disable no-template-curly-in-string */
import { config as dotenv } from 'dotenv'
import type { Configuration } from 'electron-builder'

dotenv()

export const config = {
  productName: 'SWSK Launcher',
  appId: 'com.swsk.launcher',
  directories: {
    output: 'build/output',
    buildResources: 'build',
    app: '.',
  },
  protocols: {
    name: 'SWSK',
    schemes: ['swsk'],
  },
  // assign publish for auto-updater
  // set this to your own repo!
  publish: [{
    provider: 'github',
    owner: 'voxelum',
    repo: 'x-minecraft-launcher',
  }],
  files: [{
    from: 'dist',
    to: '.',
    filter: ['**/*.js', '**/*.ico', '**/*.png', '**/*.webp', '**/*.svg', '*.node', '**/*.html', '**/*.css', '**/*.woff2'],
  }, {
    from: '.',
    to: '.',
    filter: 'package.json',
  }],
  artifactName: 'swsk-launcher-${version}-${platform}-${arch}.${ext}',
  appx: {
    displayName: 'SWSK Launcher',
    applicationId: 'com.swsk.launcher',
    identityName: 'swsk.launcher',
    backgroundColor: 'transparent',
    // Default publisher values. For AppX, publisher should be in certificate subject form (e.g. 'CN=YourName').
    publisher: process.env.PUBLISHER || 'CN=emkacz',
    publisherDisplayName: 'emkacz',
    setBuildNumber: true,
  },
  dmg: {
    artifactName: 'swsk-launcher-${version}-${arch}.${ext}',
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
  mac: {
    icon: 'icons/swsk.icns',
    darkModeSupport: true,
    target: [
      {
        target: 'dmg',
        arch: ['arm64', 'x64'],
      },
    ],
    extendInfo: {
      NSMicrophoneUsageDescription: 'A Minecraft mod wants to access your microphone.',
      NSCameraUsageDescription: 'Please give us access to your camera',
      'com.apple.security.device.audio-input': true,
      'com.apple.security.device.camera': true,
    },
  },
  win: {
    certificateFile: undefined as string | undefined,
    icon: 'icons/swsk.ico',
    target: [
      {
        target: 'zip',
        arch: [
          'x64',
          'ia32',
        ],
      },
      'appx',
      {
        target: 'nsis',
        arch: [
          'x64',
          'ia32',
        ],
      },
    ],
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
  linux: {
    executableName: 'swsk-launcher',
    desktop: {
      MimeType: 'x-scheme-handler/swsk',
      StartupWMClass: 'swsk-launcher',
    },
    category: 'Game',
    icon: 'icons/swsk.png',
    artifactName: 'swsk-launcher-${version}-${arch}.${ext}',
    target: [
      { target: 'deb', arch: ['x64', 'arm64'] },
      { target: 'rpm', arch: ['x64', 'arm64'] },
      { target: 'AppImage', arch: ['x64', 'arm64'] },
      { target: 'tar.xz', arch: ['x64', 'arm64'] },
      { target: 'pacman', arch: ['x64', 'arm64'] },
    ],
  },
  snap: {
    publish: [
      'github',
    ],
  },
} satisfies Configuration
