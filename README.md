[![Build Status](https://travis-ci.org/UziTech/jasmine-contains.png)](https://travis-ci.org/UziTech/jasmine-contains)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/jrjc3y3n0tftjji7?svg=true)](https://ci.appveyor.com/project/UziTech/jasmine-contains)

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
expect([1, "2", { "3": 4 }]).toContainOnly([jasmine.any(Number), "2", jasmine.objectContaining({ "3": 4 })]);
```

## toContainAll(array)

Matches if expected array contains all the given array objects in any order.

### Example

```js
expect([5, 4, 3, 2, 1]).toContainAll([1, 2, 3]);
```
