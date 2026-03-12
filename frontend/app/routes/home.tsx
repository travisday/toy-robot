import type { Route } from "./+types/home";
import { Simulator } from "../simulator/simulator";
import type { ActionFunctionArgs } from "react-router";
import { addPos, getLastPos } from "~/lib/api"
import type { Payload } from "~/lib/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Toy Robot Simulator" },
    { name: "description", content: "Toy Robot Simulator" },
  ];
}

/* 
Action function that calls the api to update the db whenever the robot moves
*/
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // build payload from form data
  const payload: Payload = {
    x: Number(formData.get("x")),
    y: Number(formData.get("y")),
    facing: String(formData.get("facing") ?? ""),
  };
  // call api util with the payload
  addPos(payload);
  return { success: true };
}

/* 
Home route is the entry of the application. 
I just set some formatting and a title, Simulator and where most of the logic happens.
*/
export default function Home() {
  return ( 
    <div className="text-center pt-4">
      <h1 className="text-4xl font-bold">
        Toy Robot Simulator
      </h1>
      <Simulator />
    </div>
    );
}
