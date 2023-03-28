document.addEventListener("DOMContentLoaded", () => {
   const ul = document.getElementById("quote-list");
   // Fetch data
   fetch("http://localhost:3000/quotes?_embed=likes")
      .then((res) => res.json())
      .then((quotes) => {
         for (let i = 0; i < quotes.length; i++) {
            const li = document.createElement("li.quote-card");
            li.innerHTML = `
              <li class='quote-card'>
              <blockquote class="blockquote">
              <p class="mb-0">${quotes[i].quote}</p>
              <footer class="blockquote-footer">${quotes[i].author}</footer>
              <br>
              <button class='btn-success'>Likes: <span>${quotes[i].likes[0]?.quoteId === undefined ? 0 : quotes[i].likes[0]?.quoteId}</span></button>
              <button class='btn-danger'>Delete</button>
              </blockquote>
              </li>
              `;

            ul.appendChild(li);
            const deleteBtn = document.querySelectorAll(".btn-danger");
            deleteBtn[i].addEventListener("click", () => {
               const parent = deleteBtn[i].parentElement;
               parent.parentElement.remove();
               fetch(`http://localhost:3000/quotes/${i + 1}`, {
                  method: "DELETE",
                  headers: {
                     "Content-Type": "application/json",
                     Accept: "application/json",
                  },
               })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
            });
         }
         //  deleteBtn.forEach((el) =>
         //     el.addEventListener("click", () => {
         //        const grand = el.parentElement;
         //        // grand.parentElement.remove();
         //        deleteQuote();
         //     })
         //  );
      })
      .catch((error) => console.error(error.message));

   //   POST Data
   const form = document.querySelector("form");
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      const quoteObj = {
         quote: e.target.new_quote.value,
         author: e.target.author.value,
      };
      //   const quote = e.target.new_quote.value;
      //   const author = e.target.author.value;
      fetch("http://localhost:3000/quotes", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
         body: JSON.stringify(quoteObj),
      })
         .then((res) => res.json())
         .then((data) => {
            const li = document.createElement("li.quote-card");
            li.innerHTML = `
            <li class='quote-card'>
            <blockquote class="blockquote">
            <p class="mb-0">${data.quote}</p>
            <footer class="blockquote-footer">${data.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${data.likes[0].id}</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>
            </li>
            `;

            ul.appendChild(li);
         })
         .catch((err) => console.error(err.message));
      form.reset();
   });
});
