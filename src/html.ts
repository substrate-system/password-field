import {
    type Attrs,
    toAttributes
} from '@substrate-system/web-component/attributes'
import { outerHtml as eyeSlashOuterHtml } from '@substrate-system/icons/render/eye-slash'
import { outerHtml as eyeRegularOuterHtml } from '@substrate-system/icons/render/eye-regular'

export function render (attributes?:Attrs):string {
    const attrs = attributes ? toAttributes(attributes) : ''

    return `
        <text-input${attrs ? ` ${attrs}` : ''}></text-input>
        <button class="pw-visibility">
            ${attributes && attributes.isVisible ?
                eyeSlashOuterHtml({ title: 'Hide' }) :
                eyeRegularOuterHtml({ title: 'Show' })
            }
        </button>
    `
}
