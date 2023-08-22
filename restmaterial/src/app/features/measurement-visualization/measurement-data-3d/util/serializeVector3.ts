import { SimpleVector3 } from '../../../../../lib/measurement/model/SimpleVector3';

export const serializeVector3 = (vector?: SimpleVector3) =>
    vector ? [vector.x, vector.y, vector.z].map((n) => n.toString()).join(',') : 'none';
