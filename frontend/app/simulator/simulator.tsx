import { Table } from "~/components/table";
import { Button } from "~/components/ui/button"
import { useEffect, useState } from "react";
import { rotateLeft, rotateRight, move } from "./logic";
import type { Payload, Position } from "~/lib/types"
import { useFetcher } from "react-router";
import { getLastPos } from "~/lib/api"

/*
The Simulator component creates the universe for the robot simulator to run in.
All state and data fetching is handled in here and we use the other utils and components as needed.
  - Table: component that builds the table grid and accepts the pos and facing props
  - API: utility function to centralize calls to my api
  - Logic: utility for the movement and simualtor logic
*/
export function Simulator() {
  
  // set state variable
  const [pos, setPos] = useState<Position | null | undefined>(null);
  const [facing, setFacing] = useState('NORTH');
  const [showReport, setShowReport] = useState(false)
  let fetcher = useFetcher()

  // set use effect so that on render we check for the last position in the db
  useEffect(() => {
    getLastPos().then((p) => {
      setPos({ x: p.x, y: p.y });
      setFacing(p.facing ?? 'NORTH');
    });
  }, []);

  // function to handle changing the facing towards left
  const moveFacingLeft = () => {
    setShowReport(false)
    setFacing(prev => rotateLeft(prev))
  };

  // function to handle changing the facing towards right
  const moveFacingRight = () => {
    setShowReport(false)
    setFacing(prev => rotateRight(prev))
  };

  // function to place the robot if its not on the table or replace then update db
  const place = (pos: Position) => {
    setPos(pos)
    fetcher.submit({x:pos.x, y:pos.y, facing: facing}, { method: "post" });
  };

  // function to move the position of the robot and submit the form data causing the action in our home route to trigger which updates the db
  const movePos = () => {
    setShowReport(false);
    setPos(prev => {
      if (prev == null) return prev;
      const newPos = move(prev, facing);
      fetcher.submit({ x: newPos.x, y: newPos.y, facing }, { method: "post" });
      return newPos;
    });
  };

  // set up a use effect hook to handle the key press events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') moveFacingLeft();
      if (event.key === 'ArrowRight') moveFacingRight();
      if (event.key === 'ArrowUp') movePos();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePos, moveFacingLeft, moveFacingRight]);

  // render the table and buttons
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="mb-4">
          <Table pos={pos} facing={facing} place={place}/>
        </div>
        <div className="grid grid-flow-col grid-rows-1 items-center justify-center gap-4">
          <Button onClick={moveFacingLeft} variant="default">Left</Button>
          <Button onClick={movePos} variant="default">Move</Button>
          <Button onClick={moveFacingRight} variant="default">Right</Button>
        </div>
        <Button onClick={()=>setShowReport(true)}>Report</Button>
        {(showReport && pos != null) ? (<p>{pos.x}, {pos.y} - {facing}</p>) : (<p></p>)}
      </div>
    </main>
  );
}