# website icon

the browser-tab icon (favicon) is shared by the home page and all existing project pages.

## change it

1. prepare a square PNG image. 64 x 64 pixels works well for a simple icon; you can also upload a larger square PNG.
2. name it exactly `favicon.png`.
3. replace [favicon.png](favicon.png) in this folder and commit the change.

you do not need to edit any HTML when keeping that filename. the starter image uses a dark background and `tg_` initials.

browsers cache favicons quite aggressively. after github pages finishes deploying, try a hard refresh or open the site in a private window if the old icon still appears.

## other file formats or new pages

if you use another filename or format, update the favicon link in each page's `<head>`. for example, an SVG on the home page uses:

```html
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
```

inside the projects folder, use `../assets/favicon.svg` instead.

for a new page, copy the favicon link from an existing page at the same folder depth. empty placeholder pages have no HTML head yet; add the link when creating their content.
