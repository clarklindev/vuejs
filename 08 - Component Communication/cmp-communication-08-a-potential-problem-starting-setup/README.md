### A Potential Problem

originally...

- identifies that `<knowledge-base>` acts as a 'pass-through' component for props
- it passes 'topics' and emits 'select-topic' when `<knowledge-grid>` emits 'select-topic'
- `<knowledge-grid>` emits topic when `<knowledge-element>` emits 'select-topic'
- its actually `<knowledge-element>` that emits the original event
