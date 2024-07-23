import {
  Box,
  Button,
  FormField,
  Grid,
  ImageCard,
    ColorSelector,
    Select,
    TextInput,
  NumberInput,
  Rows,
  Text,
} from "@canva/app-ui-kit";
import { createRoot } from "react-dom/client";
import { findFonts } from "@canva/asset";
import { upload } from "@canva/asset";
import { openColorSelector } from "@canva/preview/asset";
import {Swatch } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import img1 from "assets/images/img1.jpg";
import img2 from "assets/images/img2.jpg";
import img3 from "assets/images/img3.jpg";
import img4 from "assets/images/img4.jpg";
import img5 from "assets/images/img5.jpg";
import img6 from "assets/images/img6.jpg";
import weather from "assets/images/weather.jpg";
import { useState, useCallback } from "react";
import * as React from "react";
import baseStyles from "styles/components.css";
import { upload, Font, requestFontSelection } from "@canva/asset";
var fontSize : TextAttributes["fontSize"] = 30;
var is3D : TextAttributes["is3D"] = false;
var fontStyle : TextAttributes["fontStyle"] = "normal";
var fontweight : TextAttributes["fontWeight"] = "bold";
//var color = "#ff0099";
var href = "Enter a valid Url";
var style = "normal"
var g = "YAFdJs2qTWQ:1";
var g1 = "Open-Sans"
var  text = "Enter text here..";
var key1 = ""
const images = {
img1: {
title: "Flyhigh",
imageSrc: img1,
desc: "Soaring above this summer.\n We rise above our troubles\n and fly among the clouds.",
},
img2: {
title: "Godeep",
imageSrc: img2,
desc: "Enjoying the ocean blue. \nWe observe the pulls of the tide\n and imagine a future just as beautiful.",
},
img3: {
title: "Scenery",
imageSrc: img3,
desc: "Relaxing on a peaceful harbor.\n We think of sailing away\n on a new adventure.",
},
img4: {
title: "Gogreen",
imageSrc: img4,
desc: "Beholding the beauty of wildlife.\n We imagine ourselves as these two birds,\n relaxing in their beautiful home.",
},
img5: {
title: "Birds",
imageSrc: img5,
desc: "Flying high above the rest.\n We wonder what adventures\n the birds will go on.",
},
img6: {
title: "Tri",
imageSrc: img6,
desc: "The beauty of triangles.\n We marvel at its points and lines.",
},
};
type AppElementData = {
  width: number;
  height: number;
};

var  fontcolor="#ff0099"
type UIState = AppElementData;
var img = images["img1"].imageSrc;
var text = images["img1"].desc;

var initialState: UIState = {
  width: 2500,
  height: 1500,
  fontSize: 30,
  //  fontcolor:"#ff0099"
};

