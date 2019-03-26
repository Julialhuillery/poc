## Add New Pages
You can add new pages inside the **_docs** directory. Always start your markdown file with the metadata (front matter)

```yaml 
---
layout: page
permalink: /working-with-communities-in-epidemics/
categories:
  - Africa
  - Asia
  - Violence
---
```

## Choose Categories to show
Edit the **_data/featured_categories.yml**. These will show on home page
```yaml
...
- category: North America
  headline: Super brief headline about the category
  thumbnail: thumbnail.svg # category featured image
- category: Asia
  headline: Super brief headline about the category
  thumbnail: thumbnail.svg # category featured image
...
```

## Add Images
Store your images inside **assets/images** directory. To include the image in  your markdown file link it as follows:

```markdown
![alt description](/assets/images/finame.extension)
```

## Add pdfs
To add the actual files, add them in **assets/pdfs** directory/folder.