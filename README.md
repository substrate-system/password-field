# password field
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/password-field/nodejs.yml?style=flat-square)](https://github.com/substrate-system/password-field/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/password-field?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://packagephobia.com/badge?p=@substrate-system/password-field)](https://packagephobia.com/result?p=@substrate-system/password-field)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


Web component for password inputs

[See a live demonstration](https://substrate-system.github.io/password-field/)

__*Featuring*__

An eyeball button that will change the visiblity of the password.

This state is tracked by the webcomponent itself, but it can also be set by an attribute, `visible`. If `visible` is present on the tag, then you can see the password.

See [./example](./example/index.ts) for an example of using the attribute to control visiblity, and keeping two inputs in sync with each other.

<!-- toc -->

- [Install](#install)
- [tl;dr](#tldr)
- [API](#api)
  * [Node.js / Server-Side Rendering](#nodejs--server-side-rendering)
  * [Events](#events)
  * [Attributes](#attributes)
  * [ESM & CJS](#esm--cjs)
  * [ESM](#esm)
  * [Common JS](#common-js)
- [CSS](#css)
- [Example](#example)

<!-- tocstop -->

## Install

```sh
npm i -S @substrate-system/password-field
```

## tl;dr

### Client-side Usage
Import the JS component and CSS.

```js
import { PasswordField } from '@substrate-system/password-field'
import '@substrate-system/password-field/css'
// or import minified css
import '@substrate-system/password-field/css/min'
```

### Server-side Usage
For Node.js or server-side rendering:

```js
import { render } from '@substrate-system/password-field/html'

const html = render({
    name: 'password',
    'display-name': 'Password'
})
```

Use the tag in HTML

```html
<form>
    <password-field
        name="password"
        display-name="New Password"
    ></password-field>
</form>
```

Listen for events in JS

```js
import { PasswordField } from '@substrate-system/password-field'
const eventName = PasswordField.event('change-visibility')

form?.addEventListener(eventName, ev => {
    const { isVisible } = ev.detail
    console.log('is visible', isVisible)
})
```

## API

### Node.js / Server-Side Rendering

For server-side rendering or generating HTML strings in Node.js, you can use the `render` function:

```js
import { render } from '@substrate-system/password-field/html'

// Basic usage
const html = render()
// Returns: <text-input></text-input><button class="pw-visibility"><eye-regular></eye-regular></button>

// With attributes
const html = render({
    name: 'password',
    'display-name': 'New Password',
    required: true,
    isVisible: false
})
// Returns: <text-input name="password" display-name="New Password" required></text-input><button class="pw-visibility"><eye-regular></eye-regular></button>
```

**Available attributes:**
- `name` - Input name attribute
- `display-name` - Display name for the field
- `required` - Whether the field is required
- `autocomplete` - Autocomplete attribute (defaults to 'new-password')
- `isVisible` - Whether the password is visible (affects button icon)
- Any other attributes will be passed through to the text-input component

**TypeScript types:**
```ts
import type { Attrs } from '@substrate-system/web-component/attributes'

// The render function accepts an optional Attrs object
function render(attributes?: Attrs): string
```

**SSR Example:**
```js
import { render } from '@substrate-system/password-field/html'

// In your server-side template
function renderLoginForm() {
    return `
        <form>
            <input type="email" name="email" required />
            ${render({
                name: 'password',
                'display-name': 'Password',
                required: true
            })}
            <button type="submit">Login</button>
        </form>
    `
}
```

### Events

* `password-field:change-visiblity`

    ```js
    import { PasswordField } from '../src/index.js'
    PasswordField.event('change-visiblity')
    // => 'password-field:change-visiblity'
    ```

    Fired when someone clicks the eyeball button in the field. The event
    `.detail` has a property `isVisible`

    ```js
    form?.addEventListener(PasswordField.event('change-visibility'), ev => {
        const { isVisible } = ev.detail
    })
    ```

### Attributes

* `visible`
* `display-name`
* `required`
* `autocomplete`
* `name`

> [!NOTE]  
> The `name` attribute is used for an `id` on the element also, so it should
> be unique.

### ESM & CJS

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@namespace/package/module'
```

### Common JS
```js
require('@namespace/package/module')
```

## CSS

```js
import '@namespace/package-name/css'
```

Or minified:
```js
import '@namespace/package-name/css/min'
```

## Example
Use event bubbling to attach a single listener to the parent form. Use the imported component, `PasswordField`, to get the namespaced event name.

```js
import { PasswordField } from '@substrate-system/password-field'
import '@substrate-field/password-field/css'

const form = document.querySelector('form')

form?.addEventListener(PasswordField.event('change-visibility'), ev => {
    // synchronize changes in visibility, so
    // both inputs are either visible or not visible
    const { isVisible } = ev.detail
    document.querySelectorAll('password-field').forEach(el => {
        if (isVisible) {
            el.setAttribute('visible', '')
        } else {
            el.removeAttribute('visible')
        }
    })
})
```
