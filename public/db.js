var dbPromised = idb.open("competitions", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorite")) {
        upgradeDb.createObjectStore("favorite", { keyPath: "ID" });
    }
})


function addFav(id, name, img) {
    dbPromised.then(function(db) {
        var tx = db.transaction("favorite", "readwrite")
        var store = tx.objectStore("favorite")
        var data = {
            ID: id,
            name: name,
            img: img
        }
        store.add(data)
        return tx.complete
    }).then(function() {
        M.toast({ html: 'Selamat!tim kamu sudah terdaftar di favorite' })
    })
}

function delFav(id) {
    dbPromised.then(function(db) {
        var tx = db.transaction("favorite", "readwrite")
        var store = tx.objectStore("favorite")
        store.delete(id)
        return tx.complete
    }).then(function() {
        M.toast({ html: 'Ah, tim favorite kamu telah dihapus ' })
        location.reload();
    })
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("favorite", "readonly")
                var store = tx.objectStore("favorite")
                return store.getAll()
            })
            .then(function(teams) {
                resolve(teams)
            })
    })
}

function isFav(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("teams", "readonly")
                var store = tx.objectStore("teams")
                return store.get(id)
            }).then(function(team) {
                if (team != undefined) resolve("true")
                else reject("false")
            })
    })
}