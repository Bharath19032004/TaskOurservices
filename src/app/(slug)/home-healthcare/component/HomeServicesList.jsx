"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Phone,
  Shield,
  Star,
  Home,
  Award,
  Users,
  Calendar,
  CheckCircle,
  IndianRupee,
  Stethoscope,
  Activity,
  Heart,
  X,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

const HomeServicesList = ({ onClose, homeHealthcareService, serviceName }) => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [atHomeServices, setAtHomeServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unified Theme
  const unified = {
    headerGradient: "from-[#1E3B90] to-[#3D85EF]",
    cardHeaderGradient: "from-[#1E3B90]/10 to-[#3D85EF]/10",
    accentText: "text-[#1E3B90]",
    buttonGradient: "from-[#1E3B90] to-[#3D85EF]",
    lightBg: "bg-[#EEF3FF]",
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/home-healthcare/service-types");
        const result = await response.json();

        if (result.success && result.data) {
          const mappedServices = result.data.map((service, index) => ({
            id: index + 1,
            name: service.serviceName,
            icon: getServiceIcon(service.serviceName),
            description: getServiceDescription(service.serviceName),
            features: getServiceFeatures(service.serviceName),
            startingPrice: service.minPrice || "999",
            maxPrice: service.maxPrice,
            available: service.totalProviders > 0,
            totalProviders: service.totalProviders,
            availableIn: service.availableIn,
            providers: service.providers,
            raw: service,
          }));
          setAtHomeServices(mappedServices);
        } else {
          setError("Failed to load services");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (serviceName) => {
    const name = serviceName?.toLowerCase() || "";
    const iconClass = "w-6 h-6 text-[#1E3B90]";
    if (name.includes("nursing") || name.includes("nurse")) return <Stethoscope className={iconClass} />;
    if (name.includes("physio")) return <Activity className={iconClass} />;
    if (name.includes("doctor") || name.includes("physician")) return <Stethoscope className={iconClass} />;
    if (name.includes("elder") || name.includes("elderly")) return <Heart className={iconClass} />;
    if (name.includes("lab") || name.includes("test")) return <Activity className={iconClass} />;
    if (name.includes("equipment") || name.includes("rental")) return <Shield className={iconClass} />;
    if (name.includes("post") || name.includes("operative")) return <Shield className={iconClass} />;
    if (name.includes("vaccination") || name.includes("vaccine")) return <Stethoscope className={iconClass} />;
    return <Home className={iconClass} />;
  };

  const getServiceDescription = (serviceName) => {
    return `Professional ${serviceName} services provided in the comfort of your home by qualified healthcare professionals.`;
  };

  const getServiceFeatures = (serviceName) => {
    return [
      "24/7 Availability",
      "Qualified Professionals",
      "Personalized Care",
      "Affordable Pricing",
    ];
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`bg-gradient-to-r ${unified.headerGradient} rounded-t-xl shadow-lg p-6 sticky top-0 z-10`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Home className="w-8 h-8" />
                    At Home Healthcare Services
                  </h2>
                  <p className="text-white/90 mt-1">
                    Professional healthcare services delivered to your doorstep
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="bg-gray-50 rounded-b-xl shadow-lg p-6">
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#1E3B90] animate-spin mb-4" />
                <p className="text-gray-600 text-lg">Loading services...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="w-12 h-12 text-[#1E3B90] mb-4" />
                <p className="text-[#1E3B90] text-lg mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-gradient-to-r from-[#1E3B90] to-[#3D85EF] text-white rounded-lg hover:opacity-90 transition-all"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && atHomeServices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <Home className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No services available at the moment</p>
              </div>
            )}

            {/* Services Grid */}
            {!loading && !error && atHomeServices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {atHomeServices.map((service) => (
                  <Card
                    key={service.id}
                    className="h-full flex flex-col overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    {/* Card Header */}
                    <div
                      className={`bg-gradient-to-r ${unified.cardHeaderGradient} p-5 rounded-t-2xl flex items-center gap-4`}
                    >
                      <div className="p-3 bg-white/30 rounded-xl flex items-center justify-center w-12 h-12">
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-800 truncate">
                          {service.name}
                        </h3>
                        <p className={`${unified.accentText} text-sm font-semibold mt-1`}>
                          {service.available ? `${service.totalProviders} providers` : "Not available"}
                        </p>
                      </div>
                      {service.available && (
                        <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                          Available
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-5 flex flex-col flex-grow justify-between bg-white">
                      <div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {service.description}
                        </p>

                        {service.totalProviders && (
                          <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              <span>{service.totalProviders} Provider{service.totalProviders > 1 ? "s" : ""}</span>
                            </div>
                            {service.availableIn?.length > 0 && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{service.availableIn.length} Location{service.availableIn.length > 1 ? "s" : ""}</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="space-y-2 mb-4">
                          {service.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className={`w-4 h-4 ${unified.accentText}`} />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Starting from</p>
                          <p className={`text-2xl font-bold ${unified.accentText}`}>
                            ₹{service.startingPrice}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/home-healthcare/${encodeURIComponent(service.name)}`);
                            }}
                            className={`px-4 py-2 bg-gradient-to-r ${unified.buttonGradient} text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:scale-105 transition-transform`}
                          >
                            <Calendar className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedService(service);
                            }}
                            className="px-3 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Provider Info */}
            {!loading && !error && homeHealthcareService && (
              <div className="mt-8">
                <Card className="border border-gray-200 bg-gradient-to-r from-[#EEF3FF] to-[#E1E8FF] rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Service Provider Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                        <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-[#1E3B90]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Provider</p>
                          <p className="font-semibold text-gray-900">
                            {homeHealthcareService?.hospital?.hspInfo?.regname || "Healthcare Provider"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                        <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#1E3B90]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-semibold text-gray-900">
                            {homeHealthcareService?.hospital?.hspcontact?.city}, {homeHealthcareService?.hospital?.hspcontact?.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                        <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-[#1E3B90]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact</p>
                          <p className="font-semibold text-gray-900">
                            {homeHealthcareService?.hospital?.mobile || "Contact Provider"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Why Choose */}
            {!loading && !error && (
              <div className="mt-8">
                <Card className="border border-gray-200 rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Why Choose At-Home Healthcare Services?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { icon: <Home className="w-5 h-5" />, title: "Comfort of Home", desc: "Receive care in familiar surroundings" },
                        { icon: <Clock className="w-5 h-5" />, title: "Convenient Timing", desc: "Schedule as per your convenience" },
                        { icon: <Award className="w-5 h-5" />, title: "Qualified Professionals", desc: "Experienced healthcare experts" },
                        { icon: <IndianRupee className="w-5 h-5" />, title: "Cost Effective", desc: "Affordable and transparent pricing" },
                      ].map((benefit, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 border-2 border-gray-200">
                            <div className={unified.accentText}>{benefit.icon}</div>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                          <p className="text-sm text-gray-600">{benefit.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="p-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1E3B90] to-[#3D85EF] text-white">
                    {selectedService.icon}
                  </div>
                  {selectedService.name}
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                {selectedService.description}
              </p>

              {selectedService.totalProviders && (
                <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#1E3B90]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Available Providers</p>
                      <p className="font-bold text-gray-900">{selectedService.totalProviders} Provider{selectedService.totalProviders > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  {selectedService.availableIn?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#1E3B90]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Locations</p>
                        <p className="font-bold text-gray-900">{selectedService.availableIn.length} Cit{selectedService.availableIn.length > 1 ? "ies" : "y"}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedService.availableIn?.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-base">Available in:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.availableIn.slice(0, 10).map((city, idx) => (
                      <Badge key={idx} className="bg-[#EEF3FF] text-[#1E3B90] border border-[#E1E8FF]">
                        {city}
                      </Badge>
                    ))}
                    {selectedService.availableIn.length > 10 && (
                      <Badge className="bg-gray-100 text-gray-700">
                        +{selectedService.availableIn.length - 10} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <h4 className="font-bold text-gray-900 mb-4 text-lg">Key Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {selectedService.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <CheckCircle className={`w-5 h-5 ${unified.accentText}`} />
                    <span className="text-gray-900 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className={`bg-gradient-to-br ${unified.buttonGradient} p-6 rounded-xl text-white mb-6`}>
                <p className="text-sm text-white/90 mb-2">Starting Price</p>
                <p className="text-4xl font-bold text-white mb-3">
                  ₹{selectedService.startingPrice}
                </p>
                <p className="text-sm text-white/90">*Price may vary based on service duration and requirements</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    router.push(`/home-healthcare/${encodeURIComponent(selectedService.name)}`);
                    setSelectedService(null);
                  }}
                  className={`flex-1 bg-gradient-to-r ${unified.buttonGradient} text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-105`}
                >
                  <Calendar className="w-5 h-5" />
                  View All Providers
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeServicesList;