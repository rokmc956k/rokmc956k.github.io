# Research Post Guidelines

These rules apply to every research-paper review post published on this site.

## Mandatory paper-review header

Every **Paper Review** post must render the same source block near the top of the article, before the main technical discussion.

The format is mandatory and must be consistent across English and Korean versions:

```text
Paper Review · <technical topic> · <paper year>

Project page ↗
arXiv ↗
HTML paper ↗
```

Example:

```text
Paper Review · Humanoid Loco-Manipulation · 2026

Project page ↗   arXiv ↗   HTML paper ↗
```

The shared `_layouts/post.html` renders this block automatically for Paper Review posts. Do not manually recreate a second copy in the post body.

## Paper-review metadata

Preferred front matter for new posts:

```yaml
paper_review: true
paper_topic: "Humanoid Loco-Manipulation"
paper_year: "2026"
project_url: "https://example.github.io/project/"
arxiv_url: "https://arxiv.org/abs/XXXX.XXXXX"
html_paper_url: "https://arxiv.org/html/XXXX.XXXXX"
```

Existing posts may also be registered centrally in `_data/paper_reviews.yml`. The layout supports front matter first and uses the central mapping as a fallback.

## Mandatory source links

Every Paper Review post must provide:

1. **Project page / original GitHub Pages link** — the official project page when one exists.
2. **arXiv abstract link** — `https://arxiv.org/abs/<paper-id>`.
3. **arXiv HTML paper link** — `https://arxiv.org/html/<paper-id>` when available.

Additional official sources are recommended when available:

4. **Code repository** — official GitHub repository.
5. **Conference / journal / PDF page** — official publication page.

If an arXiv HTML version does not exist, do not invent one; omit that button and retain the other official sources.

## Topic label rule

The middle label should be a short technical domain rather than the paper title. Examples:

- `Humanoid Loco-Manipulation`
- `Multi-Humanoid Loco-Manipulation`
- `Vision-Language-Action`
- `Reinforcement Learning`
- `Dexterous Manipulation`

## Bilingual rule

The English and Korean versions of the same research post must expose the same topic, year, and source URLs. The visible source labels remain standardized as:

```text
Paper Review · <topic> · <year>
Project page ↗   arXiv ↗   HTML paper ↗
```

## Content rule

When summarizing a research paper, preserve clear attribution for external figures, tables, and reported experimental values. Prefer reconstructed diagrams or tables when appropriate, and label original figures with their source.

## Standing rule

This is a permanent project rule. All future Paper Review posts must use the shared header format automatically rather than introducing custom per-post source-link styling.
