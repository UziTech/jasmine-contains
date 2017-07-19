"use strict";

require("jasmine-should-fail");

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

		zdescribe("should fail", function () {

			it("when given a number", function () {
				var arr = [1];
				expect(arr).toContainOnly(1);
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
				expect(arr1).toContainOnly(arr2);
			});

			it("using a custom equality", function () {
				jasmine.addCustomEqualityTester(mirrorWorldEquals);
				expect(["abcd"]).toContainOnly(["abcd"]);
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

		zdescribe("should fail", function () {

			it("when given a number", function () {
				var arr = [1];
				expect(arr).toContainAll(1);
			});

			it("when given a larger array", function () {
				var arr1 = [1, 2, 3];
				var arr2 = [1, 2, 3, 4];
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
					jasmine.any(Function),
					jasmine.objectContaining({ a: true })
				];
				expect(arr1).toContainAll(arr2);
			});

			it("using a custom equality", function () {
				jasmine.addCustomEqualityTester(mirrorWorldEquals);
				expect(["abcd"]).toContainAll(["abcd"]);
			});

		});

	});

});
