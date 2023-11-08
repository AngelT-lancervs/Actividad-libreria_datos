let plantilla = `
<div class="col-lg-2 mb-2 text-center">
  <div class="card border-0 rounded-0">
    <div class="card-image">
      <img src="key:Image-URL-M" alt="blog-img" class="img-fluid">
    </div>
  </div>
  <div class="card-body text-capitalize">
    <div class="card-meta fs-6">
      <span class="meta-date"> <!--tag:Book-Author--> </span>
      <span class="meta-category">/ <a href="blog.html"> <!--tag:Year-Of-Publication--> </a></span>
    </div>
    <h4 class="card-title">
      <a href="buy.html"> <!--tag:Book-Title--> </a>
    </h4>
  </div>
</div>`

let cargarLibrary = () => {

    let URL_JSON = 'https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-images.json';
    let URL_XML = 'https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-books.xml';

    fetch(URL_JSON)
        .then(responseText => responseText.json())
        .then(responseJSON => {

            console.log(responseJSON);


        })

}

let parseXML = (responseText) => {

    // Parsing XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "application/xml");


    // Referencia al elemento `#forecastbody` del documento HTML

    let forecastElement = document.querySelector("#posts")
    forecastElement.innerHTML = ''

    // Procesamiento de los elementos con etiqueta `<book>` del objeto xml
    let booksArr = xml.querySelectorAll("book")

    booksArr.forEach(book => {

        let from = book.getAttribute("from").replace("T", " ");

        let book_author = book.querySelector("Book-Author");
        let year_book = book.querySelector("Year-Of-Publication");
        let book_title = book.querySelector("Book-Title");

        let template = `
        <div class="col-lg-2 mb-2 text-center">
          <div class="card border-0 rounded-0">
            <div class="card-image">
              <img src="key:Image-URL-M" alt="blog-img" class="img-fluid">
            </div>
          </div>
          <div class="card-body text-capitalize">
            <div class="card-meta fs-6">
              <span class="meta-date"> <!--tag:Book-Author--> </span>
              <span class="meta-category">/ <a href="blog.html"> <!--tag:Year-Of-Publication--> </a></span>
            </div>
            <h4 class="card-title">
              <a href="buy.html"> <!--tag:Book-Title--> </a>
            </h4>
          </div>
        </div>`
        

        //Renderizando la plantilla en el elemento HTML
        forecastElement.innerHTML += template;
    })

}

cargarLibrary();

