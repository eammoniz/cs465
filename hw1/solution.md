## Homework 1 Explanation
#### Elizabeth Moniz - CS 465P - October 7th 2026

### 01 FizzBuzz

For this section, I used the examples to format my code to match the expected output.
Because the assignment calls for checking incrementing values, I implemented a method within a loop.
I then used the modular logic to determine which values in the list, up to a specific value, match these conditions:
    `answer[i] === "FizzBuzz" if i is divisible by 3 and 5.`
    `answer[i] === "Fizz" if i is divisible by 3.`
    `answer[i] === "Buzz" if i is divisible by 5.`
    `answer[i] === i (as a string) if none of the above conditions are true.`
The result of the above conditions are stored in an array that is then outputted once the function completes.
I created this in a function for ease of access to testing multiple input values.

### 02 TwoSum

For this section, I followed the examples to get a feel for what the expected behavior of the model is. 
Because the expected output is a sum of two values, I implemented a nested loop of two iterations that selects a single value to start with and tests the sum of each other value wtih it to see if it matches the target value. 
The second loop only operates when it is not considering the index of the first number, as seen by this line:
    `if (i !== j)`
The output is a two-dimensional array that contains the indecies with values whose sum matches the target value.  
