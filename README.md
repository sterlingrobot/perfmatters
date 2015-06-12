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

- Lint JS and CSS files with JSHint and CSSLint
- Copy all HTML files to the distribution directory, before manipulating them
- Concatenate JS and CSS files into a single build file
- Process and minify CSS files to ensure cross-browser compliance with automatic vendor prefixing
- Minify JS files
- Substitute href and src attributes within specified build blocks of the HTML files with minified, concatenated versions
- Minify all HTML files, stripping comments and whitespace and unneccessary attributes
- Copy all image files to the distribution directory and optimize them
- Serve local files through ngrok
- Run the generated ngrok url through Google's Pagespeed Insights and generate a report in the console

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




