import { type Attrs, toAttributes } from '@substrate-system/web-component/attributes'

export function render (attributes?:Attrs):string {
    const attrs = attributes ? toAttributes(attributes) : ''

    return `
        <text-input${attrs ? ` ${attrs}` : ''}></text-input>
        <button class="pw-visibility">
            ${attributes && attributes.isVisible ?
                '<eye-slash></eye-slash>' :
                '<eye-regular></eye-regular>'
            }
        </button>
    `
}
