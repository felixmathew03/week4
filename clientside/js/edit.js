const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let picture;
let banner;
async function getMovie() {
    const res=await fetch(`http://localhost:3000/api/getmovie/${id}`);
    const movie=await res.json();
    
    picture=movie.picture;
    banner=movie.banner
    document.getElementById("frm").innerHTML=`
    <div class="main">
    <div class="left"> 
    <label for="title">Movie Title:</label>
            <input type="text" id="title" name="title" value="${movie.title}">

            <label for="duration">Duration (in minutes):</label>
            <input type="number" id="duration" name="duration" value="${movie.duration}">

            <label for="genre">Genre:</label>
            <input type="text" id="genre" name="genre" value="${movie.genre}">

            <label for="release-date">Release Date:</label>
            <input type="date" id="releaseDate" name="releaseDate" value="${movie.releaseDate}">
            <label for="language">Language:</label>
            <input type="text" id="language" name="language" value="${movie.language}">
            
            <label for="format">Format:</label>
            <input type="text" id="format" name="format" value="${movie.format}">
            
            <label for="certification">Certification:</label>
            <select id="certification" name="certification" value="${movie.certification}">
            <option value="${movie.certification}">${movie.certification}</option>
            <option value="U">U</option>
            <option value="UA">UA</option>
            <option value="A">A</option>
            <option value="S">S</option>
            </select>
            </div>
                    <div class="right">
            
            <label for="picture">Picture:</label>
            <input type="file" id="picture" name="picture" onchange="pic('picture')">
            <div id="picture1">
                <img src="${picture}" alt="" id="picture2">
            </div>
            <label for="banner">Banner:</label>
            <input type="file" id="banner" name="banner" onchange="pic('banner')">
            <div id="picture3">
                <img src="${banner}" alt="" id="picture4">
            </div>
        </div>
    </div>
    <div class="foot">
            <button type="submit">Submit</button>
    </div>
    `;
}
getMovie();

document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
        const title=document.getElementById("title").value;
    const duration=parseInt(document.getElementById("duration").value);
    const genre=document.getElementById("genre").value;
    const releaseDate=document.getElementById("releaseDate").value;
    const language=document.getElementById("language").value;
    const format=document.getElementById("format").value;
    const certification=document.getElementById("certification").value;
    const res=await fetch(`http://localhost:3000/api/editmovie/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,duration,genre,releaseDate,language,format,certification,picture,banner})
    })
    if(res.status==201){
        alert("Updated")
        window.location.href="../pages/movies.html"
    }
    else if(res.status==404){
        const data=await res.json();
        console.log(data);
        
    }
    else{
        alert("error")
    }
    } catch (error) {
        console.log(error);
        
    }
})

async function pic(c){
    console.log(c);
    if(c=="picture"){
        picture=await convertToBase64(document.getElementById("picture").files[0]);   
        document.getElementById("picture2").src=picture;
    }else{
        banner=await convertToBase64(document.getElementById("banner").files[0]);
        document.getElementById("picture4").src=banner;

    }

}
function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);   
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
}