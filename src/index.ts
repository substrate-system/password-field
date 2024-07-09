import { WebComponent } from '@substrate-system/web-component'
import '@substrate-system/icons/eye-slash'
import '@substrate-system/icons/eye-regular'
import '@substrate-system/text-input'
import '@substrate-system/text-input/css'
import './index.css'
import { createDebug } from '@bicycle-codes/debug'
const debug = createDebug()

export class PasswordField extends WebComponent.create('password-field') {
    isVisible = false

    constructor () {
        super()

        const autocomplete = this.getAttribute('autocomplete') || 'new-password'

        this.innerHTML = `
            <text-input
                display-name="${this.getAttribute('display-name') || 'Password'}"
                title="Password"
                required
                autocomplete="${autocomplete}"
                name="${this.getAttribute('name') || 'password'}"
                type="${this.getType()}"
            ></text-input>

            <button class="pw-visibility">
                ${this.getButtonContent()}
            </button>
        `
    }

    /**
     * Add click event listeners
     */
    connectedCallback () {
        const btn = this.querySelector('.pw-visibility')
        btn?.addEventListener('click', ev => {
            this.isVisible = !this.isVisible
            ev.preventDefault()
            btn.innerHTML = this.getButtonContent()
            this.setAttribute('type', this.getType())
            this.querySelector('input')?.setAttribute('type', this.getType())
        })
    }

    getType ():'text'|'password' {
        return this.isVisible ? 'text' : 'password'
    }

    getButtonContent () {
        return this.isVisible ?
            '<eye-slash></eye-slash>' :
            '<eye-regular></eye-regular>'
    }
}

export class _PasswordField extends HTMLElement {
    isVisible = false
    // need this for `attributeChangedCallback`
    static observedAttributes = ['visible']

    constructor () {
        super()

        const autocomplete = this.getAttribute('autocomplete') || 'new-password'

        this.innerHTML = `
            <text-input
                display-name="${this.getAttribute('display-name') || 'Password'}"
                title="Password"
                required
                autocomplete="${autocomplete}"
                name="${this.getAttribute('name') || 'password'}"
                type="${this.getType()}"
            ></text-input>

            <button class="pw-visibility">
                ${this.getButtonContent()}
            </button>
        `
    }

    /**
     * Listen for change in visiblity.
     * @param  {string} name     The attribute name
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    attributeChangedCallback (name:string, oldValue:string, newValue:string) {
        this[`handleChange_${name}`](oldValue, newValue)
        debug('an attribute changed', name)
    }

    handleChange_visible (_, newValue) {
        debug('changeeeeee', newValue)
    }

    /**
     * Add click event listeners
     */
    connectedCallback () {
        const btn = this.querySelector('.pw-visibility')
        btn?.addEventListener('click', ev => {
            this.isVisible = !this.isVisible
            ev.preventDefault()
            btn.innerHTML = this.getButtonContent()
            this.setAttribute('type', this.getType())
            this.querySelector('input')?.setAttribute('type', this.getType())
        })
    }

    getType ():'text'|'password' {
        return this.isVisible ? 'text' : 'password'
    }

    getButtonContent () {
        return this.isVisible ?
            '<eye-slash></eye-slash>' :
            '<eye-regular></eye-regular>'
    }
}

customElements.define('password-field', PasswordField)
