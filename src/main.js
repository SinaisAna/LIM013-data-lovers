import datajs from './data.js';
let data = window.rickAndMorty.results;
let capis = window.capRickMorty.results;
let currentPage = 1;
let rows = 40;
const listElement = document.getElementById('alldata');
const paginationElemnent = document.getElementById('pagination');

//Contenidos para el html
const getCharacters = (data) => {
	return `<div class="person">
		<div class="imagenes">
		<img class="photo" src="${data.image}">
		</div>
		<div class="info">
		<h2 class="name">${data.name}</h2>
		<p class="text-datos">Genero: ${data.gender}</p>
		<p class="text-datos">Origen: ${data.origin.name}</p>
		<p class="text-datos">Especie: ${data.species}</p>
		<p class="text-datos">Estado: ${data.status}</p>
		</div>
		</div>`
}

//Funciones de la paginación
const displayList = (items, wrapper, rows_per_page, page) => {

	wrapper.innerHTML = '<h1 class="app-title">Total de Personajes(' + items.length + ')</h1>';
	page--;
	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginationItems = items.slice(start, end);

	for (let i = 0; i < paginationItems.length; i++) {
		let item = paginationItems[i];

		let itemElement = document.createElement('div');
		itemElement.innerText = item.name;

		wrapper.innerHTML += getCharacters(item);
	}
}

const paginationbuttons = (page, items) => {
	const buttons = document.createElement('button');
	buttons.innerText = page;

	if (currentPage == page) buttons.classList.add('active');

	buttons.addEventListener('click', function () {
		currentPage = page;
		displayList(items, listElement, rows, currentPage);
		let currentBtn = document.querySelector('.pagenumbers button.active');
		currentBtn.classList.remove('active');
		buttons.classList.add('active');
	});
	return buttons;
}

const setupagination = (items, wrapper, rows_per_page) => {
	wrapper.innerHTML = "";

	let pageCount = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < pageCount + 1; i++) {
		let btns = paginationbuttons(i, items);
		wrapper.appendChild(btns);
	}
}

const videoI = document.getElementById("video-f");
videoI.autoplay = true
videoI.load();

//Funciones de botón de inicio
const welcome = () => {
	document.querySelector('#conter').classList.add("ocultar");
	document.querySelector('#contenido').classList.remove("ocultar");
	document.querySelector('#container-header').classList.remove("ocultar");
	document.querySelector('#content-footer').classList.remove("ocultar");
	document.querySelector('#ctn-bars-search').classList.remove("ocultar");
	videoI.autoplay = false
	videoI.load();

	displayList(data, listElement, rows, currentPage);
	setupagination(data, paginationElemnent, rows);
}

const btnIntro = document.getElementById("btnIntro")
const btnIngresar = document.createElement("button");
btnIngresar.textContent = "Comenzar";
btnIngresar.addEventListener("click", welcome);
btnIntro.appendChild(btnIngresar);

//Funciónes de barra de navegación-menu
const menuOpen = document.getElementById('menu-toggle');

const changeClass = () => {
	const siteNav = document.getElementById('menu');
	siteNav.classList.toggle('menu-open');
	menuOpen.classList.toggle('menu-open');
}

menuOpen.addEventListener("click", changeClass);

//Función de los boton de de filtro e inputs de radio para desactivar
const resetRadioButtons = (groupName) => {
	const arRadioBtn = document.getElementsByName(groupName);
	for (let i = 0; i < arRadioBtn.length; i++) {
		let radButton = arRadioBtn[i];
		radButton.checked = false;
	}
}

const botonTodos = () => {
	welcome();
	document.querySelector('#content-cb').classList.add("ocultar");
	resetRadioButtons("esp");
	resetRadioButtons("orig");
	resetRadioButtons("gener");
	resetRadioButtons("estd");
}
const btnTodos = document.getElementById("btn-todos")
btnTodos.addEventListener("click", botonTodos);

const botonTodosM = () => {
	welcome();
	document.querySelector('#my_modal').classList.add("ocultar");
	resetRadioButtons("esp");
	resetRadioButtons("orig");
	resetRadioButtons("gener");
	resetRadioButtons("estd");
}
const btnTodosM = document.getElementById("btn-todos-m")
btnTodosM.addEventListener("click", botonTodosM);

const checkboxE = () => {
	document.querySelector('#content-cb').classList.remove("ocultar");
	document.querySelector('#especies').classList.remove("ocultar");
	document.querySelector('#origen').classList.add("ocultar");
	document.querySelector('#genero').classList.add("ocultar");
	document.querySelector('#estado').classList.add("ocultar");
	resetRadioButtons("orig");
	resetRadioButtons("gener");
	resetRadioButtons("estd");
}
const btnEspecies = document.getElementById("btn-especies")
btnEspecies.addEventListener("click", checkboxE);

