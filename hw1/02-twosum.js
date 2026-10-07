/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

const inputs = [];
const target = 0;
const output = [];

function summing(inputs, target) {
        console.log("Input: nums = ", inputs, ", target = ", target);

	for (i = 0; i < inputs.length; i = i + 1) {
		for (j = 0; j < inputs.length; j = j + 1) {
			if (i !== j) {
				if (inputs[i] + inputs[j] === target) {
					output[1] = i;
					output[0] = j;
					break;
				}
			}
		}
	}

        console.log("Output: ", output, "\n");
}


summing([2, 7, 11, 15], 9);
summing([3, 2, 4], 6);
summing([3, 3], 6);
