# Game 2048

## Usage

* Run with term
  ```bash
  cd ui/terminal
  npm i
  node .
  ```
  
  ![term](https://user-images.githubusercontent.com/6469269/29011653-62aa881c-7b67-11e7-84f4-04de6f551888.png)


* Run with browser
  ```bash
  cd ui/html
  npm i
  node node_modules/webpack/bin/webpack.js
  ```
  browser open ui/html/dist/index.html

  ![image](https://user-images.githubusercontent.com/6469269/29011700-ba2179d4-7b67-11e7-8849-b644bcb8dd45.png)


* Use as a lib

  * Using in ES6 env, just include ./lib/index.js
  * Using in browser
    ```bash
    npm i
    node node_modules/webpack/bin/webpack.js
    # find the target file in dist/index.js
    ```
