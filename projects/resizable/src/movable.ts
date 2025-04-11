import { MutableRefObject } from "react"

export const makeMovable = (
  {
    resizer,
    refMain,
  } : {
    resizer: HTMLDivElement,
    refMain: MutableRefObject<HTMLDivElement | null>,
  }
) => {
  resizer.addEventListener("mousedown", function(e: any) {
    e.preventDefault()
    e.stopPropagation()
    const original_x = resizer.getBoundingClientRect().left
    const original_y = resizer.getBoundingClientRect().top
    const original_mouse_x = e.pageX
    const original_mouse_y = e.pageY
  
    function move(e: any) {
      resizer.style.left = original_x + (e.pageX - original_mouse_x) + "px"
      refMain.current!.style.left = original_x + (e.pageX - original_mouse_x) + "px"
      resizer.style.top = original_y + (e.pageY - original_mouse_y) + "px"
      refMain.current!.style.top = original_y + (e.pageY - original_mouse_y) + "px"
    }
    
    function stopResize(e: any) {
      e.stopPropagation()
      window.removeEventListener("mousemove", move)
    }
  
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", stopResize)
  })
}


