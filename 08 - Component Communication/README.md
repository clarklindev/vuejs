## Prop Behavior & Changing Props

- Vue uses Unidirectional dataflow
- data passed from App to `<friend-contact>` should only be changed in app (not in `<friend-contact>`)
- 2 approaches, notify App of changes to data and App makes the data change,
- OR - passed data becomes initial data for `<friend-contact>`
