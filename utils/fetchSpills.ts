import { ISpill } from "../typings";

export const fetchSpills = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSpills`)
  const data = await res.json();
  const spills: ISpill[] = data.spills
  return spills
}