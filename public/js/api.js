const team_api = "https://api.football-data.org/v2/competitions/2014/teams"
const api_key = "6b8b90a5f28d4bb9a32747f22d9e5a6a"
const jadwal = "https://api.football-data.org/v2/competitions/2014/matches"

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeamList() {
    if ('caches' in window) {
        caches.match(team_api).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var teamItem = "";
                    data.teams.forEach(function(team) {
                        teamItem += `            
                                    
                        <div class="card" style="width: 30rem;" >
                            <div class="row valign-wrapper">
                                <div class="col sm-6">
                                    <img src="${team.crestUrl}" alt="" class="rounded responsive-img">
                                </div> 
                                <div class="col sm-6">
                                    <span class="black-text">
                                        ${team.name}
                                    </span>
                                </div>
                                <a href="#" class="btn btn-primary">Favorite</a>
                            </div>
                        </div>
                    
                            `
                        document.getElementById("team").innerHTML = teamItem;
                    })
                })
            }
        })
    }
    fetch(team_api, {
            headers: {
                'X-Auth-Token': api_key
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            var teamItem = "";
            data.teams.forEach(function(team) {
                teamItem += ` 
                                      
                    <div class="card" style="width: 18rem;">
                        <div class="row valign-wrapper">
                            <div class="col sm-6">
                                <img src="${team.crestUrl}" alt="" class="rounded responsive-img">
                            </div> 
                            <div class="col sm-6">
                                <span class="black-text">
                                    ${team.name}
                                </span>
                            </div> 
                            <button id="save_button" onclick="addFav('${team.id}' , '${team.name}', '${team.crestUrl}')" class="btn btn-primary">Favorite</button>   
                        </div>
                    </div>
                
                            `
                document.getElementById("team").innerHTML = teamItem
            })
        })
}

function getSavedTeams() {
    getAll().then(function(teams) {
        var teamHTML = ""
        teams.forEach(function(team) {
            teamHTML += `    
        <div class="card" style="width: 18rem;">
            <div class="row valign-wrapper">
              <div class="col sm-6">
                <img src="${team.img}" alt="" class="rounded responsive-img">
              </div>
              <div class="col s6">
                <span class="black-text">
                  ${team.name}
                </span>
                <button onclick="delFav('${team.ID}')" class="btn btn-primary">Delete</button>
              </div>
            </div>
        </div>
        `
            document.getElementById("team").innerHTML = teamHTML
        })
    })
}

function getJadwal() {
    if ("caches" in window) {
        caches.match(jadwal).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var schedule = "";
                    data.matches.forEach(function(match) {
                        schedule += `
                        <div class="card" style="width: 18rem;">
                            <div class="row valign-wrapper"><b>${match.homeTeam.name} vs ${match.awayTeam.name}</b></div>
                            <div class="row valign-wrapper"><b>Tanggal :</b> ${match.utcDate.split("T")[0]}</div>
                            <div class="row valign-wrapper"><b>pukul : </b> ${match.utcDate.split("T")[1].slice(0, 5)}</div>
                        </div>
                            `
                        document.getElementById("listjadwal").innerHTML = schedule;
                    })
                })
            }
        })
    }
    fetch(jadwal, {
            headers: {
                'X-Auth-Token': api_key
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            var schedule = "";
            data.matches.forEach(function(match) {

                schedule += `
                    <div class="card" style="width: 18rem;">
                        <div class="row valign-wrapper"><b>${match.homeTeam.name} vs ${match.awayTeam.name}</b></div>
                        <div class="row valign-wrapper"><b>Tanggal : </b> ${match.utcDate.split("T")[0]}</div>
                        <div class="row valign-wrapper"><b>pukul : </b> ${match.utcDate.split("T")[1].slice(0, 5)}</div>
                    </div>
                
                        `
                document.getElementById("listjadwal").innerHTML = schedule;
            })
        })
}