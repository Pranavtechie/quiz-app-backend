const password = 'thisispassword'

let hash = await Bun.password.hash(password, {
    algorithm: 'bcrypt'
})

console.log(hash)


let verify = await Bun.password.verify(password, hash)
console.log(verify)
console.log(hash.length)