import { WebComponent, define as _define } from '@substrate-system/web-component'
import { define as eyeDefine } from '@substrate-system/icons/eye-slash'
import { define as regularDefine } from '@substrate-system/icons/eye-regular'
import '@substrate-system/text-input'
import '@substrate-system/text-input/css'

eyeDefine()
regularDefine()

interface VisibilityDetail {
    isVisible:boolean;
}

export interface ShowEvent extends CustomEvent<VisibilityDetail> {
    type:'password-field:show';
}
export interface HideEvent extends CustomEvent<VisibilityDetail> {
    type:'password-field:hide';
}

// for document.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'password-field':PasswordField;
    }

    interface HTMLElementEventMap {
        'password-field:show':ShowEvent;
        'password-field:hide':HideEvent;
    }
}

export function define () {
    _define('password-field', PasswordField)
}

/**
 * __attributes__
 *   - `visible` -- true if present
 *   - any attributes for `text-input`
 */
export class PasswordField extends WebComponent.create('password-field') {
    static observedAttributes = ['visible']

    set isVisible (value:boolean) {
        if (value) {
            this.setAttribute('visible', '')
        } else {
            this.removeAttribute('visible')
        }
    }

    get isVisible ():boolean {
        return this.hasAttribute('visible')
    }

    static event (name:string) {
        return WebComponent.event(name)
    }

    constructor () {
        super()
        this.isVisible = this.hasAttribute('visible')
    }

    /**
     * Listen for change in visiblity.
     *
     * @param  {string} name     The attribute name
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    async attributeChangedCallback (
        name:string,
        oldValue:string,
        newValue:string
    ) {
        if (this[`handleChange_${name}`]) {
            this[`handleChange_${name}`](oldValue, newValue)
        }
    }

    // empty string = is visible
    // null = not visible
    handleChange_visible (_, _newValue) {
        this.reRender()
    }

    /**
     * Attributes that should stay on the host element
     * and not be forwarded to the inner text-input.
     */
    static hostOnlyAttrs = new Set(['class', 'style', 'visible'])

    /**
     * Attributes that should be forwarded to the inner
     * input and removed from the host element.
     */
    static forwardedAttrs = new Set(['autocomplete', 'id'])

    static shouldForward (name:string):boolean {
        return (PasswordField.forwardedAttrs.has(name) ||
            name.startsWith('aria-'))
    }

    /**
     * Add click event listeners
     */
    connectedCallback () {
        const autocomplete = (
            this.getAttribute('autocomplete') || 'new-password'
        )
        this.isVisible = this.hasAttribute('visible')

        // create object from attributes, excluding
        // host-only attrs
        const attrs = Array.from(this.attributes)
            .reduce((acc, attr) => {
                if (PasswordField.hostOnlyAttrs.has(attr.name)) {
                    return acc
                }
                acc[attr.name] = attr.value || true
                return acc
            }, {} as Partial<{
                autocomplete, name, type, value
            }>)

        attrs['display-name'] = (
            this.getAttribute('display-name') || 'Password'
        )
        attrs.name = this.getAttribute('name') || 'password'
        attrs.autocomplete = autocomplete
        attrs.type = this.getType()

        // Remove forwarded attrs from the host element
        for (const attr of Array.from(this.attributes)) {
            if (PasswordField.shouldForward(attr.name)) {
                this.removeAttribute(attr.name)
            }
        }

        // object to string
        const attrString = Object.keys(attrs).map((k) => {
            const val = attrs[k]
            return k + (val === true ? '' : '=' + `"${val}"`)
        }).join(' ')

        this.innerHTML = `
            <text-input ${attrString}></text-input>

            <button class="pw-visibility">
                ${this.getButtonContent()}
            </button>
        `

        const btn = this.querySelector('.pw-visibility')
        btn?.addEventListener('click', ev => {
            this.isVisible = !this.isVisible
            ev.preventDefault()
            this.reRender()
            const evName = this.isVisible ?
                'show' : 'hide'
            this.emit(evName, {
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

    /**
     * Renders the password field component.
     * This method is called to (re)render the component's DOM.
     */
    render () {
        const autocomplete = (
            this.getAttribute('autocomplete') || 'new-password'
        )
        this.isVisible = this.hasAttribute('visible')

        const attrs = Array.from(this.attributes)
            .reduce((acc, attr) => {
                if (PasswordField.hostOnlyAttrs.has(attr.name)) {
                    return acc
                }
                acc[attr.name] = attr.value || true
                return acc
            }, {} as Partial<{
                autocomplete, name, type, value
            }>)

        attrs['display-name'] = (
            this.getAttribute('display-name') || 'Password'
        )
        attrs.name = this.getAttribute('name') || 'password'
        attrs.autocomplete = autocomplete
        attrs.type = this.getType()

        // Remove forwarded attrs from the host element
        for (const attr of Array.from(this.attributes)) {
            if (PasswordField.shouldForward(attr.name)) {
                this.removeAttribute(attr.name)
            }
        }

        const attrString = Object.keys(attrs).map((k) => {
            const val = attrs[k]
            return k + (val === true ? '' : '=' + `"${val}"`)
        }).join(' ')

        this.innerHTML = `
            <text-input ${attrString}></text-input>
            <button class="pw-visibility">
                ${this.getButtonContent()}
            </button>
        `

        const btn = this.querySelector('.pw-visibility')
        btn?.addEventListener('click', ev => {
            this.isVisible = !this.isVisible
            ev.preventDefault()
            this.reRender()
            const evName = this.isVisible ?
                'show' : 'hide'
            this.emit(evName, {
                detail: { isVisible: this.isVisible }
            })
        })
    }
}

// define automatically
define()