const checkboxO = () => {
	document.querySelector('#content-cb').classList.remove("ocultar");
	document.querySelector('#origen').classList.remove("ocultar");
	document.querySelector('#especies').classList.add("ocultar");
	document.querySelector('#genero').classList.add("ocultar");
	document.querySelector('#estado').classList.add("ocultar");
	resetRadioButtons("esp");
	resetRadioButtons("gener");
	resetRadioButtons("estd");
}
const btnOrigen = document.getElementById("btn-origen")
btnOrigen.addEventListener("click", checkboxO);

const checkboxG = () => {
	document.querySelector('#content-cb').classList.remove("ocultar");
	document.querySelector('#genero').classList.remove("ocultar");
	document.querySelector('#especies').classList.add("ocultar");
	document.querySelector('#origen').classList.add("ocultar");
	document.querySelector('#estado').classList.add("ocultar");
	resetRadioButtons("esp");
	resetRadioButtons("orig");
	resetRadioButtons("estd");
}
const btnGenero = document.getElementById("btn-genero")
btnGenero.addEventListener("click", checkboxG);

const checkboxEs = () => {
	document.querySelector('#content-cb').classList.remove("ocultar");
	document.querySelector('#estado').classList.remove("ocultar");
	document.querySelector('#especies').classList.add("ocultar");
	document.querySelector('#origen').classList.add("ocultar");
	document.querySelector('#genero').classList.add("ocultar");
	resetRadioButtons("esp");
	resetRadioButtons("orig");
	resetRadioButtons("gener");
}
const btnEstado = document.getElementById("btn-estado")
btnEstado.addEventListener("click", checkboxEs);

//Filtro de data
const botonesFiltros = document.querySelector("#content-cb").children;
const contentUl = document.getElementById("content-cb");
const inputName = contentUl.getElementsByTagName("input");
const btnF = () => {
	for (let i = 0; i < inputName.length; i++) {
		if (inputName[i].checked == true) {
			const ninputNombre = inputName[i].name
			const inputValor = inputName[i].getAttribute("value");
			const filtroData = datajs.filterSpecies(data, ninputNombre, inputValor);
			displayList(filtroData, listElement, rows, currentPage);
			setupagination(filtroData, paginationElemnent, rows);
		}
	}
}

for (let i = 0; i < botonesFiltros.length; i++) {
	const inputsFiltros = botonesFiltros[i].children;
	for (let j = 0; j < inputsFiltros.length; j++) {
		inputsFiltros[j].addEventListener("click", btnF);
	}
}

const contentUlM = document.getElementById("accordions");
const inputNameM = contentUlM.getElementsByTagName("input");
const btnFM = () => {
	for (let i = 0; i < inputNameM.length; i++) {
		if (inputNameM[i].checked == true) {
			const ninputNombreM = inputNameM[i].name
			const inputValorM = inputNameM[i].getAttribute("value");
			const filtroDataM = datajs.filterSpecies(data, ninputNombreM, inputValorM);
			displayList(filtroDataM, listElement, rows, currentPage);
			setupagination(filtroDataM, paginationElemnent, rows);
			document.querySelector('#my_modal').classList.add("ocultar");
		}
	}

}

for (let i = 0; i < inputNameM.length; i++) {
	inputNameM[i].addEventListener("click", btnFM);
}

//Función de buscar
const contenBus = document.getElementById('ctn-bars-search');
const coverBus = document.getElementById("cover-ctn-search");
const inputSeatch = document.getElementById('inputSeatch');

const sampleSearch = () => {

	contenBus.style.top = "80px";
	coverBus.style.display = "block";
	inputSeatch.focus();
}
document.getElementById("ctn-icon-search").addEventListener("click", sampleSearch);

const hideSearch = () => {
	contenBus.style.top = "-10px";
	coverBus.style.display = "none";
	inputSeatch.value = " ";
}
document.getElementById("cover-ctn-search").addEventListener("click", hideSearch);

const exit2 = () => {
	contenBus.style.top = "-10px";
	coverBus.style.display = "none";
	inputSeatch.value = " ";
}

document.getElementById("exit").addEventListener("click", exit2);

//motor de buscador principal
const mainSearchEngine = () => {
	let texto = document.getElementById('inputSeatch');
	texto = texto.value.replace(/ /g, "");

	if (texto != "") {
		let textoMin = texto.toLowerCase();
		let filternames = datajs.filterName(data, textoMin);
		displayList(filternames, listElement, rows, currentPage);
		setupagination(filternames, paginationElemnent, rows);
		hideSearch()
	}
}

document.getElementById("local").addEventListener("click", mainSearchEngine);

const enters = () => {
	let teclaEsc = event.keyCode;
	if (teclaEsc == 13) {
		return mainSearchEngine() && hideSearch();
	}
}

