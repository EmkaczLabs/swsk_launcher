Place your custom icons here so electron-builder will pick them up when packaging.

Required filenames (relative to `xmcl-electron-app/build` because `buildResources` is set to `build`):
- `icons/swsk.ico`  (Windows .ico containing multiple sizes: 16,32,48,64,128,256)
- `icons/swsk.icns` (macOS .icns containing multiple sizes)
- `icons/swsk.png`  (Linux: a high-resolution PNG, e.g., 512x512 or 1024x1024)

Recommended source image
- Prepare a single square PNG at 1024x1024 or 2048x2048 named `source.png` and place it in this folder.

Generate icons (recommended tools)

1) Using ImageMagick (Windows)
- Install ImageMagick (https://imagemagick.org) and make sure `magick` is on PATH.
- Create an ICO with multiple sizes in one file:

```powershell
magick convert build\icons\source.png -define icon:auto-resize=256,128,64,48,32,16 build\icons\swsk.ico
```

2) Using `icon-gen` (Node) — cross-platform, creates .ico and .icns
- Install or run with npx:

```powershell
npx icon-gen build\icons\source.png build\icons --ico --icns
```

3) macOS (.icns) using `iconutil` (if you have access to macOS)
- Create an `icon.iconset` folder with multiple sizes and run `iconutil -c icns icon.iconset`.

Verify placement
- After generating, check that these files exist:
  - `xmcl-electron-app/build/icons/swsk.ico`
  - `xmcl-electron-app/build/icons/swsk.icns`
  - `xmcl-electron-app/build/icons/swsk.png`

Build the app (Windows example)
- Use the CMD wrapper to avoid PowerShell script execution policy issues:

```cmd
cd C:\Users\wwmky\IdeaProjects\swsk_launcher
pnpm.cmd build:all
```

Notes
- `electron-builder` will use the icons relative to the `buildResources` folder (`xmcl-electron-app/build`), so the path `icons/swsk.ico` in the config maps to `xmcl-electron-app/build/icons/swsk.ico`.
- If you previously built and electron-builder cached helper binaries, you may need to clear the cache at `%LOCALAPPDATA%\electron-builder\Cache`.
- If packaging fails due to symlink privileges, run the build in an elevated shell or enable Developer Mode on Windows (Settings → Privacy & security → For developers → Developer Mode).

If you want, I can generate small placeholder PNG icons (non-branded) and place them here so you can run a test build immediately — tell me whether you want me to create placeholders.
