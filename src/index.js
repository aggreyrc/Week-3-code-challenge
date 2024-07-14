document.addEventListener("DOMContentLoaded", () => {
    const movieContainer = document.querySelector(".poster");

    function renderFirstMovie(){
        fetch("http://localhost:3000/films/1")
        .then(function(response) {
            return response.json()
        })
        .then(function(film) {
            const imageElement = document.createElement("img");
            imageElement.src = film.poster;
            movieContainer.appendChild(imageElement);

            //Create and append the Title
            const titleElement = document.createElement("h2");
            titleElement.textContent = film.title;
            movieContainer.appendChild(titleElement);

            //create and append runtime
            const runtimeElement = document.createElement("p");
            runtimeElement.textContent = `Runtime: ${film.runtime} minutes`;
            movieContainer.appendChild(runtimeElement);

            //calculate and append available tickets
            let availableTickets = film.capacity - film.tickets_sold;
            const ticketsElement = document.createElement("p");
            ticketsElement.textContent = `Available tickets: ${availableTickets}`;
            movieContainer.appendChild(ticketsElement);

            // Adding Event Listeners
            const buyBtn=document.querySelector("button")
            buyBtn.addEventListener("click", function(){
                if(availableTickets > 0){
                    film.tickets_sold++;
                    availableTickets--;
                    ticketsElement.textContent = `Available tickets: ${availableTickets}`;
                    alert("Ticket purchased successfully!");
                }else{
                    buyBtn.disabled = true;
                    buyBtn.style.backgroundColor = "gray"
                    buyBtn.textContent = "Sold Out"
                    alert("Tickets Sold Out!")
                }
            })

            console.log(film);

            
        })
        .catch(function(error) {
            console.error("Error:", error);
            movieContainer.textContent = "Error fetching movie data";
        })


        //Getting and creating Menu elements
        const menuContainer = document.querySelector("#films")
        function renderFilms(){
            fetch("http://localhost:3000/films")
            .then(function(response) {
                return response.json()
            })
            .then(function(films) {
                films.forEach(film => {
                    const linkElement = document.createElement("li");
                    linkElement.className = "film item";
                    linkElement.textContent = film.title;
                    menuContainer.appendChild(linkElement);
                });
            })
            .catch(function(error) {
                console.error("Error:", error);
                menuContainer.textContent = "Error fetching film data";
            })
        }
        renderFilms()
    }

    function initialize(){
        renderFirstMovie()
    }
    initialize()
})
