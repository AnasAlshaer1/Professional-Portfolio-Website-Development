# Anas Alshaer — Portfolio

Personal portfolio for **Anas Alshaer**, Backend Software Engineer (Riyadh, Saudi Arabia).
Built from scratch with vanilla HTML, CSS and JavaScript — no UI framework, no runtime dependencies.

**Sections:** Hero · About · Skills · Projects · Journey (education & awards) · Contact

## Tech

| Area      | Choice                                                            |
| --------- | ----------------------------------------------------------------- |
| Build     | [Vite](https://vitejs.dev) 5 (static output, no runtime deps)      |
| Styling   | Hand-written CSS with custom properties, light & dark themes       |
| Animation | CSS transitions/keyframes + `IntersectionObserver` + Canvas 2D     |
| Fonts     | Sora, Inter, JetBrains Mono (Google Fonts)                         |
| Form      | [FormSubmit](https://formsubmit.co) → `anasmn2011@hotmail.com`     |
| SEO       | Open Graph tags + schema.org `Person` JSON-LD generated at runtime |

## Running locally

```bash
npm install
npm run dev        # dev server with hot reload
npm run build      # production build to dist/
npm run preview    # serve the production build
```

## Project structure

```
index.html    all page markup (static, so search engines can crawl it)
style.css     design tokens, layout and every animation
main.js       theme, scroll effects, reveals, canvas background, form validation
content.js    CV data — single source of truth for the JSON-LD structured data
public/       profile.png, favicon.svg (and AnasAlshaer_CV.pdf, see below)
```

### Adding the CV

Drop the PDF into `public/` named **`AnasAlshaer_CV.pdf`** and the "Download CV" button in the
hero appears automatically. While the file is missing, `main.js` removes the button so visitors
never hit a dead link.

### Updating content

- **Visible text** lives in `index.html`.
- **Structured data for search engines** lives in `content.js` — keep both in sync when the CV changes.

### Notes

- `?noanim` on any URL renders the final state instantly (handy for screenshots and debugging).
- The site honors `prefers-reduced-motion`: reveals, the canvas background and all ambient
  animation are disabled for visitors who ask for it.
- The theme follows the visitor's system preference and is remembered in `localStorage` once toggled.

## Contact

- Email — anasmn2011@hotmail.com
- LinkedIn — [in/anas-alshaer](https://www.linkedin.com/in/anas-alshaer-728aa0266)
- GitHub — [AnasAlshaer1](https://github.com/AnasAlshaer1)
