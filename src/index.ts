import { WebComponent } from '@substrate-system/web-component'
import '@substrate-system/icons/eye-slash'
import '@substrate-system/icons/eye-regular'
import '@substrate-system/text-input'
import '@substrate-system/text-input/css'
import './style.css'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'password-field': PasswordField;
    }
}

/**
 * __attributes__
 *   - `visible` -- true if present
 */
export class PasswordField extends WebComponent.create('password-field') {
    isVisible:boolean = this.hasAttribute('visible')
    static observedAttributes = ['visible']

    constructor () {
        super()

        const autocomplete = this.getAttribute('autocomplete') || 'new-password'
        // eslint-disable-next-line
        this.isVisible = this.hasAttribute('visible')

        this.innerHTML = `
            <text-input
                display-name="${this.getAttribute('display-name') || 'Password'}"
                title="Password"
                ${this.getAttribute('required') === null ? '' : 'required'}
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
    }

    // empty string = is visible
    // null = not visible
    handleChange_visible (_, newValue) {
        if (newValue === null) {
            this.isVisible = false
        } else {
            this.isVisible = true
        }
        this.reRender()
    }

    /**
     * Add click event listeners
     */
    connectedCallback () {
        const btn = this.querySelector('.pw-visibility')
        btn?.addEventListener('click', ev => {
            this.isVisible = !this.isVisible
            ev.preventDefault()
            this.reRender()
            this.emit('change-visibility', {
                detail: { isVisible: this.isVisible }
            })
        })
    }

    reRender () {
        const btn = this.querySelector('.pw-visibility')
        btn!.innerHTML = this.getButtonContent()
        this.setAttribute('type', this.getType())
        this.querySelector('input')?.setAttribute('type', this.getType())
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
