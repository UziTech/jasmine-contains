[![Actions Status](https://github.com/UziTech/jasmine-contains/workflows/CI/badge.svg)](https://github.com/UziTech/jasmine-contains/actions)

# jasmine-contains

Jasmine matchers to check the contents of an array

# install

```sh
npm install --save-dev jasmine-contains
```

```js
require("jasmine-contains")
```

or

```html
<script src="\path\to\jasmine-contains\src\jasmine-contains.js"></script>
```


# Matchers

## toContainOnly(array)

Matches if expected array contains all and only the given array objects in any order.

### Example

```js
expect([1, "2", { "3": 4 }, 5]).toContainOnly([jasmine.any(Number), jasmine.objectContaining({ "3": 4 }), 1, "2"]);
```

## toContainAll(array)

Matches if expected array contains all the given array objects in any order.

### Example

```js
expect([5, 4, 3, 2, 1]).toContainAll([1, 2, 3]);
```
