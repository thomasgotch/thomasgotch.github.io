# changing project card images

1. upload your image files into this folder using github's **add file > upload files**.
2. open the root `script.js` file and find the `projects` settings near the top.
3. set the relevant project's `image` path, then commit your changes.

For example, after uploading `spapl.jpg` here:

```js
spapl: {
  image: 'assets/projects/spapl.jpg',
  imagePosition: 'center',
  imageFit: 'cover',
  showArtOverlay: false,
  // existing project title, description, and links continue below
},
```

- **image**: a path relative to the home page, or a full image URL. Paths and filenames are case-sensitive on github pages. Spaces in filenames are supported, but simple names are easier to maintain.
- **imagePosition**: changes the crop's focal point. Try `'center top'` or `'50% 30%'`.
- **imageFit**: `'cover'` fills the card and crops the edges. `'contain'` shows the whole picture with space around it when its shape differs from the card.
- **showArtOverlay**: `false` shows just your image in the artwork area. `true` keeps the existing lettering and shapes over it.
- Set **image** to `''` to restore the original artwork. If a picture fails to load, the original artwork remains visible.

Repeat for `fieldnotes`, `orbit`, and `form`, using a different image for each. JPG, PNG, WebP, SVG, and GIF files work with this image element. Compress large photos before uploading. The artwork keeps its existing responsive dimensions; the card title and description are unaffected.

After committing, wait for the github pages deployment to finish and refresh the home page.

## images within popup text

upload your image to this folder, then put an image marker wherever it should appear in a project string in `script.js`:

```js
idea: `some text before the image.

![a screenshot of the project](assets/projects/screenshot.png)

more text after the image.`,
```

the format is `![description](image-path)`. use backticks for multiline strings, or `\n` in a quoted string. the description becomes the image's alt text.

this works in `summary`, `idea`, `approach`, and any custom popup section created with `data-project-section`. you can insert several images in one string. images resize to fit the popup and do not crop.

paths are relative to the home page. for filenames with spaces or parentheses, wrap the path in angle brackets:

```js
idea: `![a screenshot](<assets/projects/my screenshot (1).png>)`,
```

full HTTPS image URLs also work. use a public image URL, rather than a page containing an image. other text remains plain text, so HTML tags are not interpreted.
