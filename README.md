# Codia Chrome extension

Simple media download helper web application

# How to Run?

## Create artifact files.

```bash
# Installation.
$ pnpm i

# Build app.
$ pnpm build
```

## Upload as a chrome extension by unzip file.

1. Open `chrome://extensions/`.
2. Click "Load unzipped extention program..." button.
3. Select `dist` folder you built.
4. Run loaded chrome extension on your browser(chrome).

   - <img width="245" alt="스크린샷 2025-01-02 01 05 41" src="https://github.com/user-attachments/assets/af3eaaa8-007c-48e1-ac10-884d6f2ae4c8" />

5. Choice Server setting `Local` or `Remote`.
6. Enter video id.
7. Click `server check button(Left side)`.
8. Click `download button(Right side)`.
9. Wait a moment.

   - Never close chrome extension.

10. Check out downloaded media file.

# TODO

- [ ] Content scripting.
  - [ ] Copy video id on clip board.
