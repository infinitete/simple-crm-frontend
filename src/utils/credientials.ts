import { decrypt, encrypt } from './encrypt';

interface ILogged { isLogin: boolean }

function save(logged: ILogged) {
    window.sessionStorage.setItem("credentials", encrypt(JSON.stringify(logged)));
}

function check(): boolean {
    const encrypted = window.sessionStorage.getItem("credentials");

    if (encrypted == null) {
        return false
    }

    const logged: ILogged = JSON.parse(decrypt(encrypted))

    return logged.isLogin
}

async function iRequest(request: Request) {
    const response = await fetch(request)
    const json = await response.json()

    if (json.code === 401) {
        return window.location.replace("#/login")
    }

    window.console.log(json)

    return json;
}

export { check, save, iRequest }