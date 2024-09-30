async function getMovies() {
    const res=await fetch("http://localhost:3000/api/getmovies");
    const movies=await res.json();
    console.log(movies);
    str=``;
    movies.map((movie)=>{
        str+=`
        <div class="movie">
            <a href="./movie.html?id=${movie._id}">
            <div class="mimg">
                        <img src="${movie.picture}" alt="">
                    </div>
                    <h3>${movie.title}</h3>
                    <p>${movie.certification}</p>
                    <p>${movie.language}</p>
            </a>
                    
        </div>
        `
    });
    document.getElementById("movies").innerHTML=str;
}
getMovies();



  