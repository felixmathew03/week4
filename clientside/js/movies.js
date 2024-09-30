async function getMovies() {
    const res=await fetch("http://localhost:3000/api/getmovies");
    const movies=await res.json();
    str=``;
    movies.map((movie)=>{
        str+=`
        <div class="movie">
            <a href="./movie.html?id=${movie._id}">
            <div class="mimg">
                        <img src="${movie.picture}" alt="">
                    </div>
                    <h3>${movie.title.substring(0, 25)}</h3>
                    <p>${movie.certification}</p>
                    <p>${movie.language.substring(0, 36)}</p>
            </a>
                    
        </div>
        `
    });
    document.getElementById("movies").innerHTML=str;
}
getMovies();

document.getElementById("filter").addEventListener('keyup',async(e)=>{
    try {
        const res=await fetch("http://localhost:3000/api/getmovies");
        const movies=await res.json();
        str=``;
        movies.filter((i)=>i.title.toLowerCase().includes(e.target.value.toLowerCase())).map((movie)=>{
            str+=`
            <div class="movie">
                <a href="./movie.html?id=${movie._id}">
                <div class="mimg">
                            <img src="${movie.picture}" alt="">
                        </div>
                        <h3>${movie.title.substring(0, 25)}</h3>
                        <p>${movie.certification}</p>
                        <p>${movie.language.substring(0, 36)}</p>
                </a>
                        
            </div>
            `
        });
        document.getElementById("movies").innerHTML=str;
    } catch (error) {
        console.log(error);
    }
})

  