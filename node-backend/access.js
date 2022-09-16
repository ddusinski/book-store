const ROLE = {
    ADMIN: "admin",
    BASIC: "basic"
}

module.exports = {
    ROLE: ROLE,
    users: [
        { id: 1, name: "Krzys", role: ROLE.BASIC },
        { id: 2, name: "dd", role: ROLE.ADMIN },
    ],
    projects: [
        { id: 1, name: "Book", userId: 2 },
        { id: 1, name: "Store", userId: 1 },
    ]
}