const btnAcao = document.getElementById('pesquisar');
const btnLimpar = document.getElementById('limpar');
const btnVisualizar = document.getElementById('visualizar');
const inputURL = document.getElementById('url');
const inputResultado = document.getElementById('resultado');
let urls = [];

btnAcao.addEventListener('click', function () {
	pesquisar();
});

btnLimpar.addEventListener('click', function () {
	excluirHistorico();
});

inputURL.addEventListener('keypress', function(e){
	if(e.keyCode === 13) {
		pesquisar();
	}
});

btnVisualizar.addEventListener('click', function () {
	mostraSitesEncontados();
});
	
function pesquisar() {
	urls = [];
	cleanLinks();
	browser.history.search({text: inputURL.value}).then(resultado => {
		resultado.forEach(site => {
			urls.push(site.url);
		});
		inputResultado.value = urls.length;
		if(urls.length > 0) {
			btnLimpar.removeAttribute('disabled');
		} else {
			btnLimpar.setAttribute('disabled', 'disabled');
		}
	});
}

function procesar() {
	urls = [];
	cleanLinks();
	inputResultado.value = urls.length;
	if(urls.length > 0) {
		btnLimpar.removeAttribute('disabled');
	} else {
		btnLimpar.setAttribute('disabled', 'disabled');
	}
}

function excluirHistorico() {
	urls.forEach(url => {
		deleteSite(url);
	});
}

function mostraSitesEncontados() {
	cleanLinks();
	const ul = document.getElementById('links');
	
	urls.forEach(url => {
		let li = document.createElement('li');
		li.textContent = maxLength(url);
		li.classList.add('list-group-item');
		ul.appendChild(li);
	});
}

function cleanLinks() {
	const ul = document.getElementById('links');
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
}

function deleteSite(url) {
	browser.history.deleteUrl({url: url}).then(() => procesar());
}

function maxLength(line) {
	if(line && line.length > 49) {
		return `${line.substring(0, 49)}...`;
	}
	return line;
}