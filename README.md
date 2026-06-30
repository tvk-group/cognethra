# Cognethra

Cognitive intelligence architecture for reasoning, knowledge synthesis, semantic memory, and Proof-of-Thought systems inside the SOVRA / Entelekron ecosystem.

**Live site:** https://www.cognethra.org  
**Mobile app:** https://www.cognethra.org/app/

## Structure

```
├── index.html              # Marketing homepage
├── app/index.html          # Installable PWA mobile app
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── disclaimer.html         # Disclaimer
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker
└── assets/
    ├── cognethra-home.css  # Main site styles
    ├── cognethra-home.js   # Navigation, scroll reveal
    ├── cognethra-app.css   # App shell styles
    ├── cognethra-app.js    # App tab navigation
    ├── cognethra-motion.js # Hero network canvas
    ├── pwa.js              # Install prompt + SW registration
    └── icons/
        └── cognethra-app-icon.svg
```

## Deploy

Static site — deploy to Vercel or any static host. No build step required.

```bash
# Local preview
python3 -m http.server 8080
```

## Ecosystem

- [SOVRA Network](https://www.sovra.network/)
- [Entelekron](https://www.entelekron.org/)
- [T.V.K. Group](https://www.tvk.group/)

## License

MIT — see [LICENSE](LICENSE)
