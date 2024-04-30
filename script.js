const input=document.querySelector("input");
const Search=document.querySelector("button");
const images=document.querySelector(".images");
let nextpage=1;
let total_page=5;

async function Search_Images(input_data){
   
    try{
    const response=await fetch(`https://api.unsplash.com/search/photos?client_id=tx34PiRZzp93-OoWeUZIbDD6e48QKr9utNKzmmbzWFU&query=${input_data}&page=1&per_page=12`);
    const data=await response.json();
    const results=await data.results;
    images.innerHTML="";

    results.forEach(element => {

        let div1=document.createElement("div");
        div1.classList.add("imagediv");
        let img=document.createElement("img")
        img.src=element.urls.thumb;
        let p=document.createElement("p");
        p.innerText=element.alt_description;
        div1.append(img,p);

        let div2=document.createElement("div");
        div2.classList.add("buttondiv");

        let btn1=document.createElement("button");
        btn1.classList.add("hoverbutton");
        btn1.innerText="Download"
        btn1.addEventListener("click",()=>{
            downloadImage(results.urls.full);
        });

        let btn2=document.createElement("button");
        btn2.classList.add("hoverbutton");
        btn2.innerText="Know more"
        btn2.addEventListener("click",()=>{
            window.open(element.links.html);
        });
        
        div2.append(btn1,btn2);
        div1.append(div2);
        images.append(div1);

        div1.addEventListener("mouseenter", () => {
            div1.classList.add("hovered"); 
        });
        div1.addEventListener("mouseleave", () => {
            div1.classList.remove("hovered"); 
        });

    });


    if (total_page > nextpage) {
        
        const loadMoreButton = document.createElement("button");
        loadMoreButton.innerText = "Load More";
        loadMoreButton.addEventListener("click", () => {
            nextpage++;
            Search_Images(input_data);
        });
        images.appendChild(loadMoreButton);
    }
    }catch(error){
       console.log(error);   
    }
    
}

Search.addEventListener("click",(e)=>{
    e.preventDefault()
    let input_data=input.value;
    Search_Images(input_data);
    loadmore=true;
});
function downloadImage(imageUrl) {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.setAttribute('download', ''); 
    link.click(); 
}
