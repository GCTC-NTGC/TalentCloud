# Talent Cloud Front-end Onboarding

Welcome to the documentation for the Talent Cloud front-end development environment. Congrats on getting your primary dev environment set up. This document contains everything you need to get set up for writing, compiling, and optimizing your CSS.

Want to hop right in? [Check out our installation instructions](#install).

## Key Technologies & Methodologies

Below is a list of the technologies we're using and why we're using them. Have an idea on how things can be improved or want to ask a question? Let's chat!

### Gulp, SASS (SCSS), Autoprefixer, CSSnano

#### Gulp

[Gulp](https://gulpjs.com/) is a package manager that is run through Node.JS. It handles the primary tasks of watching our files for changes and running our services.

[Gulp Notify](https://github.com/mikaelbr/gulp-notify) is a process used to display notifications on your desktop. These notifications are set up to tell you if your CSS is compiling successfully or if there is an error.

#### SASS (SCSS)

[SASS](https://sass-lang.com/) is a preprocessor that enhances CSS to include some really awesome functionality. With SASS, you can:
* create CSS variables that can be reused in your code
* import CSS files into other CSS files inline
* nest CSS rules
* use math and other awesome functions

#### Autoprefixer

[Autoprefixer](https://github.com/postcss/autoprefixer) does the incredible magic of adding browser prefixes to our CSS for us! This includes prefixes such as `-webkit-` and `-moz-`.

#### CSSnano

[CSSnano](http://cssnano.co/) is a set of tools that automatically compress and optimize our CSS to reduce load times and file size.

### File Structure: Atoms, Molecules, Organisms

In order to keep our code concise and reusable, our CSS files will be structured using atoms, molecules, and organisms. This is reflected in the file structure found under the `scss` folder. Thanks to SASS and the ability to import CSS files, we can create:
* **Atoms**: the most basic CSS building block - think of Atoms as individual components that can be reused throughout the project (e.g. a button).
* **Molecules**: Molecules are files that collect Atoms together to form a small reusable structure - an example of a Molecule would be a group of buttons.
* **Organisms**: the most complex components, organisms can import multiple Atoms and Molecules to form a coherent section on the project. This could range from a Navigation to a Hero element.

### Class Nomenclature: Block, Element, Modifier (BEM)

Alongside our file structure, BEM provides a unique naming methodology for our CSS classes that generates very specific and easily identifiable code. BEM consists of:
* **Block**: blocks are larger core components in our HTML - these consist of elements like page sections, heroes, headers, footers, etc. Blocks begin the class name: `.block`.
* **Element**: elements are unique HTML elements that exist within a block. Elements are added to the class using `__element`.
* **Modifier**: modifiers identify variations in blocks or elements. These variations could be as simple as a change in background colour or as complex as a different layout for the block. Modifiers are added to the class using `--modifier`.

BEM classes look like: `.block__element--modifier`

A practical example: `.hero__overlay--blue`

## <a id="install"></a> Installation

Getting started with our front-end stack is surprisingly easy. Just follow these steps:
* [Install Node.JS](https://nodejs.org/en/download/)
* In Terminal/Command Prompt, `cd dev\htdocs\GCTC-NTGC\TalentCloud\public_html`
* In Terminal/Command Prompt, run `npm install`
* In Terminal/Command Prompt, run `gulp`
* In your text editor, save a `.scss` file and watch the magic!

When you are working with CSS, **DO NOT** edit the contents of `css\compiled` or `css\optimized` as your changes will be overwritten.

## Troubleshooting

`npm install` **won't run!**

Best to come chat with Josh about this one!

**I'm not getting notifications about my Gulp services!**

Windows 10: Navigate to the `Settings` app and go into `System`, followed by `Notifications & actions`. Scroll down to `SnoreToast` and click on it. Toggle the `Show notification banners` and make sure it is set to **ON**. Try compiling your CSS again.
