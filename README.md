# gog-project by Mateusz Golonka
Frontend Recruitment Task

## Requirement Node 6+ && NPM 3+

For this project to work you need Node >= 6.0.0 and NPM => 3.0.0. You can check your version number with the command
```bash
node --version && npm --version
```

## Setup

First, clone or download this repository.
In the command line (cmd) go to project's directory.
Then, using [npm](https://www.npmjs.com/) script install modules:
```bash
npm i
```

## Launch

To launch a browser sync server on source files
```bash
npm run serve
```
To launch a server on optimized application
```bash
npm run serve:dist
```

Or if you have [gulp-cli](https://www.npmjs.com/package/gulp-cli) installed in global packages you can use equivalent:
```bash
gulp serve
gulp serve:dist
```

Then navigate to http://localhost:3000 to see project in action.

## Additional Features

- To purchase products click the cart's total price (left from the 'clear cart' button).
- History has been implemented: state of the cart and products is saved in the browser.
- To clear the history (for testing purpose) click the 'gog com' icon and refresh page.
