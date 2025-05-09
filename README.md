# Source Check

Hey there!

Welcome to Source Check—a little project I put together to help folks (like you and me) make sense of the news, especially when it comes to the India-Pakistan conflict. I wanted a simple, no-nonsense place to:

- Remind myself how to spot reliable info
- Keep a handy checklist for vetting sources
- Share a few trusted news orgs and fact-checkers I actually use

## Why I Made This

Let's be real: the news can get messy, and it's tough to know what's legit. I got tired of second-guessing every headline, so I made this site as my own little toolkit. If it helps you too, that's awesome!

## What's Here?

- **Manual Source Vetting Checklist:**
  - A list of questions I run through whenever I see something sketchy (or even when I don't).
- **Trusted Resources:**
  - My go-to news orgs and fact-checkers. No one's perfect, but these are a good start.
- **Mobile-friendly:**
  - Works on your phone, tablet, or laptop.
- **No ads, no tracking (except Google Analytics for my own curiosity).**

## Want to Use or Tweak This?

Just open `index.html` in your browser. If you want to change the checklist or add your own resources, pop open the file in a text editor and go for it. It's all static, so nothing fancy or breakable.

## How I Keep Track

I use Google Analytics just to see if anyone else finds this useful. No personal data, no weird stuff.

## That's It!

If you have suggestions, or just want to say hi, feel free to open an issue or fork the repo. Otherwise, happy source checking!

— Kushal

## Features

- Manual Source Vetting Checklist
- Curated list of trusted news organizations
- List of recommended fact-checkers and journalists
- Mobile-responsive design
- No backend dependencies

## Local Development

To view the website locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/source-check.git
   cd source-check
   ```

2. Open `index.html` in your web browser:
   - Double-click the file to open it directly
   - Or use a local development server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     # Then visit http://localhost:8000 in your browser
     ```

## Deployment to GitHub Pages

1. Create a new repository on GitHub named `source-check`

2. Initialize git and push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/source-check.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository's Settings
   - Scroll down to the "GitHub Pages" section
   - Under "Source", select "main" branch
   - Click "Save"

4. Your site will be published at `https://yourusername.github.io/source-check`

## Updating Content

### Updating the Checklist

The checklist is defined in `index.html`. To modify it:

1. Open `index.html` in a text editor
2. Locate the `<section id="checklist">` section
3. Edit the content within the `<ul>` tags
4. Save and commit your changes

### Updating Resource Lists

The resource lists are defined in `script.js`. To modify them:

1. Open `script.js` in a text editor
2. Locate the `resources` object
3. Edit the `newsOrganizations` or `factCheckers` arrays
4. Save and commit your changes

## File Structure

```
source-check/
├── index.html      # Main HTML file
├── style.css       # Stylesheet
├── script.js       # JavaScript for resource lists
└── README.md       # This file
```

## Contributing

Feel free to submit issues and enhancement requests! 