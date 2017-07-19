"use strict";

require("../src/jasmine-contains");

function mirrorWorldEquals(a, b) {
	if (typeof a === "string") {
		var reverseA = a.split("").reverse().join("");
		return (reverseA === b);
	}
}

describe("jasmine-contains", function () {

	describe("toContainOnly", function () {

		describe("should pass", function () {

			it("when given the same array", function () {
				var arr = [1, 2, 3];
				expect(arr).toContainOnly(arr);
			});

			it("when given a similar array", function () {
				var arr1 = [1, 2, 3];
				var arr2 = [1, 2, 3];
				expect(arr1).toContainOnly(arr2);
			});

			it("when given a similar array out of order", function () {
				var arr1 = [1, 2, 3];
				var arr2 = [2, 3, 1];
				expect(arr1).toContainOnly(arr2);
			});

			it("when using an asymmetric match", function () {
				var arr1 = [
					[],
					2,
					{ a: true, b: false }
				];
				var arr2 = [
					jasmine.anything(),
					jasmine.any(Number),
					jasmine.objectContaining({ a: true })
				];
				expect(arr1).toContainOnly(arr2);
			});

			it("using a custom equality", function () {
				jasmine.addCustomEqualityTester(mirrorWorldEquals);
				expect(["abcd"]).toContainOnly(["dcba"]);
			});

		});

		describe("should fail", function () {

			it("when given a number", function () {
				var arr = [1];
				expect(arr).not.toContainOnly(1);
			});

			it("when given an array with mismatched number of items", function () {
				var arr1 = [1, 2, 2];
				var arr2 = [1, 1, 2];
				expect(arr1).not.toContainOnly(arr2);
			});

			it("when using an asymmetric match", function () {
				var arr1 = [
					[],
					2,
					{ a: true, b: false }
				];
				var arr2 = [
					jasmine.anything(),
					jasmine.any(Function),
					jasmine.objectContaining({ a: true })
				];
				expect(arr1).not.toContainOnly(arr2);
			});

			it("using a custom equality", function () {
				jasmine.addCustomEqualityTester(mirrorWorldEquals);
				expect(["abcd"]).not.toContainOnly(["abcd"]);
			});

		});

	});

	describe("toContainAll", function () {

		describe("should pass", function () {

			it("when given the same array", function () {
				var arr = [1, 2, 3];
				expect(arr).toContainAll(arr);
			});

			it("when given a similar array", function () {
				var arr1 = [1, 2, 3];
				var arr2 = [1, 2, 3];
				expect(arr1).toContainAll(arr2);
			});

			it("when given a smaller array", function () {
				var arr1 = [1, 2, 3];
				var arr2 = [1, 2];
				expect(arr1).toContainAll(arr2);
			});

			it("when using an asymmetric match", function () {
				var arr1 = [
					[],
					2,
					{ a: true, b: false }
				];
				var arr2 = [
					jasmine.anything(),
					jasmine.any(Number),
					jasmine.objectContaining({ a: true })
				];
				expect(arr1).toContainAll(arr2);
			});

			it("using a custom equality", function () {
				jasmine.addCustomEqualityTester(mirrorWorldEquals);
				expect(["abcd"]).toContainAll(["dcba"]);
			});

		});

		describe("should fail", function () {

			it("when given a number", function () {
				var arr = [1];
				expect(arr).not.toContainAll(1);
			});

			it("when given a larger array", function () {
				var arr1 = [1, 2, 3];
				var arr2 = [1, 2, 3, 4];
				expect(arr1).not.toContainAll(arr2);
			});

			it("when using an asymmetric match", function () {
				var arr1 = [
					[],
					2,
					{ a: true, b: false }
				];
				var arr2 = [
					jasmine.anything(),
					jasmine.any(Function),
					jasmine.objectContaining({ a: true })
				];
				expect(arr1).not.toContainAll(arr2);
			});

			it("using a custom equality", function () {
				jasmine.addCustomEqualityTester(mirrorWorldEquals);
				expect(["abcd"]).not.toContainAll(["abcd"]);
			});

		});

	});

});
