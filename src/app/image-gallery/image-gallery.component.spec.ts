import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GalleryComponent } from "./image-gallery.component";
import { ImageService } from "../image.service";
import { MockPipe } from "../MokePipe.pipe";

describe("ImageGalleryComponent", () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryComponent, MockPipe],
      providers: [
        {
          provide: ImageService,
          useValue: {
            getImages: () => {
              return [
                {
                  id: 1,
                  brand: "perro",
                  url: "assets/images/perro1.jpg",
                },
              ];
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Cuando se inicie la aplicación, debe crear el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Cuando se cargue el componente el tamaño de la lista debe ser uno", () => {
    expect(component.allImages.length).toEqual(1);
  });

  it("Cuando se cargue el componente la lista debe contener el perro con id 1", () => {
    component.allImages.forEach((item) => {
      expect(item.id).toEqual(1);
      expect(item.brand).toEqual("perro");
      expect(item.url).toEqual("assets/images/perro1.jpg");
    });
  });

  it("Cuando se cargue el componente debe tener 3 botones con los valores All, Perro y Gato", () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      "#filterButtons .btn"
    );
    expect(buttons).toBeDefined();
    const innerTexts = ["All", "Perro", "Gato"];
    [].forEach.call(innerTexts, (text) => {
      let index = -1;
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText === text) {
          index = i;
          break;
        }
      }
      expect(index).toBeGreaterThanOrEqual(0);
    });
  });
});
