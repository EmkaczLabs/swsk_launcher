# swsklauncher

A modern, cross-platform Minecraft launcher and tooling monorepo based on XMCL.

This repository contains the launcher app, runtime libraries, UI packages, and tooling used to build and ship the project.

---

## Quick overview

- Purpose: ship a performant, multi-instance Minecraft launcher with built-in modpack, resource and account management.
- Platforms: Windows, macOS, Linux.
- Monorepo: multiple packages and apps are organized under the workspace (see `xmcl/`, `xmcl-electron-app/`, `xmcl-runtime/`, etc.).

---

## Features

- Download and manage Minecraft, Forge, Fabric, Quilt, OptiFine and JVM runtime files.
- Fast, concurrent downloads with HTTP/HTTPS connection reuse.
- Multi-instance management to isolate different versions and modsets.
- Built-in support for CurseForge and Modrinth resources.
- Multiple authentication providers (Microsoft, Mojang Yggdrasil, third-party servers).
- Peer-to-peer LAN support and native packaging (code signing, installers).

---

## Development (for contributors)

This is a pnpm workspace-based repository. The instructions below assume you have Node.js (18+) and pnpm installed.

1. Install dependencies (from project root):

   In cmd.exe:

   pnpm install

2. Boot a development build (examples):

   - To build all packages in workspace:

     pnpm -w --filter ./... build

   - To run the Electron app in development mode (example package):

     cd xmcl-electron-app
     pnpm install
     pnpm dev

   The above commands depend on the exact scripts defined in each package's `package.json`. Inspect package folders for package-specific commands.

3. Tests and linting

   Run common checks from the repository root (if provided by workspace scripts):

   pnpm -w test
   pnpm -w lint

If you use a different shell, adapt the commands accordingly.

---

## Project structure (high level)

- xmcl/ — core libraries and shared packages
- xmcl-electron-app/ — Electron-based desktop launcher
- xmcl-runtime/ — runtime and native utilities used by launcher
- xmcl-keystone-ui/ — UI library and components
- packages/ — individual library packages used across the project

Explore each package for its README and package.json scripts.

---

## Contributing

Contributions are welcome. The usual workflow is:

1. Fork the repository and create a feature branch.
2. Run linters and tests locally.
3. Open a pull request with a clear description and references to any related issues.

Please follow the repository's commit message conventions (Conventional Commits) when possible.

For translation and localization contributions, see any i18n guides in `docs/` or the `xmcl` package docs.

---

## Security and Code Signing

This project uses modern packaging tools and supports code signing on Windows and macOS. Do not commit private keys or certificates into the repository. Use secure secret management for any signing keys.

---

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

## Troubleshooting: node-gyp / "No module named 'distutils'" (Windows)

You may see an error like this when running workspace builds on Windows:

    ModuleNotFoundError: No module named 'distutils'
    Error: `gyp` failed with exit code: 1

This happens because Python 3.12+ removed the legacy `distutils` module from the standard library. `node-gyp` (used to build native Node/Electron modules) imports `distutils`, so it fails if the Python used by npm/pnpm doesn't provide it.

Recommended fixes (safe, in order):

1) Install Python 3.11 (recommended)

- Install CPython 3.11 from https://www.python.org/downloads/release/python-311/ and check the installer option "Add Python 3.11 to PATH".
- Upgrade packaging tools:

  cmd.exe:

  ```cmd
  python --version
  python -m pip install --upgrade pip setuptools wheel
  ```

  PowerShell:

  ```powershell
  python --version
  python -m pip install --upgrade pip setuptools wheel
  ```

- Point npm/pnpm/node-gyp to the Python executable (replace path if necessary):

  cmd.exe:

  ```cmd
  npm config set python "%USERPROFILE%\\AppData\\Local\\Programs\\Python\\Python311\\python.exe"
  setx PYTHON "%USERPROFILE%\\AppData\\Local\\Programs\\Python\\Python311\\python.exe"
  ```

  PowerShell:

  ```powershell
  npm config set python "C:\\Path\\To\\Python311\\python.exe"
  [Environment]::SetEnvironmentVariable("PYTHON", "C:\\Path\\To\\Python311\\python.exe", "User")
  ```

- Install Visual C++ Build Tools (C++ workload). Download from: https://visualstudio.microsoft.com/downloads/ → "Tools for Visual Studio" → "Build Tools for Visual Studio 2022". Restart your shell after install.

2) Alternative: create a small "distutils" shim if you must keep Python 3.12+ (advanced)

If you cannot install Python 3.11 immediately, you can add a tiny shim that exposes `distutils` using setuptools' bundled `_distutils`. This modifies your Python environment and should be used only as a temporary workaround.

  cmd.exe (run as an administrator or in a virtualenv):

  ```cmd
  python -m pip install --upgrade pip setuptools
  python -c "import site, os, sys; p=site.getsitepackages()[0]; d=os.path.join(p,'distutils'); os.makedirs(d,exist_ok=True); open(os.path.join(d,'__init__.py'),'w').write('from setuptools._distutils import *')"
  ```

  PowerShell:

  ```powershell
  python -m pip install --upgrade pip setuptools
  $p = (python -c "import site,sys; print(site.getsitepackages()[0])")
  $d = Join-Path $p 'distutils'
  New-Item -ItemType Directory -Path $d -Force | Out-Null
  Set-Content -Path (Join-Path $d '__init__.py') -Value 'from setuptools._distutils import *'
  ```

Note: the shim is a hack and may not work in all environments (virtualenvs, user vs system site-packages). Prefer installing Python 3.11 instead.

3) Re-run the workspace install/build

After making the Python/tooling changes, re-open your terminal and run from project root:

```cmd
pnpm install
pnpm build:all
```

If you still see node-gyp errors, capture the Python version and paths to help debugging:

```cmd
python --version
where python
npm config get python
pnpm -v
node -v
```

---

## Useful links

- Project website: https://xmcl.app
- Official docs (i18n): docs/
- Issues: open an issue on the repository when you find a bug or want a feature

---
