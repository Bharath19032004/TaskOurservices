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
  HeartPulse,
  UserCheck,
  Home,
  Sparkles,
  HandHeart,
  Baby,
  Smile,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const CareServicesList = ({ onClose, homeHealthcareService, serviceName }) => {
  const router = useRouter();
  const [careServices, setCareServices] = useState([]);
  const [groupedServices, setGroupedServices] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grouped");

  // Unified Theme (Same as all previous components)
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
        const response = await fetch("/api/home-healthcare/care-services");
        const result = await response.json();

        if (result.success) {
          setCareServices(result.data || []);
          setGroupedServices(result.grouped || []);
          setStatistics(result.statistics);
        } else {
          setError("Failed to load care services");
        }
      } catch (err) {
        console.error("Error fetching care services:", err);
        setError("Failed to load care services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getCareTypeIcon = (careType) => {
    const iconClass = "w-5 h-5 text-[#1E3B90]";
    switch (careType) {
      case "Elder Care":
        return <Users className={iconClass} />;
      case "Post-Operative Care":
        return <Activity className={iconClass} />;
      case "Nursing Care":
        return <Stethoscope className={iconClass} />;
      case "Therapy Care":
        return <Activity className={iconClass} />;
      case "Pediatric Care":
        return <Baby className={iconClass} />;
      case "Palliative Care":
        return <HeartPulse className={iconClass} />;
      default:
        return <Heart className={iconClass} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Header */}
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
                    <Heart className="w-8 h-8" />
                    Personalized Care Services
                  </h2>
                  <p className="text-white/90 mt-1">
                    Compassionate, personalized healthcare in the comfort of your home
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

            {/* View Mode Toggle */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setViewMode("grouped")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  viewMode === "grouped"
                    ? "bg-white text-[#1E3B90]"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                By Service Type
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  viewMode === "all"
                    ? "bg-white text-[#1E3B90]"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                All Providers
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-50 rounded-b-xl shadow-lg p-6">
            {/* Statistics Banner */}
            {statistics && !loading && (
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">{statistics.totalServices}</h4>
                    <p className="text-xs text-gray-600">Care Services</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">{statistics.totalBookings}</h4>
                    <p className="text-xs text-gray-600">Happy Patients</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Smile className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">{groupedServices.length}</h4>
                    <p className="text-xs text-gray-600">Service Types</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">{statistics.averageRating || 0} stars</h4>
                    <p className="text-xs text-gray-600">Care Rating</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Care Benefits Banner */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: <Heart className="w-6 h-6" />, title: "Personalized Care", desc: "Tailored to your needs" },
                { icon: <Home className="w-6 h-6" />, title: "Home Comfort", desc: "Care in familiar space" },
                { icon: <HandHeart className="w-6 h-6" />, title: "Compassionate", desc: "Treating with love" },
                { icon: <UserCheck className="w-6 h-6" />, title: "Dedicated Staff", desc: "Focused attention" },
              ].map((feature, idx) => (
                <Card key={idx} className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className={unified.accentText}>{feature.icon}</div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#1E3B90] animate-spin mb-4" />
                <p className="text-gray-600 text-lg">Loading care services...</p>
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
            {!loading && !error && careServices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <Heart className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No care services available at the moment</p>
              </div>
            )}

            {/* Grouped Services View */}
            {!loading && !error && viewMode === "grouped" && groupedServices.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Available Care Services ({groupedServices.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedServices.map((service, index) => {
                    const careType = service.careTypes?.[0] || "General Care";
                    return (
                      <Card
                        key={index}
                        className="border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                        onClick={() =>
                          router.push(`/home-healthcare/${encodeURIComponent(service.serviceName)}`)
                        }
                      >
                        {/* Card Header */}
                        <div
                          className={`bg-gradient-to-r ${unified.cardHeaderGradient} p-4 rounded-t-xl flex items-center justify-between`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/30 rounded-xl">
                              {getCareTypeIcon(careType)}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">{service.serviceName}</h3>
                              <p className={`${unified.accentText} text-sm font-semibold mt-1`}>
                                {careType}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                            <Heart className="w-3 h-3 mr-1" />
                            Care
                          </Badge>
                        </div>

                        <CardContent className="p-5 bg-white rounded-b-xl">
                          <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              <span>
                                {service.totalProviders} Provider
                                {service.totalProviders > 1 ? "s" : ""}
                              </span>
                            </div>
                            {service.totalBookings > 0 && (
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>
                                  {service.totalBookings} Patient
                                  {service.totalBookings > 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </div>

                          {service.availableIn?.length > 0 && (
                            <div className="flex items-center gap-1 mb-4 text-xs text-gray-600">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">
                                Available in {service.availableIn.slice(0, 2).join(", ")}
                                {service.availableIn.length > 2 && ` +${service.availableIn.length - 2} more`}
                              </span>
                            </div>
                          )}

                          <div className="space-y-2 mb-4">
                            {["Personalized Care", "Compassionate Service"].map((f, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle className={`w-4 h-4 ${unified.accentText}`} />
                                <span className="text-sm text-gray-700">{f}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Starting from</p>
                              <p className={`text-2xl font-bold ${unified.accentText}`}>
                                ₹{service.minPrice}
                              </p>
                            </div>
                            <button
                              className={`px-4 py-2 bg-gradient-to-r ${unified.buttonGradient} text-white rounded-lg font-semibold text-sm flex items-center gap-2`}
                            >
                              <Calendar className="w-4 h-4" />
                              View
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}

            {/* All Providers View */}
            {!loading && !error && viewMode === "all" && careServices.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  All Care Service Providers ({careServices.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {careServices.map((service) => (
                    <Card
                      key={service.id}
                      className="border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/home-healthcare/${encodeURIComponent(service.serviceName)}/${service.hospital.id}`
                        )
                      }
                    >
                      {/* Card Header */}
                      <div
                        className={`bg-gradient-to-r ${unified.cardHeaderGradient} p-4 rounded-t-xl flex items-center gap-3`}
                      >
                        {service.hospital.logo ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-300 flex-shrink-0">
                            <Image
                              src={service.hospital.logo}
                              width={48}
                              height={48}
                              alt={service.hospital.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="p-2 bg-white/30 rounded-lg flex items-center justify-center w-12 h-12">
                            <Heart className="w-5 h-5 text-[#1E3B90]" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-gray-800 line-clamp-2">
                            {service.hospital.name}
                          </h3>
                          <p className={`${unified.accentText} text-sm font-semibold`}>
                            {service.serviceName}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                            <Heart className="w-3 h-3 mr-1" />
                            Care
                          </Badge>
                          <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                            {service.careType}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-5 bg-white rounded-b-xl">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{service.hospital.city}, {service.hospital.state}</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {[
                            { icon: <Heart className="w-4 h-4" />, text: "Personalized Care" },
                            { icon: <Home className="w-4 h-4" />, text: "Home Visit Available" },
                          ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className={unified.accentText}>{f.icon}</div>
                              <span className="text-sm text-gray-700">{f.text}</span>
                            </div>
                          ))}
                        </div>

                        {service.hospital.experience && (
                          <div className="flex items-center gap-2 mb-4 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <Award className="w-4 h-4 text-[#1E3B90]" />
                            <span>{service.hospital.experience}+ years of caring</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Starting from</p>
                            <p className={`text-xl font-bold ${unified.accentText}`}>
                              ₹{service.minPrice}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`tel:${service.hospital.mobile}`, "_self");
                              }}
                              className="p-2 bg-[#EEF3FF] text-[#1E3B90] rounded-lg hover:bg-[#E1E8FF]"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              className={`px-3 py-2 bg-gradient-to-r ${unified.buttonGradient} text-white rounded-lg font-semibold text-xs`}
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* Why Choose Care Services */}
            {!loading && !error && (
              <div className="mt-8">
                <Card className="border border-gray-200 bg-gradient-to-r from-[#EEF3FF] to-[#E1E8FF]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-[#1E3B90]" />
                      Why Choose Our Personalized Care Services?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { icon: <Heart className="w-5 h-5" />, title: "Compassionate Care", desc: "Treating every patient with love and respect" },
                        { icon: <Home className="w-5 h-5" />, title: "Home Comfort", desc: "Care in the comfort of your own home" },
                        { icon: <UserCheck className="w-5 h-5" />, title: "Personalized Attention", desc: "Tailored care plans for each patient" },
                        { icon: <HandHeart className="w-5 h-5" />, title: "Dedicated Support", desc: "Focused, attentive healthcare professionals" },
                      ].map((benefit, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mb-3">
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

            {/* Provider Info Section */}
            {!loading && !error && homeHealthcareService && (
              <div className="mt-6">
                <Card className="border border-gray-200 bg-gradient-to-r from-[#EEF3FF] to-[#E1E8FF]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Current Service Provider Information
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareServicesList;