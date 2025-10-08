"use client";

const COMPANIES = [
  {
    name: "US Navy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/200px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
  },
  {
    name: "BVT Academy",
    logo: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=150&h=80&fit=crop"
  },
  {
    name: "Fleet Command",
    logo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=150&h=80&fit=crop"
  },
  {
    name: "Coast Guard",
    logo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=80&fit=crop"
  },
  {
    name: "BVT Reserve",
    logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&h=80&fit=crop"
  },
  {
    name: "Maritime Admin",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=80&fit=crop"
  },
];

export default function TrustedCompanies() {
  return (
    <section className="py-20 px-8 lg:py-28 bg-gray-50">
      <div className="container mx-auto grid items-center place-items-center">
        <div className="text-center">
          <p className="mb-4 uppercase text-sm font-bold text-blue-900 tracking-wide">
            OFFICIAL PARTNERS
          </p>
          <h2 className="mb-12 text-4xl font-bold text-gray-900">
            Recognized by Leading BVT Organizations
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10">
          {COMPANIES.map((company, key) => (
            <div
              key={key}
              className="w-40 h-20 bg-white rounded-lg flex items-center justify-center border-2 border-blue-300 hover:border-yellow-600 hover:shadow-lg transition-all overflow-hidden p-2"
            >
              <img 
                src={company.logo}
                alt={company.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

