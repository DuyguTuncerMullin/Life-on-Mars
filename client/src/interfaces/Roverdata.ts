interface RoverData {
  id: number;
  sol?: number;
  camera: {
    name: string;
  };
  img_src: string;
  earth_date?: string;
}

export default RoverData;
