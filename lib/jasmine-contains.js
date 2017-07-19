beforeAll(function () {

  jasmine.addMatchers({
    toContainOnly: function (util, customEqualityTesters) {
      // The actual array contains all and only expected array elements in any order
      return {
        compare: function (actual, expected) {
          let result = {};
          let pass = (actual.length === expected.length);
          if (pass) {
            let matches = Array(actual.length).fill(0).map(_ => []);

            // check that all expected elements equal at least one actual element
            pass = expected.every((expectedElement, expectedIndex) => {
              let found = false;
              actual.forEach((actualElement, actualIndex) => {
                if (util.equals(expectedElement, actualElement, customEqualityTesters)) {
                  found = true;
                  matches[actualIndex].push(expectedIndex);
                }
              });
              return found;
            });

            // check that all actual elements equal at least one expected element
            pass = pass && matches.every(i => i.length > 0);

            // iterate through matches to find a one to one element equality
            let counts = Array(matches.length).fill(0);
            while (pass) {

              // check for duplicates on this solution
              let expectedEquality = {};
              const duplicate = counts.some((c, i) => {
                const check = matches[i][c];
                if (expectedEquality[check]) {
                  return true;
                }
                expectedEquality[check] = true;
                return false;
              });

              if (!duplicate) {
                // found a one to one element equality
                break;
              }

              // increment counts
              let hasAnotherSolution = false;
              for (let i = 0; i < counts.length; i++) {
                counts[i]++;
                if (counts[i] < matches[i].length) {
                  hasAnotherSolution = true;
                  break;
                } else {
                  counts[i] = 0;
                }
              }

              // fail if all solutions are exahusted
              pass = hasAnotherSolution;
            }
          }
          result.pass = pass;
          const toOrNotTo = (result.pass ? "not to" : "to");
          result.message = "Expected " + jasmine.pp(actual) + " " + toOrNotTo + " only contain all of " + jasmine.pp(expected);
          return result;
        }
      };
    },

    toContainAll: function (util, customEqualityTesters) {
      // The actual array contains all expected array elements in any order and can contain other elements
      return {
        compare: function (actual, expected) {
          let result = {};
          let pass = (actual.length >= expected.length);
          if (pass) {

            let matches = Array(actual.length).fill(0).map(_ => []);

            // check that all expected elements equal at least one actual element
            let pass = expected.every((expectedElement, expectedIndex) => {
              let found = false;
              actual.forEach((actualElement, actualIndex) => {
                if (util.equals(expectedElement, actualElement, customEqualityTesters)) {
                  found = true;
                  matches[actualIndex].push(expectedIndex);
                }
              });
              return found;
            });

            if (!pass) {
              return false;
            }

            // iterate through matches to find a one to one element equality
            let counts = Array(matches.length).fill(0);
            while (pass) {

              // check for all numbers >= 0 and < expected.length
              let equalities = {};
              let sum = counts.reduce((sum, c, i) => {
                if (matches[i].length > 0) {
                  const match = matches[i][c];
                  if (!equalities[match]) {
                    equalities[match] = true;
                    sum += match + 1;
                  }
                }
                return sum;
              }, 0);

              const matchesSummed = (expected.length * (expected.length + 1)) / 2;
              if (sum === matchesSummed) {
                // found a one to one element equality
                break;
              }

              // increment counts
              let hasAnotherSolution = false;
              for (let i = 0; i < counts.length; i++) {
                counts[i]++;
                if (counts[i] < matches[i].length) {
                  hasAnotherSolution = true;
                  break;
                } else {
                  counts[i] = 0;
                }
              }

              // fail if all solutions are exahusted
              pass = hasAnotherSolution;
            }
          }
          result.pass = pass;
          const toOrNotTo = (result.pass ? "not to" : "to");
          result.message = "Expected " + jasmine.pp(actual) + " " + toOrNotTo + " only contain all of " + jasmine.pp(expected);
          return result;
        }
      };
    },
  });
  
});
