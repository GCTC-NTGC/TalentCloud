# Talent Cloud Front-end Onboarding

Welcome to the documentation for the Talent Cloud front-end development environment. Congrats on getting your primary dev environment set up. This document contains everything you need to get set up for writing, compiling, and optimizing your CSS.

Want to hop right in? [Check out our installation instructions](#install).

## Key Technologies & Methodologies

Below is a list of the technologies we're using and why we're using them. Have an idea on how things can be improved or want to ask a question? Let's chat!

### Gulp, SASS (SCSS), Autoprefixer, CSSnano

#### Gulp

[Gulp](https://gulpjs.com/) is a package manager that is run through Node.JS. It handles the primary tasks of watching and running our services.

#### SASS (SCSS)

[SASS](https://sass-lang.com/) is a preprocessor that enhances CSS to include some really awesome functionality. With SASS, you can:
* create CSS variables that can be reused in your code
* nest CSS rules
* use math and other awesome functions

#### Autoprefixer

[Autoprefixer](https://github.com/postcss/autoprefixer) does the incredible magic of adding browser prefixers to our CSS for us! This includes prefixes such as `-webkit-` and `-moz-`.

#### CSSnano

[CSSnano](http://cssnano.co/) is a set of tools that automatically compress and optimize our CSS to reduce load times and file size.

### Atoms, Molecules, Organisms

### Block, Element, Modifier (BEM)

## <a id="install"></a> Installation

Getting started with our front-end stack is surprisingly easy. Just follow these steps:
* [Install Node.JS](https://nodejs.org/en/download/)
* In Terminal/Command Prompt, `cd public_html`
* In Terminal/Command Prompt, run `npm install`
* In Terminal/Comman Prompt, run `gulp`
* In your text editor, save a `.scss` file and watch the magic!

Gulp will automatically watch your files. **You are required to rerun the process if an error occurs or you close the terminal window.**

When you are working with CSS, DO NOT edit the contents of `css\compiled` or `css\optimized` as your changes will be overwritten.
