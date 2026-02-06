import { test } from '@substrate-system/tapzero'
import { waitFor, click } from '@substrate-system/dom'
import { define } from '../src/index.js'

define()

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

test('custom name attribute in a form', async t => {
    t.plan(2)

    document.body.innerHTML += `
        <form id="test-form">
            <password-field name="pw"></password-field>
            <button type="submit">Submit</button>
        </form>
    `

    const form = document.querySelector('#test-form') as HTMLFormElement

    form.addEventListener('submit', (ev) => {
        ev.preventDefault()
        const input = form.querySelector('input[name="pw"]')
        t.ok(input, 'should find the input by name="pw" in the form')
        t.equal(input?.getAttribute('name'), 'pw',
            'the internal input should have name="pw", not the default "password"')
    })

    form.requestSubmit()
})

test('events', async t => {
    t.plan(2)
    const el = await waitFor('password-field')
    const eye = el?.querySelector('button')

    el?.addEventListener('password-field:change-visibility', (ev) => {
        const { isVisible } = ev.detail
        t.ok(ev, 'should get a "change-visiblity" event')
        t.ok(isVisible,
            'should start invisible, change to visible after a click')
    })

    click(eye!)
})
