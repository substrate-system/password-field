import { test } from '@bicycle-codes/tapzero'
import { waitFor, click } from '@bicycle-codes/dom'
import { PasswordField } from '../src/index.js'

test('password field', async t => {
    document.body.innerHTML += `
        <password-field class="test">
        </password-field>
    `

    const el = await waitFor('password-field')

    t.ok(el, 'should find the element')
    t.ok(el?.querySelector('input'), 'should contain an input element')
    t.ok(el?.querySelector('eye-regular'),
        'should have the visibility change icon, set to hidden by default')
})

test('events', async t => {
    t.plan(2)
    const el = await waitFor('password-field')
    const eye = el?.querySelector('button')

    el?.addEventListener(PasswordField.event('change-visibility'), (ev) => {
        const { isVisible } = ev.detail
        t.ok(ev, 'should get a "change-visiblity" event')
        t.ok(isVisible,
            'should start invisible, change to visible after a click')
    })

    click(eye!)
})
