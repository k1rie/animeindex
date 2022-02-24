const search = document.querySelector(".search__container");

const searchinput = document.querySelector(".search__input");

const main = document.querySelector(".main__container")

var focus = false;

search.addEventListener("mouseover", () => {
  search.style.width = "250px";
  search.style.height = "40px";
  search.style.borderRadius = "10px";
  search.style.justifyContent = "space-between";
  searchinput.style.width = "80%";
  searchinput.style.height = "80%";
  searchinput.style.display = "inline-block";
});

search.addEventListener("mouseout", () => {
  if (searchinput.value.length > 0 || focus == true) {
  } else {
    search.style.width = "50px";
    search.style.height = "50px";
    search.style.borderRadius = "100%";
    search.style.justifyContent = "center";
    searchinput.style.display = "none";
  }
});

searchinput.addEventListener("focus", () => {
  focus = true;
});

searchinput.addEventListener("blur", () => {
  focus = false;
});

searchinput.addEventListener("keyup",(e)=>{
    if(e.key == "Enter"){
        showanimes()
document.querySelectorAll(".cardinfo").forEach((item)=>{
  main.removeChild(item)
})
    }
})

async function showanimes(){
    var info;
    await fetch(`https://api.jikan.moe/v4/anime?q=${searchinput.value}`).then((response)=>response.json()).then((response)=>{console.log(response);info = response})

  info.data.map((item)=>{
    const data = document.createElement("div")
    const link = document.createElement("a")
    const img = document.createElement("img")
    link.href = item.url
    link.target = "_blank"
    img.src = item.images.jpg.image_url
    data.style.width = "250px"
    data.style.height = "250px"
    data.style.borderRadius = "5px"
    img.style.borderRadius = "5px"
    data.style.backgroundColor = "black"
    img.style.width = "100%"
    img.style.height = "100%"
    link.append(img)
    data.append(link)
    main.append(data)
    data.classList = "cardinfo"
    console.log(data)
    data.style.transition = "0.5s all"
    data.addEventListener("mouseover",()=>{
      data.style.transform = "scale(1.2)"
      data.style.zIndex = "100"
    })
    data.addEventListener("mouseout",()=>{
      data.style.transform = "scale(1)"
      data.style.zIndex = "0"
    })
  })
}