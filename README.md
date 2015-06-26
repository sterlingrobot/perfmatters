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
- Purge any existing distribution directory
- Copy all HTML files to a new distribution directory, before manipulating them
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

URL:       6d177c29.ngrok.com
Strategy:  mobile
Score:     94

HTML size                                  | 4.53 kB
Image size                                 | 25.27 kB
JavaScript size                            | 26.13 kB
Hosts                                      | 5
JS resources                               | 2
Resources                                  | 9
Static resources                           | 7
Total size                                 | 962 B

Leverage browser caching                   | 3
Main resource server response time         | 2.1

--------------------------------------------------------
```

####Part 2: Optimize Frames per Second in pizza.html

- The problem:
  * Cameron created a cool, dynamic custom pizza generator with interactivity and animation, but it feels really janky and doesn't run at 60fps with fast rendering and responsiveness.
  * This page needed some performance tuning!  What can be done?

- The solution(s):
  * Refactor all occurrences of querying the DOM within loops, since this is wasted effort.
    Get the element to be manipulated first, then iterate through the loop and append or modify content
  * Within for loops, get an array's length during instantiation, instead of calculating it every iteration
  * Don't overuse `document.querySelector` since it is more expensive than calling `document.getElementById`
    or `document.getElementsByClassName` (don't forget the latter returns an array, so add [0] to get the
    first element)
  * Refactor unneccessary function calls and operations to keep calculations streamlined and efficient.  No
    need to create unneccessary function scopes
  * Only create enough background pizzas (moving elements) to fill the viewport by calculating viewport height
  	using `window.innerHeight` instead of arbitrarily using 200



