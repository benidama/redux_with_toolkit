import { useState, useEffect } from 'react';
import image1 from '../images/s1.jpg';
import image2 from '../images/s2.jpg';
import image3 from '../images/s3.jpg';
import testimonial from '../images/t2.jpg';
import SearchInput from '../components/SearchInput';
import { ArrowRightCircle, MapPin, Search } from 'lucide-react';
import {
  districtDetails,
  commonlyQuestionAsked,
  howDetails,
  serviceDetails,
} from '../Data';

const Landing = () => {
  const [isHoverd, setIsHoverd] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="bg-white container p-5 mx-auto px-4 md:px-8 lg:px-32 font-poppins">
      <div className="flex flex-col  gap-5 pb-10">
        {/* Welcome Images */}
        <div className="w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden flex justify-center items-center relative">
          <div className="w-full h-full bg-gradient-to-r from-[#333333]/60 to-transparent z-30 absolute" />
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100 z-20' : 'opacity-0 z-10'
              }`}
            />
          ))}

          {/* Welcome Message */}
          <div className="flex flex-col justify-center items-center z-50 gap-5 md:gap-16">
            <div className="bg-black/50 w-full md:w-[400px] rounded-lg flex flex-col items-center p-5">
              <h1 className="text-white font-bold text-[20px] mb-5">
                Style your perfect look
              </h1>
              <p className="text-white text-sm max-w-72 text-center">
                Get personalized salon recommendations tailored to your beauty
                needs.
              </p>
            </div>

            {/* Search Inputs */}
            <div className="bg-[#D9D9D9]/50 w-full md:w-[650px] flex flex-col md:flex-row justify-center items-center p-2 md:p-3 rounded-lg gap-4">
              <SearchInput
                placeholder="Search for salons, services..."
                Icon={Search}
              />
              <SearchInput placeholder="Location" Icon={MapPin} />
              <button className="bg-[#DB2777] p-2 md:p-3 w-full md:w-40 rounded hover:bg-[#be185d] cursor-pointer text-white font-bold">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* How to use salon flow */}
        <div className="mt-2 md:mt-5">
          <h1 className="text-[#333333] text-2xl text-center font-bold mb-2 md:mb-3">
            How Salon-Flow Works
          </h1>
          <p className="text-[#333333] font-medium text-center">
            Connecting clients with salons has never been easier
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-12 mt-5 md:mt-10">
            {howDetails.map((howDetail) => (
              <div
                key={howDetail.id}
                className="bg-white w-full md:w-96 p-4 rounded border-2 border-gray-300 cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#DB2777]"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-[#DB2777]">{howDetail.icon}</p>
                    <p className="font-bold text-2xl">{howDetail.number}</p>
                  </div>

                  <div className="flex flex-col gap-4 mt-3">
                    <h1 className="font-semibold text-xl">{howDetail.title}</h1>
                    <p className="text-[#555555] font-medium text-sm">
                      {howDetail.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Districts */}
        <div className=" flex flex-col gap-3 md:mt-5 mb-3 md:mb-10">
          <h1 className="md:text-2xl text-lg text-[#333333] font-bold text-center mb-3 md:mb-8">
            Where to Style? Choose Your District!
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {districtDetails.map((district) => (
              <div
                key={district.id}
                className="bg-white h-96 overflow-hidden rounded-t-lg rounded-lg border-2 border-gray-300 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:border hover:border-[#be185d] cursor-pointer"
              >
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={district.image}
                    alt={district.title}
                    className="w-full h-full object-cover hover:opacity-40"
                  />
                </div>

                <div className="flex flex-col gap-3 p-3 overflow-y-auto">
                  <h1 className="text-[15px] font-black text-[#333333]">
                    {district.title}
                  </h1>
                  <p className="text-[12px] font-medium text-[#333333]">
                    {district.location}
                  </p>
                  <p className="text-[15px] text-[#333333] font-semibold">
                    Total Saloons: {district.TatalSaloons}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Service */}
        <div className="mb-5 md:mb-10">
          <h1 className="text-center font-bold text-2xl text-[#333333] mb-3">
            Popular Services
          </h1>
          <p className="text-center font-medium text-[#333333]">
            Hear from salon owners and clients who use Salon-Flow
          </p>
          <div className="mt-5 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
            {serviceDetails.map((service) => (
              <div
                key={service.id}
                className="w-full md:w-60 p-5 flex flex-col justify-start md:justify-center items-start md:items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <p className="text-[#DB2777]">{service.icon}</p>
                <h1 className="text-sm md:text-lg font-medium hover:text-[#DB2777]">
                  {service.title}
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div
          className={`bg-[#33313E] h-28 w-full rounded-lg overflow-hidden flex flex-row relative cursor-pointer}`}
          onMouseEnter={() => setIsHoverd(true)}
          onMouseLeave={() => setIsHoverd(false)}
        >
          <img
            src={testimonial}
            alt="TestimonialImage"
            className="md:flex hidden object-cover w-1/2 h-full"
          />
          <div className="absolute right-8 md:right-40 mt-3 flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-[20px] mb-2">
              What Clients Says ?
            </h1>
            <p className="text-[13px] max-w-[300px] text-center text-[#FFB6C1]">
              Real experiences, real beauty! See what our happy customers have
              to say
            </p>
          </div>

          {isHoverd && (
            <div className="bg-[#33313E]/70 h-full w-full absolute z-50 flex justify-center items-center gap-3 cursor-pointer">
              <h1 className="text-white font-bold text-[20px] text-center">
                View Testimonials
              </h1>
              <ArrowRightCircle className="text-white" />
            </div>
          )}
        </div>

        {/* Common Questions Asked */}
        <div className="flex flex-col gap-3 md:gap-10 mt-3 md:mt-10">
          <h1 className="text-[25px] text-[#333333] font-bold text-start md:text-center">
            Commonly Asked Questions
          </h1>
          <div className=" grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-8 mt-3 ">
            {commonlyQuestionAsked.map((quest, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h1 className="text-[#DB2777] font-semibold text-[20px] ">
                  {quest.Question}
                </h1>
                <p className="text-[#555555]">{quest.Answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Comment */}
        <div className="flex flex-col justify-start md:justify-center items-start md:items-center mt-8 gap-2">
          <h1 className="text-[#333333] font-bold text-[20px]">
            Feel free to leave comment☺️
          </h1>
          <textarea
            className="w-80 md:w-1/2 p-4 bg-[#D9D9D9] text-[15px] h-28 resize-none border-2 border-[#33313E] rounded-lg outline-amber-800"
            placeholder="Leave Your Comment Here..."
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;