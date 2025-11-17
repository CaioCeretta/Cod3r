export default class SenhaHash {
    constructor(readonly hash: string) {
        const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/
        if (!hash) {
            throw new Error("A senha informada não é um hash válido.")
        }
        if (!hash.match(regex)) {
            throw new Error("A senha informada não é um hash válido.")
        }
    }
}
