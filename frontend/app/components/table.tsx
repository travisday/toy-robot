import * as React from "react"
import { Button } from "~/components/ui/button"
import type { Position } from "~/lib/types"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Circle } from "lucide-react"

/*
Table component builds the 5x5 table grid.
It accepts 3 props:
  - pos: (x,y) postion of the robot
  - facing: the direction it's facing (eg. NORTH)
  - place: function from parent component to update the position state when the robot is placed on a new position
*/
export function Table({
  pos,
  facing,
  place,
  ...props
}: React.ComponentProps<"div"> & { pos?: Position | null, facing?: String,  place?: (pos: Position) => void }) {
  let Icon = ArrowUp

  // set the correct icon for the direction it's facing
  if (facing == "SOUTH") {
    Icon = ArrowDown
  } else if (facing == "NORTH") {
    Icon = ArrowUp
  } else if (facing == "EAST") {
    Icon = ArrowRight
  } else if (facing == "WEST") {
    Icon = ArrowLeft
  } 

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* use an array and the grid formatting to build the 5x5 grid  */}
      {Array.from({ length: 25 }).map((_, i) => {
        {/* row column to index formula to check which index the robot is currently on  */}
        const isAtPos = pos != null && i === (4 - pos.y) * 5 + pos.x
        return (
          <Button onClick={() => place?.({ x: i % 5, y: 4 - Math.floor(i / 5) })} key={i} variant="outline">
            {/* on click the button calls place funciton to update the pos state in parent using index to row column formula  */}
            {isAtPos ? (<Icon />) : (<Circle />)}
          </Button>
        )
      })}
    </div>
  )
}