## Website Performance Optimization portfolio project


####Part 1: Optimize PageSpeed Insights score for index.html

**Check the performance of the site:**

- Clone the project on your desktop
```bash
git clone git@github.com:sterlingrobot/perfmatters.git
```
- Install the dependencies
```bash
npm install
```

- Run Grunt tasks
```bash
grunt
```

**Grunt will run the following tasks to check and build an optimized dist folder,
from which to serve the site.**

- Linting, with JSHint and CSSLint
- Copying all HTML, CSS & JS files to a temporary output directory, before manipulating them
- Substituting href and src attributes in HTML files with minified, concatenated versions
- Processing and minifying CSS files to ensure cross-browser compliance with automatic vendor prefixing
- Minifying JS, HTML and image files
- Serving local files through ngrok
- Running the generated ngrok url through Google's Pagespeed Insights and generating a report in the console

Check the performance from Pagespeed Insights in the terminal:
```bash
--------------------------------------------------------

URL:       647cb6f2.ngrok.com
Strategy:  mobile
Score:     96

HTML size                                  | 2.6 kB
Image size                                 | 25.27 kB
JavaScript size                            | 26.43 kB
Hosts                                      | 5
JS resources                               | 2
Resources                                  | 9
Static resources                           | 7
Total size                                 | 959 B

Leverage browser caching                   | 3

--------------------------------------------------------
```

####Part 2: Optimize Frames per Second in pizza.html

- The problem:
Cameron created a cool, dynamic custom pizza generator with interactivity and animation, but it feels really janky and doesn't run at 60fps with fast rendering and responsiveness.  This page needed some performance tuning!  What can be done?

- The solution(s):




