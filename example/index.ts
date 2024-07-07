import '../src/index.css'
import '../src/index.js'
import './index.css'

document.body.innerHTML += `
    <form>
    <input
        type="text"
        name="email"
        autocomplete="username email"
        style="display: none;"
    />
        <password-field></password-field>
    </form>
`
