# Game 2048

## Usage

* Run with term
  ```bash
  cd ui/terminal
  npm i
  node .
  ```

* Run with browser
  ```bash
  cd ui/html
  npm i
  node node_modules/webpack/bin/webpack.js
  ```
  browser open ui/html/dist/index.html

* Use as a lib

  * Using in ES6 env, just include ./lib/index.js
  * Using in browser
    ```bash
    npm i
    node node_modules/webpack/bin/webpack.js
    # find the target file in dist/index.js
    ```
