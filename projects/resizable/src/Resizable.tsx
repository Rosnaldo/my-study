import { MutableRefObject, useEffect, useRef } from "react"
import { makeSelectable } from "./selectable"
import makeResizable from "./resizable"
import { makeMovable } from "./movable"

function Resizable() {
  const refResizable: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const refMain: MutableRefObject<HTMLDivElement | null> = useRef(null)
  let once = 0
  const resizer = document.createElement("div")
  resizer.setAttribute("class","resizer")

  useEffect(() => {
    if (once === 0) {
      makeMovable({ resizer, refMain })
      makeSelectable({ refResizable, refMain, resizer })
      makeResizable({ resizers: resizer.childNodes, resizer, refMain })
      once++
    }
  }, [])

  return (
    <div className="resizable" ref={refResizable}>
      <div className="main" ref={refMain}>
      </div>
    </div>
  )
}

export default Resizable
