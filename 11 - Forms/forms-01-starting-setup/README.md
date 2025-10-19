## Working with v-model Modifiers and Numbers

### v-model

- when you read a number from a form, v-model uses the type of the input eg. if its a number, it stays a number (browser console outputs numbers in blue)

#### v-model modifiers

- .number - if input type was a 'string', you can force vue to convert to number eg. v-model.number="userAge"
- .lazy - change how vue updates the bound property eg. on every key-stroke or at a lower frequency
- .trim - remove excess whitespace before and after

#### refs

- when you use: `this.$refs.ageInput.value` on input, value will always be a string (ie. no automatic type conversion) (browser console outputs strings in black)
