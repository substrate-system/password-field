import { test } from '@substrate-system/tapzero'
import { waitFor, click } from '@substrate-system/dom'
import '../src/index.js'

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

test('"password-field:show" event', async t => {
    t.plan(2)

    document.body.innerHTML += `
        <password-field class="test-show-event">
        </password-field>
    `

    const el = await waitFor(
        'password-field.test-show-event'
    )
    const eye = el?.querySelector('button')

    el?.addEventListener('password-field:show', ((ev:CustomEvent) => {
        t.ok(ev, 'should emit a "password-field:show" event')
        t.equal(ev.detail.isVisible, true,
            'event detail should have isVisible: true')
    }) as EventListener)

    // first click: hidden -> visible
    click(eye!)
})

test('"password-field:hide" event', async t => {
    t.plan(2)

    document.body.innerHTML += `
        <password-field
            class="test-hide-event"
        ></password-field>
    `

    const el = await waitFor(
        'password-field.test-hide-event'
    )
    const eye = el?.querySelector('button')

    el?.addEventListener('password-field:hide', ((ev:CustomEvent) => {
        t.ok(ev, 'should emit a "password-field:hide" event')
        t.equal(ev.detail.isVisible, false,
            'event detail should have isVisible: false')
    }) as EventListener)

    // first click: hidden -> visible
    click(eye!)
    // second click: visible -> hidden
    click(eye!)
})

test('"password-field:show" event bubbles', async t => {
    t.plan(1)

    document.body.innerHTML += `
        <form id="test-show-bubbles">
            <password-field
                class="test-show-bubbles"
            ></password-field>
        </form>
    `

    const form = document.querySelector(
        '#test-show-bubbles'
    ) as HTMLFormElement
    const el = await waitFor(
        'password-field.test-show-bubbles'
    )
    const eye = el?.querySelector('button')

    form.addEventListener('password-field:show', () => {
        t.ok(true,
            'should bubble "password-field:show" event')
    })

    click(eye!)
})

test('autocomplete is on inner input, not outer element', async t => {
    document.body.innerHTML += `
        <password-field
            class="test-autocomplete"
            autocomplete="current-password"
        ></password-field>
    `

    const el = await waitFor(
        'password-field.test-autocomplete'
    )
    const input = el?.querySelector('input')

    t.ok(input, 'should have an inner input')
    t.equal(
        input?.getAttribute('autocomplete'),
        'current-password',
        'inner input should have autocomplete attribute'
    )
    t.equal(
        el?.hasAttribute('autocomplete'),
        false,
        'outer element should not have autocomplete'
    )
})

test('id is on inner input, not outer element', async t => {
    document.body.innerHTML += `
        <password-field
            class="test-id"
            id="my-password"
        ></password-field>
    `

    const el = await waitFor('password-field.test-id')
    const input = el?.querySelector('input')

    t.ok(input, 'should have an inner input')
    t.equal(
        input?.getAttribute('id'),
        'my-password',
        'inner input should have the id attribute'
    )
    t.equal(
        el?.hasAttribute('id'),
        false,
        'outer element should not have the id'
    )
})

test('aria-label is on inner input, not outer element', async t => {
    document.body.innerHTML += `
        <password-field
            class="test-aria-label"
            aria-label="Enter your password"
        ></password-field>
    `

    const el = await waitFor(
        'password-field.test-aria-label'
    )
    const input = el?.querySelector('input')

    t.ok(input, 'should have an inner input')
    t.equal(
        input?.getAttribute('aria-label'),
        'Enter your password',
        'inner input should have aria-label'
    )
    t.equal(
        el?.hasAttribute('aria-label'),
        false,
        'outer element should not have aria-label'
    )
})

test('aria-describedby is on inner input', async t => {
    document.body.innerHTML += `
        <span id="pw-help">Must be 8 characters</span>
        <password-field
            class="test-aria-describedby"
            aria-describedby="pw-help"
        ></password-field>
    `

    const el = await waitFor(
        'password-field.test-aria-describedby'
    )
    const input = el?.querySelector('input')

    t.ok(input, 'should have an inner input')
    t.equal(
        input?.getAttribute('aria-describedby'),
        'pw-help',
        'inner input should have aria-describedby'
    )
    t.equal(
        el?.hasAttribute('aria-describedby'),
        false,
        'outer element should not have aria-describedby'
    )
})

test('aria-required is on inner input', async t => {
    document.body.innerHTML += `
        <password-field
            class="test-aria-required"
            aria-required="true"
        ></password-field>
    `

    const el = await waitFor(
        'password-field.test-aria-required'
    )
    const input = el?.querySelector('input')

    t.ok(input, 'should have an inner input')
    t.equal(
        input?.getAttribute('aria-required'),
        'true',
        'inner input should have aria-required'
    )
    t.equal(
        el?.hasAttribute('aria-required'),
        false,
        'outer element should not have aria-required'
    )
})

test('all done', () => {
    if (window) {
        // @ts-expect-error tests
        window.testsFinished = true
    }
})
