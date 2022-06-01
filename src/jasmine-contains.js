"use strict";

beforeEach(function () {

	jasmine.addMatchers({
		toContainOnly: function (util, customEqualityTesters) {
			var prettyPrint = util.pp || jasmine.pp;
			var undef;
			var equalityTesters = customEqualityTesters && !customEqualityTesters.deprecated ? customEqualityTesters : undef;
			// The actual array contains all and only expected array elements in any order
			return {
				compare: function (actual, expected) {
					var result = {};
					var pass = (actual.length === expected.length);
					if (pass) {
						// fill matches with empty arrays
						var matches = Array(actual.length).fill().map(function () { return []; });

						// check that all expected elements equal at least one actual element
						pass = expected.every(function (expectedElement, expectedIndex) {
							var found = false;
							actual.forEach(function (actualElement, actualIndex) {
								if (util.equals(expectedElement, actualElement, equalityTesters)) {
									found = true;
									matches[actualIndex].push(expectedIndex);
								}
							});
							return found;
						});

						// check that all actual elements equal at least one expected element
						pass = pass && matches.every(function (i) { return (i.length > 0); });

						// iterate through matches to find a one to one element equality
						var counts = Array(matches.length).fill(0);
						while (pass) {

							// check for duplicates on this solution
							var expectedEquality = {};
							var duplicate = counts.some(function (c, i) {
								var check = matches[i][c];
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
							var hasAnotherSolution = false;
							for (var i = 0; i < counts.length; i++) {
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
					var toOrNotTo = (result.pass ? "not to" : "to");
					result.message = "Expected " + prettyPrint(actual) + " " + toOrNotTo + " only contain all of " + prettyPrint(expected);
					return result;
				}
			};
		},

		toContainAll: function (util, customEqualityTesters) {
			var prettyPrint = util.pp || jasmine.pp;
			var undef;
			var equalityTesters = customEqualityTesters && !customEqualityTesters.deprecated ? customEqualityTesters : undef;
			// The actual array contains all expected array elements in any order and can contain other elements
			return {
				compare: function (actual, expected) {
					var result = {};
					var pass = (actual.length >= expected.length);
					if (pass) {

						var matches = Array(actual.length).fill().map(function () { return []; });

						// check that all expected elements equal at least one actual element
						pass = expected.every(function (expectedElement, expectedIndex) {
							var found = false;
							actual.forEach(function (actualElement, actualIndex) {
								if (util.equals(expectedElement, actualElement, equalityTesters)) {
									found = true;
									matches[actualIndex].push(expectedIndex);
								}
							});
							return found;
						});

						if (pass) {

							// iterate through matches to find a one to one element equality
							var counts = Array(matches.length).fill(0);
							while (pass) {

								// check for all numbers >= 0 and < expected.length
								var equalities = {};
								var sum = counts.reduce(function (sum, c, i) {
									if (matches[i].length > 0) {
										var match = matches[i][c];
										if (!equalities[match]) {
											equalities[match] = true;
											// add +1 to make sure 0 isn't missing
											sum += match + 1;
										}
									}
									return sum;
								}, 0);
								var matchedSum = (expected.length * (expected.length + 1)) / 2;
								if (sum === matchedSum) {
									// found a one to one element equality
									break;
								}

								// increment counts
								var hasAnotherSolution = false;
								for (var i = 0; i < counts.length; i++) {
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
					}
					result.pass = pass;
					var toOrNotTo = (result.pass ? "not to" : "to");
					result.message = "Expected " + prettyPrint(actual) + " " + toOrNotTo + " only contain all of " + prettyPrint(expected);
					return result;
				}
			};
		},
	});

});
