# Bilingual post convention

This site uses URL symmetry instead of a manual translation map.

## URL rule

English:

```text
/posts/<slug>/
```

Korean:

```text
/ko/posts/<slug>/
```

The shared `_layouts/default.html` computes the opposite-language URL automatically.

- English page button: `한` → `/ko` + current URL
- Korean page button: `EN` → current URL with the first `/ko` removed
- English home: `/`
- Korean home: `/ko/`

## English post front matter

```yaml
---
layout: post
title: "English title"
lang: en
math: true
---
```

`lang: en` is recommended. Older English posts without `lang` are also treated as English by the layout and English home.

## Korean post front matter

Use the same semantic slug and set an explicit Korean permalink:

```yaml
---
layout: post
title: "한국어 제목"
lang: ko
permalink: /ko/posts/<same-slug>/
math: true
---
```

## Listing behavior

- `/` lists posts whose `lang` is not `ko`.
- `/ko/` lists posts with `lang: ko`.
- The Dark/Light theme setting is independent from the language setting.

## Current bilingual pairs

```text
/posts/interevolve-test-time-reward-program-evolution/
/ko/posts/interevolve-test-time-reward-program-evolution/

/posts/decmht-decentralized-multi-humanoid-transport/
/ko/posts/decmht-decentralized-multi-humanoid-transport/
```

## Future publishing workflow

For a new bilingual article, publish two Jekyll post files with the same semantic slug. No translation table or JavaScript route map needs to be updated; the header language button derives the counterpart URL automatically.
