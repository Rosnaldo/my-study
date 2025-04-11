import { MutableRefObject } from "react"

export function makeSelectable(
  {
    refResizable,
    refMain,
    resizer,
  } : {
    refResizable: MutableRefObject<HTMLDivElement | null>,
    refMain: MutableRefObject<HTMLDivElement | null>,
    resizer: HTMLDivElement,
  }
) {
  const obj = { bool: false }

  const child = refResizable.current!.firstElementChild
  const tl = document.createElement("div")
  tl.setAttribute("class","tl")
  const tr = document.createElement("div")
  tr.setAttribute("class","tr")
  const bl = document.createElement("div")
  bl.setAttribute("class", "bl")
  const br = document.createElement("div")
  br.setAttribute("class", "br")

  refResizable.current!.appendChild(resizer)
  
  resizer.appendChild(tl)
  resizer.appendChild(tr)
  resizer.appendChild(bl)
  resizer.appendChild(br)

  const coor = child!.getBoundingClientRect()

  resizer.style.top = `${coor.top}px`
  resizer.style.left = `${coor.left}px`

  resizer.style.width =      
    refMain.current!.getBoundingClientRect().width + "px"

  resizer.style.height =      
    refMain.current!.getBoundingClientRect().height + "px"  

  resizer.querySelectorAll("div").forEach(elem => {
    if(elem.className == "tl") {
      elem.style.left = "-4px"
      elem.style.top = "-4px"
    }
    if(elem.className == "tr") {
      elem.style.right = "-4px"
      elem.style.top = "-4px"
    }
    if(elem.className == "bl") {
      elem.style.left = "-4px"
      elem.style.bottom = "-4px"
    }
    if(elem.className == "br") {
      elem.style.right = "-4px"
      elem.style.bottom = "-4px"
    }
  })

  function select(selected: boolean) {
    resizer.querySelectorAll("div")
      .forEach(elem => {
      selected ? elem.style.display = "block" :
                  elem.style.display = "none"
    })
  }

  const deselectWhenClickOutside = (e: any) => {
    if(e.target !== resizer && e.target !== resizer.childNodes[0]
      && e.target !== resizer.childNodes[1] && e.target !== resizer.childNodes[2]
      && e.target !== resizer.childNodes[3]) {
        obj.bool = false
        select(obj.bool)
    }
  }
  const selectElement = () => {
    resizer.addEventListener("click", () => {
      obj.bool = !obj.bool
      select(obj.bool)
    });
  }
  
  window.addEventListener("click", (e: any) => {
    deselectWhenClickOutside(e)
  })
  selectElement()
}
