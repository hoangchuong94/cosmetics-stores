import React from "react";
import Image from "next/image";

import Background from "@/components/background";
import backgroundImage1 from "@/public/static/bg-05.jpg";
import backgroundImage2 from "@/public/static/bg-04.jpg";
import profileAbout from "@/public/static/about-01.jpg";
import ShippingInformation from "@/components/shipping-information";

export default function AboutPage() {
  return (
    <div className="p-5">
      <Background
        title="new in town"
        name="The New Beauty Collection"
        description="This new collection brings with it the most exciting lorem ipsum dolor sit a met."
        image={backgroundImage1}
        fixed
      />
      <div className="py-8 md:flex">
        <div className="py-4 md:flex-1">
          <h2 className="text-4xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <p className="py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <span className="mt-4 block w-10 border border-b-red-400"></span>
        </div>
        <div className="bg-[#f6edf0] md:flex-1">
          <div className="p-12 flex flex-col justify-between">
            <h4 className="my-2 font-bold text-xl">
              Cras ut ultricies risus. Etiam ac malesuada lectus. Sed congue
              nisi vitae lorem ullamcorper laoreet. In eget tellus mauris.
              Phasellus id ligula.
            </h4>
            <p className="my-2 text-black/75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              rhoncus eget enim eget tincidunt. In finibus nisi ex, eu interdum
              urna euismod sit amet. Morbi sollicitudin in magna sed tristique.
              Nulla pharetra sapien eros, sit amet bibendum nibh consectetur
              quis. Curabitur tortor dolor, fringilla eu fringilla id, dignissim
              in urna.
            </p>

            <p className="my-2 text-black/75">
              Morbi sollicitudin in magna sed tristique. Nulla pharetra sapien
              eros, sit amet bibendum nibh consectetur quis. Curabitur tortor
              dolor, fringilla eu fringilla id.
            </p>
          </div>
        </div>
      </div>

      <Background
        title="new in town"
        name="The New Beauty Collection"
        description="Proin at velit sed elit varius porttitor. Ut a suscipit quam, eu congue odio. Sed eget viverra est. Vivamus ut sodales neque. Sed vel dui et dolor placerat egestas id lacinia mauris"
        image={backgroundImage2}
        fixed
      />

      <div className="my-5 bg-[#f6edf0] flex flex-col-reverse md:flex-row">
        <div className="bg-white relative md:w-6/12 h-[600px] md:h-auto">
          <Image
            className="object-cover"
            alt="image profile contact"
            src={profileAbout}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="pt-60 pb-28 px-10 flex justify-center items-end flex-col text-end md:w-6/12">
          <p>ABOUT ME</p>
          <h2>Hi, I am Diana!</h2>
          <p>
            I am a 32 years old women entrepreneur, living in Miami, Florida
          </p>
          <span className="m-4 block w-10 border border-b-red-400"></span>
          <p>
            Sed ut fringilla dolor. Morbi suscipit a nunc eu finibus. Nam rutrum
            mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum
            dictum eget. Mauris in dolor velit. Vestibulum finibus felis non
            massa commodo molestie at id justo. Quisque sollicitudin elit sit
            amet facilisis euismod. Fusce at arcu sed.
          </p>

          <p>
            Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id
            pulvinar ipsum dictum eget.
          </p>
        </div>
      </div>

      <ShippingInformation />
    </div>
  );
}
