
let loadJson = async () => {
  let URL_JSON =
    "https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-images.json";

  let responseObject = await fetch(URL_JSON);
  let responseJSON = await responseObject.json();

  return responseJSON;

};

//Cargar archivo XML
let parseXML = async (responseText) => {
  // Parsing XML
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");

  let booksArr = xml.querySelectorAll("book");

  return booksArr;
};

//carga imagenes por el isbn
let loadImage = (isbn, arr) => {
  let imageUrl = ""; // Variable para almacenar la URL de la imagen

  arr.forEach((book) => {
    if (book.ISBN == isbn) {
      imageUrl = book["Image-URL-M"];
      return imageUrl;
    }
  });

  return imageUrl;
};

//combina info con imagenes de los libros
let loadBooks = async () => {
  let imgArr = await loadJson();

  let URL_XML =
    "https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-books.xml";

  let responseObject = await fetch(URL_XML);
  let responseText = await responseObject.text();

  let infoArray = await parseXML(responseText);

  let postsElement = document.querySelector("#posts .row");

  // Limpia el contenido actual
  postsElement.innerHTML = "";

  infoArray.forEach((book) => {
    let book_author = book.querySelector("Book-Author").textContent;
    let year_publication = book.querySelector("Year-Of-Publication").textContent;
    let book_title = book.querySelector("Book-Title").textContent;
    let url_image = loadImage(book.querySelector("ISBN").textContent, imgArr);
    let publisher = book.querySelector("Publisher").textContent;

    let template = `
    <div class="book col-lg-2 mb-2 text-center">
      <div class="card border-0 rounded-0">
        <div class="card-image">
          <img src="${url_image}" alt="blog-img" class="img-fluid">
        </div>
      </div>
      <div class="card-body text-capitalize">
        <div class="card-meta fs-6">
          <span class="meta-date">${book_author}</span>
          <span class="meta-category">/ <a href="blog.html">${year_publication}</a></span>
          <span class="meta-date publisher invisible"> ${publisher} </span>
        </div>
        <h4 class="card-title">
          <a href="buy.html">${book_title}</a>
        </h4>
      </div>
    </div>
    `;

    // Agrega el nuevo libro al contenido existente
    postsElement.innerHTML += template;
  });
};

loadBooks();

let button = document.querySelector(".btn");

button.addEventListener("click", async () => {

  let text = document.querySelector("#newsletter1");
  text = text.value.toUpperCase();

  let arrayBooks = document.querySelectorAll(".book");

  if (text == "") {
    arrayBooks.forEach((book) => {
      book.classList.remove('invisible');
    });
    return;
  }

  arrayBooks.forEach((book) => {

    let author = book.querySelector(".meta-date").textContent.toUpperCase().includes(text);
    let year = book.querySelector(".meta-category").querySelector("a").textContent.toUpperCase() == text.toString();
    let title = book.querySelector(".card-title").querySelector("a").textContent.toUpperCase().includes(text);
    let publisher = book.querySelector(".publisher").textContent.toUpperCase().includes(text);


    if (!author && !title && !year && !publisher) {
      //console.log("micara");
      book.classList.add('invisible');
      

    }else{
        book.classList.remove('invisible');
      }
  });
});
