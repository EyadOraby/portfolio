/**
 * The garage: real photos from Wikimedia Commons, with the background removed
 * for this page. Each keeps its photographer credit and licence; the cut-outs
 * are shared under the same licence as the originals.
 */
export type Car = {
  id: string;
  name: string;
  maker: string;
  line: string;
  image: string;
  /** Which way the car's nose points in the photo. */
  facing: "left" | "right";
  credit: {
    artist: string;
    license: string;
    licenseUrl: string;
    source: string;
  };
};

export const cars: Car[] = [
  {
    id: "golf",
    name: "Golf R",
    maker: "Volkswagen",
    line: "The hot hatch: a 2.0-litre turbo and 4MOTION all-wheel drive.",
    image: "/cars/golf.webp",
    facing: "left",
    credit: {
      artist: "Thomas doerfer",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:VW_Golf_VIII_R_20210304.jpg",
    },
  },
  {
    id: "rs3",
    name: "RS3 Saloon",
    maker: "Audi",
    line: "A 2.5-litre five-cylinder turbo with quattro.",
    image: "/cars/rs3.webp",
    facing: "left",
    credit: {
      artist: "M 93",
      license: "CC BY-SA 3.0 DE",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
      source:
        "https://commons.wikimedia.org/wiki/File:Audi_RS_3_Limousine_(8Y)_%E2%80%93_f_11102025.jpg",
    },
  },
  {
    id: "rs6",
    name: "RS6 Avant",
    maker: "Audi",
    line: "A 4.0-litre twin-turbo V8 estate with quattro.",
    image: "/cars/rs6.webp",
    facing: "left",
    credit: {
      artist: "Alexander Migl",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Audi_RS6_Avant_C8_1X7A0305.jpg",
    },
  },
  {
    id: "cupra",
    name: "Formentor VZ5",
    maker: "Cupra",
    line: "Cupra's sporty crossover; the VZ5 shares Audi's five-cylinder.",
    image: "/cars/cupra.webp",
    facing: "right",
    credit: {
      artist: "Alexander-93",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Cupra_Formentor_VZ5_1X7A7000.jpg",
    },
  },
];
