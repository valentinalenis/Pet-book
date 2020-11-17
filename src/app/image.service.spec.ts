import using from "jasmine-data-provider";
import { ImageService } from "./image.service";

describe("ImageService", () => {
  let service: ImageService;

  beforeEach(() => {
    service = new ImageService();
  });

  it("Cuando se inicie la aplicación, debe crear el componente", () => {
    expect(service).toBeTruthy();
  });

  describe("getImages", () => {
    it("Cuando se llame el método, debe retornar las 5 imágenes", () => {
      const resp = service.getImages();
      expect(resp.length).toBe(5);
    });
  });

  describe("getImage", () => {
    using(
      [
        {
          testId: 3,
          expected: { brand: "gato", asset: "assets/images/gato1.jpg" },
        },
        {
          testId: 5,
          expected: { brand: "perro", asset: "assets/images/perro3.jpg" },
        },
      ],
      (data) => {
        it(`Cuando se envíe ${data.testId} (Que está dentro de la lista) entonces debe retornar el elemento ${data.expected.brand} con url ${data.expected.asset}`, () => {
          const image = service.getImage(data.testId);
          expect(image.brand).toBe(data.expected.brand);
          expect(image.url).toBe(data.expected.asset);
        });
      }
    );
    it("Cuando se envíe 7 (Que no está dentro de la lista) entonces debe retornar indefinido", () => {
      const testId = 7;
      const image = service.getImage(testId);
      expect(image).toBeUndefined();
    });
  });
});
