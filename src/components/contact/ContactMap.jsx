"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, Car, ArrowRight, Sparkles } from "lucide-react";

export default function ContactMap() {
  const allLocations = [
    {
      name: "Main Training Center",
      address: "123 BVT Base Road, San Diego, CA 92101",
      phone: "+1 (555) 123-4567",
      email: "main@navytraining.com",
      hours: "Mon-Fri: 8AM-6PM EST",
      coordinates: "32.7157° N, 117.1611° W",
      parking: "Free parking available",
      isMain: true
    },
    {
      name: "East Coast Branch",
      address: "456 BVT Station Blvd, Norfolk, VA 23511",
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

  // Filter to show only main training center
  const locations = allLocations.filter(location => location.isMain === true);

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
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
            className="text-center mb-12 lg:mb-16"
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
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

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-2xl lg:rounded-3xl mb-12 overflow-hidden border-2 border-blue-200"
          >
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-600 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-blue-600 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-blue-600 rounded-full"></div>
            </div>

            {/* Map Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                >
                  <MapPin className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">Interactive Map</h3>
                <p className="text-blue-700 mb-4 text-base lg:text-lg">Click on markers to view location details</p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-6 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg"
                >
                  Open Full Map
                </motion.button>
              </div>
            </div>

            {/* Location Marker */}
            {locations.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.3 }}
                className="absolute w-6 h-6 rounded-full border-4 border-white shadow-xl cursor-pointer bg-red-500"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                title={locations[0].name}
              />
            )}
          </motion.div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8 max-w-2xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden ${
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

                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                      <Phone className="w-4 h-4 text-green-900 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-green-700 font-medium mb-1">Phone</div>
                        <div className="text-sm text-gray-900 font-semibold">{location.phone}</div>
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

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 py-3 px-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      Get Directions
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                      Schedule Visit
                    </motion.button>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 lg:mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border-2 border-yellow-400/30">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 border-2 border-yellow-500 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-yellow-500 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Planning Your Visit?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                  All our locations are equipped with state-of-the-art training facilities, 
                  comfortable accommodations, and experienced instructors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 px-8 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg"
                  >
                    Download Campus Map
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all"
                  >
                    Virtual Tour
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
