# AI4Forest Website

This is the official website for AI4Forest, built using Jekyll.
Please contact Jorunn or Sarah for more infos.

## Project Structure

```
.
├── src/                    # Source code
│   ├── _layouts/          # Jekyll layout templates
│   ├── _includes/         # Reusable HTML components
│   ├── _posts/            # Blog posts
│   ├── _data/             # Site data and configuration
│   ├── assets/            # Static assets (CSS, JS, images)
│   ├── content/           # Main content pages
│   ├── team.html          # Team page
│   ├── publications.html  # Publications page
│   ├── open-positions.html # Open positions page
│   ├── blogs/             # Blog-related pages
│   ├── services/          # Service-related pages
│   ├── portfolios/        # Portfolio pages
│   ├── shop/              # Shop-related pages
│   └── contact/           # Contact-related pages
├── templates/             # Example and template files
│   └── ui-components/     # UI component examples
├── _config.yml           # Jekyll configuration
├── Gemfile               # Ruby dependencies
└── package.json          # Node.js dependencies
```

## Development Setup

1. Install Ruby dependencies:
   ```bash
   bundle install
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Build the site:
   ```bash
   bundle exec jekyll build
   ```

The site will be built to the `_site` directory (which is gitignored).

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch!!
