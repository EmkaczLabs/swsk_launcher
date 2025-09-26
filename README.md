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

## Useful links

- Project website: https://xmcl.app
- Official docs (i18n): docs/
- Issues: open an issue on the repository when you find a bug or want a feature

---
