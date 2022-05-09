import React from 'react'

const About = () =>{
    return(
        <div>
            <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
      {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p> */}
    </div>
    <div className="flex flex-wrap -m-2">
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover animate-[load_2s_ease-in-out] object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80"/>
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium animate-[load_2s_ease-in-out]">Yash Dagar</h2>
            <p className="text-gray-500">UI Designer</p>
          </div>
        </div>
      </div>
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover animate-[load_2s_ease-in-out] object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/84x84"/>
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium animate-[load_2s_ease-in-out]">Aditya Garg</h2>
            <p className="text-gray-500">Programmer</p>
          </div>
        </div>
      </div>
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center animate-[load_2s_ease-in-out] flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/88x88"/>
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium animate-[load_2s_ease-in-out]">Shaurya Malhotra</h2>
            <p className="text-gray-500">desgin manager</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    )
}
export default About