export const App = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement);
 const [color, setColor] = React.useState<string>(fontcolor);
  const [dataUrl, setDataUrl] = useState(img1);
  const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState<UIState>(initialState);
    var {width, height} = state;
  const disabled = !dataUrl || dataUrl.trim().length < 1;

    const [selectedFont, setSelectedFont] = React.useState<Font | undefined>();

      const message = selectedFont
        ? `The selected font is ${selectedFont.name}.`
        : `There is no font selected.`;


   async function handleFont() {
        const fontResponse = await requestFontSelection({
        selectedFontRef: selectedFont?.ref, // Specify the selected font, if one is defined
        });

        if (fontResponse.type !== "COMPLETED") {
            return;
        }
       g = fontResponse.font.ref;
       g1 = fontResponse.font.name
       const {fonts} = await  findFonts({ fontRefs: [g] });

        // Update the currently selected font
        console.log("The selected font",fontResponse)
        setSelectedFont(g);


    }

    async function handleimgClick1(e) {
        // Upload an image
        var href1 = e.target.files[0];
        var newfile = URL.createObjectURL(newfile);
        console.log("href img111111================",newfile)
     //   var img1 = new Image();
     //     img1.crossOrigin = "anonymous";
//
     //     await new Promise((resolve, reject) => {
     //       img1.onload = resolve;
     //       img1.onerror = () => reject(new Error("Image could not be loaded"));
     //       img1 = newfile;
     //         console.log("href img111111================",img1)
     //     });

            const result = await upload({
            type: "IMAGE",
            mimeType: "image/jpeg",

            url: newfile,

            thumbnailUrl: newfile,
            });
            //  await addNativeElement({
            //   type: "IMAGE",
            //   ref: result.ref,
            //  });
        img = newfile;
            text = "Create your own text"
            console.log("hrefaddimg================",img)
          //  addImage();


    }

    async function handleimgClick() {
        // Upload an image
      //  var href1 = document.getElementById("filetoload").files[0];
        console.log("href================",{href},href)

            const result = await upload({
            type: "IMAGE",
            mimeType: "image/jpeg",

            url: href,

            thumbnailUrl: href,
            });
            //  await addNativeElement({
            //   type: "IMAGE",
            //   ref: result.ref,
            //  });



         img = href;
         text = "Create your own text"
         console.log("href================",img)
         addImage();
    }

  const items = Object.entries(images).map(([key, value]) => {

    var { title, imageSrc, desc } = value;

     // console.log("value ======================",key,imageSrc)
    return {
      key,
      title,
     
      imageSrc,
    active:
        dataUrl === imageSrc,

      onClick: () => {

          img = imageSrc;
           text = desc;

               setDataUrl(imageSrc);

      },
    };
  });

  const addImage = useCallback(async () => {

    setIsLoading(true);
    try {
        console.log("addimgwithload================",img)
      //  img = images[imageId].imageSrc;
       // text = images[imageId].desc;
            const  result  = await upload({
            type: "IMAGE",
            mimeType: "image/jpeg",
            url: img,
            thumbnailUrl: img,
            });


            await addNativeElement({
            type: "SHAPE",
            paths: [

                    {
                    d: "M 0 0 H 2000 V 1500 H 0 L 0 0",
                    fill: {
                    dropTarget: true,
                    asset: {
                    type: "IMAGE",
                    ref: result.ref,

                    },
                    },
                    }],
            viewBox: {
             height: 1500,
             width: 2000,
             left: 0,
             top: 0,
           },
            });
        console.log("Changed font " + is3D)
        await addNativeElement({
          type: "TEXT",
            fontRef : g,
          color: fontcolor,
          children: [text],
         fontStyle: fontStyle,
        fontSize: fontSize,
        fontWeight: fontweight,
        position: {x:0,y:0},
        effects: [
                    {
                      type: 'effect',
                      effect: 'outline',
                      thickness: 50, // Adjust the intensity of the neon effect
                      color: fontcolor, // Neon color (green in this example)
                    },
                  ]
        });

    } finally {
      setIsLoading(false);
    }
  }, [state]);


  return (
    <div className={baseStyles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          Greeting Card with Image and Captions
          </Text>
          <Text>Select a Font: <b> {g1} </b> </Text>
          <Button label="Select a Font {g1}"  value={g} variant="primary"  onChange={(value) => {
              return {
              g: handleFont(),
              };
          }} onClick={(handleFont)} >

          Update
           </Button>

          <Text> Current font '{g1}' + Size {fontSize}</Text>



          <Text label="Enter a Font Weight">
          </Text>
          <FormField label="Font Weight" value={fontweight}
          control={(props) => (
                               <Select <TextAttributes["fontWeight"]> value={fontweight}
                               {...props}
                               stretch
                               onChange={(Weight) => {
                                   console.log("The value is=========",Weight);
                                   fontweight = Weight;
                                   return {

                                       fontweight : Weight,
                                   };
                               }}
                               options = {[
                                   {value: "normal", lablel: "Normal" },
                                   {value: "thin", lablel: "Thin" },
                                   {value:"light", lablel: "Light" },
                                   { value:"semibold", label: "Semibold"},
                                   { value: "bold", label: "Bold"},
                                   { value: "ultrabold", label: "Ultrabold"},
                                   { value: "heavy", label: "Heavy"},
                               ]}

                               />
                               )}
        />

          <Text label="Font Style">
          </Text>
          <FormField label="Font Style" value={fontStyle}
          control={(props) => (
                               <Select <TextAttributes["fontStyle"]> value={fontStyle}
                               {...props}
                               stretch
                               onChange={(Style) => {
                                   console.log("The value is=========",Style);
                                   fontStyle = Style;
                                   return {

                                       fontStyle : Style,
                                   };
                               }}
                               options = {[
                                   {value: "normal", lablel: "Normal" },
                                   {value: "italic", lablel: "Italic" },

                               ]}

                               />
                               )}
        />
          <Text label="Enter a Font Size">
          </Text>
          <FormField label="Font Size" value={fontSize}
          control={(props) => (
                               <Select <TextAttributes["fontSize"]> value={fontSize}
                               {...props}
                               stretch
                               onChange={(Size) => {
                                   console.log("The value is=========",Size);
                                   fontSize = Size;
                                   return {

                                       fontSize : Size,
                                   };
                               }}
                               options = {[
                                   {value: 10.0, lablel: "20" },
                                   {value: 30.0, lablel: "30" },
                                   { value: 40.0, label: "40"},
                                   { value: 60.0, label: "60"},
                                   { value: 80.0, label: "80"},
                                   { value: 100.0, label: "100"},
                               ]}

                               />
                               )}
        />

<Text> Select a Font Color </Text>
          <Swatch
           fill={[color]}

            onClick={async (event) => {
              const anchor = event.currentTarget.getBoundingClientRect();
              await openColorSelector(anchor, {
                scopes: ["solid"],
              onColorSelect: (event) => {
                //  if (event.selection.type === "solid") {
                  fontcolor = event.selection.hexString;
                  console.log("event=======================",event.selection.hexString)
                  setColor(event.selection.hexString);

                      console.log("color=======================",fontcolor,color)
                //  }

                },
              });
            }}
          />

          <FormField
            label="Select an image"
            control={(props) => (
              <Box id={props.id} padding="1u">
                <Grid columns={3} spacing="1.5u">
                  {items.map((item) => (
                    <ImageCard
                      ariaLabel={item.title}
                      key={item.key}
                      text={item.desc}
                      thumbnailUrl={item.imageSrc}
                      onClick={item.onClick}
                      selectable={true}
                      selected={item.active}
                      borderRadius="standard"
                    />
                  ))}
                </Grid>
              </Box>
            )}
          />




          <Button variant="primary" disabled={disabled} loading={isLoading} onClick={(addImage)}>

             Add element
           </Button>
         <Text> Add your Image </Text>
          <TextInput placeholder="Enter valid image Url in .jpg"
                onChange={(value) => {
                    href=value
                    return {

                      href: value,
                    };

                }}
              />
          <Button variant="primary" onClick={handleimgClick}>Add </Button>






      </Rows>

    </div>



  );

};
