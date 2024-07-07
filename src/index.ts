// import { useSignal, Signal } from '@preact/signals'
import { createDebug } from '@bicycle-codes/debug'
import '@substrate-system/icons/eye-slash'
import '@substrate-system/icons/eye-regular'
import '@substrate-system/text-input'
import '@substrate-system/text-input/css'
import './index.css'
const debug = createDebug()

// export const _PasswordField:FunctionComponent<{
//     onVisiblityChange?:()=>any;
//     onInput?:(ev:InputEvent)=>any;
//     isVisible?:Signal<boolean>;
//     displayName?:string
//     name?:string
// }> = function (props) {
//     const {
//         onVisiblityChange,
//         onInput,
//         isVisible: _vis,
//         displayName,
//         name,
//         ..._props
//     } = props
//     const isVisible = _vis || useSignal<boolean>(false)

//     function visibility (ev:MouseEvent) {
//         ev.preventDefault()
//         isVisible.value = !isVisible.value
//         onVisiblityChange && onVisiblityChange()
//     }

//     return html`<div class="password-field">
//         <${Input}
//             ...${_props}
//             type="${isVisible.value ? 'text' : 'password'}"
//             onInput=${onInput}
//             displayName="${displayName || 'Password'}"
//             name="${name || 'pw'}"
//         />

//         <button class="pw-visibility" onClick=${visibility}>
//             ${isVisible.value ?
//                 html`<${EyeSlash} />` :
//                 html`<${EyeRegular} />`
//             }
//         </button>
//     </div>`
// }

export class PasswordField extends HTMLElement {
    isVisible = false

    constructor () {
        super()

        const autocomplete = this.getAttribute('autocomplete') || 'new-password'

        this.innerHTML = `
            <text-input
                display-name="Password"
                title="Password"
                required
                autocomplete="${autocomplete}"
                name="password"
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
        debug('connected callback', btn)
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
