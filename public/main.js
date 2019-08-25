document.addEventListener("DOMContentLoaded", function() {
    if ("serviceWorker" in navigator) {
        regSW();

        if ("Notification" in window) {
            requestPermission();
        }
    } else {
        console.log('browser anda belum support service worker')
    }
})

function regSW() {
    navigator.serviceWorker.register("service-worker.js").then(function() {
        console.log('success');
    }, function() {
        console.log('failed');
    })
}

function requestPermission() {
    Notification.requestPermission().then(function(result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }

        console.log("Fitur notifikasi diijinkan.");
    });

    if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.pushManager.subscribe({
                userVisibleOnly: true
            }).then(function(sub) {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))));
            }).catch(function(e) {
                console.error('Tidak dapat melakukan subscribe ', e);
            });
        });
    }
}