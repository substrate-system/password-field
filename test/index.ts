import { test } from '@bicycle-codes/tapzero'
import { waitFor } from '@bicycle-codes/dom'
import '../src/index.js'

test('example', async t => {
    document.body.innerHTML += `
        <password-field class="test">
        </password-field>
    `

    const el = await waitFor('password-field')

    t.ok(el, 'should find the element')
    t.ok(el?.querySelector('input'), 'should contain an input element')
    t.ok(el?.querySelector('eye-regular'), 'should have the visibility change icon')
})
