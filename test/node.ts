import { test } from '@substrate-system/tapzero'
import { render } from '../src/html.js'

test('render function returns string', t => {
    const result = render()
    t.equal(typeof result, 'string', 'should return a string')
    t.ok(result.includes('<text-input'), 'should contain text-input element')
    t.ok(result.includes('<button'), 'should contain button element')
    t.ok(result.includes('pw-visibility'),
        'should contain visibility button class')
})

test('render with attributes', t => {
    const result = render({
        name: 'password',
        'display-name': 'New Password',
        required: true,
        isVisible: false
    })

    t.equal(typeof result, 'string', 'should return a string')
    t.ok(result.includes('name="password"'), 'should include name attribute')
    t.ok(result.includes('display-name="New Password"'),
        'should include display-name attribute')
    t.ok(result.includes('required'), 'should include required attribute')
    t.ok(result.includes('class="icon eye-regular"'),
        'should show eye-regular icon when not visible')
})

test('render with visible password', t => {
    const result = render({
        name: 'password',
        'display-name': 'Password',
        isVisible: true
    })

    t.equal(typeof result, 'string', 'should return a string')
    t.ok(result.includes('isVisible'), 'should include isVisible attribute')
    t.ok(result.includes('class="icon eye-slash"'),
        'should show eye-slash icon when visible')
})

test('render with various attribute types', t => {
    const result = render({
        name: 'test-password',
        'display-name': 'Test Password',
        required: true,
        autocomplete: 'current-password',
        placeholder: 'Enter password',
        maxlength: 50,
        isVisible: false
    })

    t.equal(typeof result, 'string', 'should return a string')
    t.ok(result.includes('name="test-password"'),
        'should include name attribute')
    t.ok(result.includes('display-name="Test Password"'),
        'should include display-name attribute')
    t.ok(result.includes('required'), 'should include required attribute')
    t.ok(result.includes('autocomplete="current-password"'),
        'should include autocomplete attribute')
    t.ok(result.includes('placeholder="Enter password"'),
        'should include placeholder attribute')
    t.ok(result.includes('maxlength="50"'),
        'should include maxlength attribute')
})

test('render with no attributes', t => {
    const result = render()

    t.equal(typeof result, 'string', 'should return a string')
    t.ok(result.includes('<text-input></text-input>'),
        'should have empty text-input')
    t.ok(result.includes('class="icon eye-regular"'),
        'should default to eye-regular icon')
})

test('render with null/undefined attributes', t => {
    const result = render({
        name: 'password',
        required: null,
        autocomplete: undefined,
        isVisible: false
    })

    t.equal(typeof result, 'string', 'should return a string')
    t.ok(result.includes('name="password"'), 'should include valid attributes')
    t.equal(result.includes('required'), false, 'should not include null attributes')
    t.equal(result.includes('autocomplete'), false,
        'should not include undefined attributes')
})
