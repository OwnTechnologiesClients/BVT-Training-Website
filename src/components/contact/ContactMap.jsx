"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, Car } from "lucide-react";

export default function ContactMap() {
  const locations = [
    {
      name: "Main Training Center",
      address: "123 Naval Base Road, San Diego, CA 92101",
      phone: "+1 (555) 123-4567",
      email: "main@navytraining.com",
      hours: "Mon-Fri: 8AM-6PM EST",
      coordinates: "32.7157° N, 117.1611° W",
      parking: "Free parking available",
      isMain: true
    },
    {
      name: "East Coast Branch",
      address: "456 Naval Station Blvd, Norfolk, VA 23511",
      phone: "+1 (555) 234-5678",
      email: "east@navytraining.com",
      hours: "Mon-Fri: 9AM-5PM EST",
      coordinates: "36.8468° N, 76.2852° W",
      parking: "Parking garage available"
    },
    {
      name: "Training Facility Hawaii",
      address: "789 Pearl Harbor Way, Honolulu, HI 96818",
      phone: "+1 (555) 345-6789",
      email: "hawaii@navytraining.com",
      hours: "Mon-Fri: 7AM-5PM HST",
      coordinates: "21.3099° N, 157.8581° W",
      parking: "On-site parking"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Locations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find our training centers across the country. Each location offers 
              comprehensive facilities and expert instructors.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-12 overflow-hidden"
          >
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-400 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-blue-400 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-blue-400 rounded-full"></div>
            </div>

            {/* Map Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Interactive Map</h3>
                <p className="text-blue-700 mb-4">Click on markers to view location details</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Open Full Map
                </button>
              </div>
            </div>

            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={index}
                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform ${
                  location.isMain ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{
                  top: `${20 + index * 25}%`,
                  left: `${30 + index * 15}%`
                }}
                title={location.name}
              />
            ))}
          </motion.div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-white rounded-2xl shadow-lg border-2 p-6 hover:shadow-xl transition-all duration-300 ${
                  location.isMain ? 'border-blue-500' : 'border-gray-100'
                }`}
              >
                {/* Location Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      location.isMain ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{location.name}</h3>
                      {location.isMain && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Main Location
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="text-gray-900 font-medium">{location.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-gray-900 font-medium">{location.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-gray-900 font-medium">{location.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Hours</div>
                      <div className="text-gray-900 font-medium">{location.hours}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Navigation className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Coordinates</div>
                      <div className="text-gray-900 font-medium text-xs">{location.coordinates}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Car className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Parking</div>
                      <div className="text-gray-900 font-medium">{location.parking}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                    Get Directions
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Schedule Visit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Planning Your Visit?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                All our locations are equipped with state-of-the-art training facilities, 
                comfortable accommodations, and experienced instructors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Download Campus Map
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Virtual Tour
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
