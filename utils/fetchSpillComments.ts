import { ISpillComment } from "../typings";

export const fetchSpillComments = async (spillId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSpillComments?spillId=${spillId}`);
  const data = await res.json();
  const spillComments: ISpillComment[] = data.spillComments
  return spillComments
}