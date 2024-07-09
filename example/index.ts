import '../src/style.css'
import { PasswordField } from '../src/index.js'
import Debug from '@bicycle-codes/debug'
import './index.css'
const debug = Debug()

document.body.innerHTML += `
    <form>
        <input
            type="text"
            name="email"
            autocomplete="username email"
            style="display: none;"
        />

        <password-field
            name="password"
            display-name="New Password"
        ></password-field>
        <password-field
            name="confirm-password"
            display-name="Confirm New Password"
        ></password-field>
    </form>
`

const form = document.querySelector('form')

// synchronize changes in visibility, so
// both inputs are either visible or not visible
form?.addEventListener(PasswordField.event('change-visibility'), ev => {
    const { isVisible } = ev.detail
    debug('**is visible**', isVisible)
    document.querySelectorAll('password-field').forEach(el => {
        if (isVisible) {
            el.setAttribute('visible', '')
        } else {
            el.removeAttribute('visible')
        }
    })
})
