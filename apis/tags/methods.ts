import axios from "axios";
import { Vector3 } from "three";

import { Tag } from "@/entities/tags";

import { TagApiResponse } from "./types";
import { apiUrl } from "../config/constants";

export async function getTagsList(): Promise<Tag[]> {
  const { data } = await axios.get<TagApiResponse[]>(`${apiUrl}/tags`);

  return data.map((record) => ({
    id: record.id,
    position: new Vector3(
      record.position.x,
      record.position.y,
      record.position.z
    ),
    stemVector: new Vector3(
      record.stemVector.x,
      record.stemVector.y,
      record.stemVector.z
    ),
    label: record.label,
    description: record.description,
    sweepId: record.sweepId,
  }));
}
