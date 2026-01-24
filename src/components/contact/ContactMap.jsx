"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Car, ArrowRight, Sparkles } from "lucide-react";

export default function ContactMap() {
  const allLocations = [
    {
      name: "BVT Training",
      address: "Kvithovdvegen 17, 5304 Hetlevik, Norway",
      phone: "+1 (555) 123-4567",
      email: "Cato.grasdal@gmail.com",
      hours: "Mon-Fri: 8AM-6PM EST",
      coordinates: "60.3913° N, 5.3221° E",
      parking: "Free parking available",
      isMain: true
    },
    {
      name: "East Coast Branch",
      address: "456 BVT Station Blvd, Norfolk, VA 23511",
      phone: "+1 (555) 234-5678",
      email: "Cato.grasdal@gmail.com",
      hours: "Mon-Fri: 9AM-5PM EST",
      coordinates: "36.8468° N, 76.2852° W",
      parking: "Parking garage available"
    },
    {
      name: "Training Facility Hawaii",
      address: "789 Pearl Harbor Way, Honolulu, HI 96818",
      phone: "+1 (555) 345-6789",
      email: "Cato.grasdal@gmail.com",
      hours: "Mon-Fri: 7AM-5PM HST",
      coordinates: "21.3099° N, 157.8581° W",
      parking: "On-site parking"
    }
  ];

  // Filter to show only main training center
  const locations = allLocations.filter(location => location.isMain === true);

  return (
    <section className="relative py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-blue-950" />
                </div>
              </motion.div>
              <div className="bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
                <span className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Our Locations</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Visit Our Training Center
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our main training center offers comprehensive facilities and expert instructors 
              to help you succeed in your BVT career journey.
            </p>
          </motion.div>

          {/* Map and Location Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* Map - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 lg:h-[600px] rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-gray-200 shadow-xl"
            >
              {locations.length > 0 && (
                <>
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(locations[0].address)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="BVT Training Location"
                  ></iframe>
                  {/* Top Overlay Info Card */}
                  <div className="absolute top-3 left-3 right-3 z-10">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-fit max-w-xs border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-gray-900">
                          {locations[0].name}
                        </span>
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      </div>
                      <div className="text-sm text-gray-700 leading-relaxed mb-3">
                        {locations[0].address}
                      </div>
                      <div className="flex flex-col gap-2">
                        <a
                          href={`https://www.google.com/maps/dir//${encodeURIComponent(locations[0].address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
                        >
                          Get Directions
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locations[0].address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
                        >
                          View larger map
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Location Card - Right Side */}
            <div className="flex items-center">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden w-full ${
                    location.isMain ? 'border-yellow-400' : 'border-gray-200 hover:border-yellow-400'
                  }`}
                >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-2 right-2 w-16 h-16 border border-blue-600 rounded-full"></div>
                </div>

                <div className="relative z-10">
                  {/* Location Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center shadow-lg ${
                          location.isMain ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                        }`}
                      >
                        <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900">{location.name}</h3>
                        {location.isMain && (
                          <span className="text-xs bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-2 py-1 rounded-full font-bold">
                            Main Location
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-900 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-blue-700 font-medium mb-1">Address</div>
                        <div className="text-sm text-gray-900 font-semibold">{location.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                      <Mail className="w-4 h-4 text-purple-900 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-purple-700 font-medium mb-1">Email</div>
                        <div className="text-sm text-gray-900 font-semibold">{location.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                      <Clock className="w-4 h-4 text-orange-900 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-orange-700 font-medium mb-1">Hours</div>
                        <div className="text-sm text-gray-900 font-semibold">{location.hours}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <Car className="w-4 h-4 text-gray-900 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-700 font-medium mb-1">Parking</div>
                        <div className="text-sm text-gray-900 font-semibold">{location.parking}</div>
                      </div>
                    </div>
                  </div>

            
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
