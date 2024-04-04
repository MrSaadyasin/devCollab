import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function SliderComp({ data, selectedAvater ,selectedAvt}) {
  const selectedClasses =
    "border-4 border-orange-400 opacity-100 shadow-md shadow-orange-300 -translate-y-3 text-lg";
  return (
    <div className="m-auto min-h-full avt-sldr  ">
      <Slide slidesToScroll={4} slidesToShow={4} autoplay={false} duration={5000} indicators={true} cssClass="  ">
        {data &&
          data?.map((av) => {
            const { id, img, name } = av;
            return (
              <div className="flex justify-center  ">
                <div
                  onClick={() => selectedAvater(name)}
                  key={id}
                  className={` w-5/6 mt-10 bg-gray-700 hover:-translate-y-5 
                transition-all hover:shadow-lg hover:shadow-orange-300 rounded 
                overflow-hidden hover:text-orange-300   hover:opacity-100
                 cursor-pointer duration-700 ${
                   selectedAvt === name ? selectedClasses : "opacity-60"
                 }
                 `}
                >
                  <LazyLoadImage src={img} alt={name} className="w-40 m-auto p-2 " />
                  <p className="text-center tracking-wider  font-medium p-2 ">
                    {name}
                  </p>
                </div>
              </div>
            );
          })}
        {/* <div className="w-32 bg-slate-500">
          <div>
            <span>Slide 1</span>
          </div>
        </div>
        <div >
          <div className="w-32 bg-slate-500" >
            <span>Slide 2</span>
          </div>
        </div> */}
      </Slide>
    </div>
  );
}
{
  /* <Slide slidesToScroll={2} slidesToShow={2}>
<h2 className="text-white"> lkok</h2>
{data &&
  data.map((item) => {
    const { name } = item;
    return <div className=" h-40 w-full bg-slate-400" key={item.id}>{name}</div>;
  })}
</Slide> */
}