window.onkeydown = enters;

// Función de ordenar
const btnOrder = document.getElementById("orden")
const funcionLetras = document.getElementById("letritas");

const letras = () => {
	if (funcionLetras.classList.contains("ocultar")) {
		funcionLetras.classList.remove("ocultar");
	} else {
		funcionLetras.classList.add("ocultar");
	}
}

btnOrder.addEventListener("click", letras);

const acenA_Z = () => {
	datajs.nameA_Z(data);
	document.getElementById('alldata').innerHTML = " ";
	displayList(data, listElement, rows, currentPage);
	setupagination(data, paginationElemnent, rows);
	btnF(displayList, setupagination);
	btnFM(displayList, setupagination);
	document.querySelector('#letritas').classList.add("ocultar");
}

document.getElementById("bos-1").addEventListener("click", acenA_Z);

const acenZ_A = () => {
	datajs.nameZ_A(data);
	document.getElementById('alldata').innerHTML = " ";
	displayList(data, listElement, rows, currentPage);
	setupagination(data, paginationElemnent, rows);
	btnF(displayList, setupagination);
	btnFM(displayList, setupagination);
	document.querySelector('#letritas').classList.add("ocultar");
}

document.getElementById("bos-2").addEventListener("click", acenZ_A);

//Funciones del modal de filtros mobile
const modalAdd = () => {
	document.querySelector('#my_modal').classList.remove("ocultar");
}
const btnFilterM = document.getElementById("content-filtro-m")
btnFilterM.addEventListener("click", modalAdd);

const closeModal = () => {
	document.querySelector('#my_modal').classList.add("ocultar");
}
const closeFilter = document.getElementById("close");
closeFilter.addEventListener("click", closeModal);


const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

//Funciones del acordeón
accordionItemHeaders.forEach(accordionItemHeader => {
	accordionItemHeader.addEventListener("click", function () {
		const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
		if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
			currentlyActiveAccordionItemHeader.classList.toggle("active");
			currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
		}

		accordionItemHeader.classList.toggle("active");
		const accordionItemBody = accordionItemHeader.nextElementSibling;
		if (accordionItemHeader.classList.contains("active")) {
			accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
		}
		else {
			accordionItemBody.style.maxHeight = 0;
		}
		resetRadioButtons("esp");
		resetRadioButtons("orig");
		resetRadioButtons("gener");
		resetRadioButtons("estd");
	});
});
//mostrando capitulos
const sampleChapters = (capis, idImagen) => {
	let salida = `<div class ="retrato">
	<div class="imas">
	<img src="imagen/`+ idImagen + `.png">
	</div>
	<div class="content-info">
	<p class="text-cap">Nombre: ${capis.name}</p>
	<p class="text-cap">Fecha: ${capis.air_date}</p>
	<p class="text-cap">Episodio: ${capis.episode}</p>
	<div>`;
	for (let i = 0; i < capis.characters.length; i++) {
		salida += `
		<img class="photopar" src="${data[capis.characters[i]].image}">`
	}

	salida += `</div></div>`;
	return salida;
}

const chapter = () => {
	document.getElementById('icon-menu').classList.add('ocultar');
	document.getElementById('capitulos').classList.add('menu-active');
	document.getElementById('conteni').classList.remove('menu-active');
	document.getElementById('nosotras').classList.remove('menu-active');
	document.getElementById('contenido').classList.add('ocultar');
	document.getElementById('credito').classList.add('ocultar');
	document.getElementById('capi').classList.remove('ocultar');
	changeClass();
	for (let i = 0; i < capis.length; i++) {
		document.getElementById("data-capitulos").innerHTML += sampleChapters(capis[i], i + 1);
	}

}

document.getElementById("capitulos").addEventListener("click", chapter);

const backMain = () => {
	document.getElementById('icon-menu').classList.remove('ocultar');
	document.getElementById('conteni').classList.add('menu-active');
	document.getElementById('capitulos').classList.remove('menu-active');
	document.getElementById('nosotras').classList.remove('menu-active');
	document.getElementById('contenido').classList.remove('ocultar');
	document.getElementById('capi').classList.add('ocultar');
	document.getElementById('credito').classList.add('ocultar');
	changeClass();
}

document.getElementById("conteni").addEventListener("click", backMain);


const credits = () => {
	document.getElementById('icon-menu').classList.add('ocultar');
	document.getElementById('conteni').classList.remove('menu-active');
	document.getElementById('capitulos').classList.remove('menu-active');
	document.getElementById('nosotras').classList.add('menu-active');
	document.getElementById('contenido').classList.add('ocultar');
	document.getElementById('capi').classList.add('ocultar');
	document.getElementById('credito').classList.remove('ocultar');
	changeClass();

}
document.getElementById('nosotras').addEventListener("click", credits);

