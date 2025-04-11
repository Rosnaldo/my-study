import { MutableRefObject } from "react"

const makeResizable = (
  {
    resizers,
    resizer,
    refMain,
  } : {
  resizers: NodeListOf<ChildNode>,
  resizer: HTMLDivElement,
  refMain: MutableRefObject<HTMLDivElement | null>,
  }
) => {
  const minimum_size = 20

  let original_width = 0
  let original_height = 0
  let original_x = 0
  let original_y = 0
  let original_mouse_x = 0
  let original_mouse_y = 0

  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i]

    currentResizer.addEventListener("mousedown", function(e: any) {
      e.stopPropagation()
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(refMain.current!, null)
                        .getPropertyValue("width").replace("px", ""))
      original_height = parseFloat(getComputedStyle(refMain.current!, null)
                         .getPropertyValue("height").replace("px", ""))
      original_x = refMain.current!.getBoundingClientRect().left
      original_y = refMain.current!.getBoundingClientRect().top
      original_mouse_x = e.pageX
      original_mouse_y = e.pageY

      window.addEventListener("mousemove", resize)
      window.addEventListener("mouseup", () => {
        stopResize()
      })
    })
    
    function resize(e: any) {
      // @ts-ignore
      if (currentResizer.classList.contains("br")) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          refMain.current!.style.width = width + "px"
          resizer.style.width = width + "px"
        }
        if (height > minimum_size) {
          refMain.current!.style.height = height + "px"
          resizer.style.height = height + "px"
        }
      }
      // @ts-ignore
      else if (currentResizer.classList.contains("bl")) {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height + (e.pageY - original_mouse_y)
        if (height > minimum_size) {
          refMain.current!.style.height = height + "px"
          resizer.style.height = height + "px"
        }
        if (width > minimum_size) {
          refMain.current!.style.width = width + "px"
          resizer.style.width = width + "px"
          refMain.current!.style.left = original_x + (e.pageX - original_mouse_x) + "px"
          resizer.style.left = original_x + (e.pageX - original_mouse_x) + "px"
        }
      }
      // @ts-ignore
      else if (currentResizer.classList.contains("tr")) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          refMain.current!.style.width = width + "px"
          resizer.style.width = width + "px"
        }
        if (height > minimum_size) {
          refMain.current!.style.height = height + "px"
          resizer.style.height = height + "px"
          refMain.current!.style.top = original_y + (e.pageY - original_mouse_y) + "px"
          resizer.style.top = original_y + (e.pageY - original_mouse_y) + "px"
        }
      }
      else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          refMain.current!.style.width = width + "px"
          resizer.style.width = width + "px"
          refMain.current!.style.left = original_x + (e.pageX - original_mouse_x) + "px"
          resizer.style.left = original_x + (e.pageX - original_mouse_x) + "px"
        }
        if (height > minimum_size) {
          refMain.current!.style.height = height + "px"
          resizer.style.height = height + "px"
          refMain.current!.style.top = original_y + (e.pageY - original_mouse_y) + "px"
          resizer.style.top = original_y + (e.pageY - original_mouse_y) + "px"
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener("mousemove", resize)
    }
  }
}

export default makeResizable
