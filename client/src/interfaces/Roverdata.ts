interface RoverData {
  id: number;
  camera: {
    name: string;
    full_name?: string;
  };
  img_src: string;
  earth_date?: string;
  rover: {
    cameras: {
      name: string;
      full_name: string;
    }[];
  };
}

export default RoverData;
