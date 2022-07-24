async function recebeInput(e) {
    let busca = document.getElementById("search").value;
    try {
        const response = await fetch(`https://api.github.com/orgs/${busca}/repos`);
        sessionStorage.setItem("saveData", JSON.stringify(await response.json()));
    }
    catch (err) {
        console.log('Erro na requisição', err);
    }

    window.location.href = "results.html"
}

function fazGet(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function criaLinha(repo) {
    linha = document.createElement("tr");
    tdName = document.createElement("td");
    tdDesc = document.createElement("td");

    tdName.innerHTML = repo.name;
    tdDesc.innerHTML = repo.description;

    linha.appendChild(tdName);
    linha.appendChild(tdDesc);

    return linha;
}

function main() {
    let repos = JSON.parse(sessionStorage.getItem("saveData"));

    let tabelas = document.getElementById("tabela")

    repos.forEach(element => {
        let linha = criaLinha(element)
        tabelas.appendChild(linha);
    })
}

function filtrar(string) {
    tabelas = document.getElementsByTagName("table")[0];
    linhas = tabela.getElementsByTagName("tr");
    for (let r = 0; r < linhas.length; r++) {
        dados = linhas[r].getElementsByTagName("td");
        let filtrei = false;
        for (let d = 0; d < dados.length; d++) {
            if (dados[d].innerText.indexOf(string) >= 0) {
                filtrei = true;
                break;
            }
        }
        if (filtrei == true) {
            linhas[r].style.display = "";
        } else {
            linhas[r].style.display = "none";
        }
    }
}