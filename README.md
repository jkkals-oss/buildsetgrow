# BuildSetGrow website

Marketing site for [BuildSetGrow](https://buildsetgrow.com), exported from [Magic Patterns](https://www.magicpatterns.com/os/rxhYoUShXU7zmVDxEvUGAW?file=3G6TKXp14Q9oTfWkFDmKAK).

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
npm run build
```

## Netlify deployment

Connect this GitHub repository to Netlify. The `netlify.toml` file sets the build command (`npm run build`) and publish directory (`dist`). Use `buildsetgrow.com` as the custom domain after verifying DNS and HTTPS.

### Contact form

The contact form uses **Netlify Forms**. The hidden HTML form in `index.html` allows Netlify to discover the `contact` form during deployment. The React form posts URL-encoded submissions to Netlify; local and Magic Patterns previews deliberately do not deliver messages.

After deploying, open the Netlify project's Forms area, ensure form detection is enabled, then add an **email submission notification** for `jkkals@gmail.com`. Submit a real test inquiry and confirm it appears both in Netlify Forms and Gmail.

**No email is sent to Gmail until the Netlify notification is configured.** Do not put your Gmail password or any API key in this repository.

## Before public launch

- Replace the external Magic Patterns CDN founder photo with an owned/local asset if needed.
- Add real Privacy Policy and Terms pages (footer links currently point to `/privacy` and `/terms`).
- Test responsive layouts, leaf animations, contact submission, and keyboard navigation.
- Review production dependency and security checks; the source export has not been verified by a successful production build in this environment.
