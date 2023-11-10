

let loadJson = async () => {

    let URL_JSON = 'https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-images.json';

    let responseObject = await fetch(URL_JSON);
    let responseJSON = await responseObject.json();

    console.log(responseJSON);
    return responseJSON;    

}


//Cargar archivo XML
let parseXML = async (responseText) => {

  // Parsing XML
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");

  console.log(xml)

  let booksArr = xml.querySelectorAll("book");

  return booksArr;
}

//carga imagenes por el isbn
let loadImage = (isbn, arrayJson) => {

  let imageUrl = "";  // Variable para almacenar la URL de la imagen

  arrayJson.forEach((book) => {

    if (book.ISBN == isbn) {
      imageUrl = book["Image-URL-M"];
    }
  });

  return imageUrl;
}

//combina info con imagenes de los libros
let loadBooks = async () => {

  let imagesArray = await loadJson(); // arreglo de imagenes 

  let URL_XML = 'https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-books.xml';

  let responseObject = await fetch(URL_XML);
  let responseText = await responseObject.text();

  let infoArray = await parseXML(responseText); //arreglo de libros con info

  //Cargo la información del XML
  let postsElement = document.querySelector("#library");
  postsElement.innerHTML = '';

  infoArray.forEach( (book) => {

    let book_author = book.querySelector("Book-Author").textContent;
    let year_publication = book.querySelector("Year-Of-Publication").textContent;
    let book_title = book.querySelector("Book-Title").textContent;
    let url_image = loadImage(book.querySelector("ISBN").textContent, imagesArray);

    console.log(book.querySelector("ISBN").textContent);
    console.log(url_image);

    let template = `
    <div class="col-lg-2 mb-2 text-center">
    <div class="card border-0 rounded-0">
      <div class="card-image">
        <img src="${url_image}" alt="blog-img" class="img-fluid">
      </div>
    </div>
    <div class="card-body text-capitalize">
      <div class="card-meta fs-6">
        <span class="meta-date">${book_author}</span>
        <span class="meta-category">/ <a href="blog.html">${year_publication}</a></span>
      </div>
      <h4 class="card-title">
        <a href="buy.html">${book_title}</a>
      </h4>
    </div>
    </div>
    `
    postsElement.innerHTML += template;

  })

}

loadBooks();

