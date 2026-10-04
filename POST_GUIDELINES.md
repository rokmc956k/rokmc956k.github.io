# Research Post Guidelines

These rules apply to every research-paper review post published on this site.

## Canonical Paper Review template

All future **Paper Review** posts must follow the canonical template rather than inventing a new per-post structure.

Public reference pages:

- English: `/posts/template-paper-review/`
- Korean: `/ko/posts/template-paper-review/`

Copyable source skeleton:

- `_templates/paper-review-post.html`

The template is based on the structure and presentation patterns established by the InterEvolve and decMHT reviews. It should be treated as the default starting point for every new Paper Review.

### Default article structure

Use this order unless the paper genuinely requires a different sequence:

1. Opening summary: problem, core idea, why it matters
2. Core-idea callout
3. Optional KPI snapshot
4. Problem and motivation
5. Core abstraction / architecture
6. Mathematical formulation
7. Training / optimization / system pipeline
8. Experiments and results
9. Generalization / ablation / scaling
10. Why this paper matters
11. Limitations and open questions
12. Takeaways
13. References

H2 and H3 headings should be descriptive because the shared Contents panel automatically uses them for navigation.

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
code_url: "https://github.com/example/repo" # optional
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

## Content and writing rules

- Start with the paper's thesis, not with notation or implementation detail.
- Use equations only when they explain the method; define symbols and explain why each equation matters.
- Prefer reconstructed architecture/data-flow diagrams when they improve clarity.
- Surface only the most decision-relevant experimental numbers rather than reproducing every table.
- Separate reported facts from interpretation.
- Attribute external figures, tables, and reported values clearly.
- Always include a limitations/open-questions section.
- End with a concise takeaway section and References.

Reusable visual components are defined globally in `assets/css/post-typography.css`:

- `.paper-note`
- `.paper-kpi-grid` / `.paper-kpi-card`
- `.paper-figure` / `.paper-figure-placeholder`
- `.paper-table-wrap`
- `.paper-takeaways`

Use these shared classes instead of adding custom styling for the same concept in each new post.

## Topic label rule

The middle label should be a short technical domain rather than the paper title. Examples:

- `Humanoid Loco-Manipulation`
- `Multi-Humanoid Loco-Manipulation`
- `Vision-Language-Action`
- `Reinforcement Learning`
- `Dexterous Manipulation`

## Bilingual rule

The English and Korean versions of the same research post must expose the same topic, year, and source URLs. They should also follow the same section structure and preserve the same key equations, result tables, figures/diagrams, and references where applicable.

The visible source labels remain standardized as:

```text
Paper Review · <topic> · <year>
Project page ↗   arXiv ↗   HTML paper ↗
```

## Standing rule

This is a permanent project rule. All future Paper Review posts must start from the canonical Paper Review template and use the shared header/components rather than introducing custom per-post source-link or structural styling without a specific reason.
