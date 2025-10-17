# using vue cli

## official Vue (alternative to VueCLI)

```
npm init vue uses an official package to help you initialize Vue projects.
- Use npm init vue instead of installing and using the Vue CLI
```

## VueCLI

```
npm i -g @vue/cli

```

- update package.json

```
"scripts": {
  "serve": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
  "build": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",
  "lint": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service lint"
},
```

## create a project with cli

```
vue create vue-first-app
```

### choose a vue version

- default (vue 3)
- default (vue 2)

### choose babel

### choose linter/formatter

- eslint with error prevention only

## Adding the Vetur Extension to VS Code
