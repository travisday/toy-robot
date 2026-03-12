import type { Position } from "~/lib/types"

// function to cycle through the facing positions when rotating left
export function rotateLeft(facing: string): string {
    if (facing === "NORTH") {
        return "WEST"
    } else if (facing === "WEST") {
        return "SOUTH"
    } else if (facing === "SOUTH") {
        return "EAST"
    } else if (facing === "EAST") {
        return "NORTH"
    }
    return "NORTH"

}

// function to cycle through the facing positions when rotating right
export function rotateRight(facing: string): string {
    if (facing === "NORTH") {
        return "EAST"
      } else if (facing === "EAST") {
        return "SOUTH"
      } else if (facing === "SOUTH") {
        return "WEST"
      } else if (facing === "WEST") {
        return "NORTH"
      }
      return "NORTH"

}

// function to move the robot around the table based on facing direction while maintaining the boundries
export function move(pos: Position, facing: string): Position {
    if (facing === "NORTH") {
        if (pos.y < 4){
        return {x:pos.x, y:pos.y+1}
        } 
    } else if (facing === "WEST") {
        if (pos.x > 0){
        return {x:pos.x-1, y:pos.y}
        }
    } else if (facing === "SOUTH") {
        if (pos.y > 0){
        return {x:pos.x, y:pos.y-1}
        }
    } else if (facing === "EAST") {
        if (pos.x < 4){
        return {x:pos.x+1, y:pos.y}
        }
    }
    return pos
}