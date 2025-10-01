"use client";

import { User } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="px-8 py-40 bg-white">
      <div className="container mx-auto">
        <div className="col-span-full gap-10 place-items-center overflow-visible grid grid-cols-1 lg:grid-cols-4">
          {/* Image Section */}
          <div className="w-full xl:w-[600px] flex items-center overflow-hidden rounded-xl justify-center col-span-2 h-full">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden border-2 border-yellow-600/30">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
                alt="Naval Operations Training"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-3xl font-bold">Naval Excellence</div>
                <div className="text-sm text-yellow-500 mt-1">Professional Training Program</div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="col-span-2 w-full">
            <p className="mb-4 text-sm font-bold text-blue-900 uppercase tracking-wide">
              FEATURED PROGRAM
            </p>
            
            <h3 className="mb-4 font-bold text-3xl text-gray-900">
              Comprehensive Naval Operations
            </h3>
            
            <p className="mb-1 w-full font-normal text-gray-500">
              Become a versatile naval professional by combining technical expertise with 
              operational knowledge. Master all aspects of modern naval operations.
            </p>

            <div className="grid mb-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-gray-500 rounded-full" />
                <p className="w-full font-normal text-gray-500">
                  Navy-certified training modules
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-gray-500 rounded-full" />
                <p className="w-full font-normal text-gray-500">
                  Hands-on practical experience included
                </p>
              </div>
            </div>

            <div className="flex items-center mt-8 gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center border-2 border-yellow-600">
                <User className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h4 className="mb-0.5 text-lg font-bold text-gray-900">
                  Commander James Mitchell
                </h4>
                <p className="font-normal text-sm text-gray-500">
                  Chief Training Officer, Naval Academy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

