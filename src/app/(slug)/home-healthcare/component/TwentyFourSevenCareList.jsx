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
  Users,
  Calendar,
  CheckCircle,
  Stethoscope,
  ArrowLeft,
  Loader2,
  Zap,
  AlertCircle,
  X,
} from "lucide-react";

const TwentyFourSevenCareList = ({ onClose }) => {
  const router = useRouter();
  const [services24x7, setServices24x7] = useState([]);
  const [groupedServices, setGroupedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grouped");

  const unified = {
    headerGradient: "from-[#1E3B90] to-[#3D85EF]", // main header solid
    cardHeaderGradient: "from-[#1E3B90]/10 to-[#3D85EF]/10", // light tint inside cards
    accentText: "text-[#1E3B90]",
    buttonGradient: "from-[#1E3B90] to-[#3D85EF]",
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/home-healthcare/24-7-services");
        const result = await response.json();

        if (result.success) {
          setServices24x7(result.data || []);
          setGroupedServices(result.grouped || []);
        } else {
          setError("Failed to load 24/7 care services");
        }
      } catch (err) {
        console.error("Error fetching 24/7 services:", err);
        setError("Failed to load 24/7 care services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 🔷 Top Header */}
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
                    <Clock className="w-8 h-8 animate-pulse" />
                    24/7 Emergency Healthcare Services
                  </h2>
                  <p className="text-white/90 mt-1">
                    Round-the-clock healthcare support available anytime, anywhere
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

            {/* Toggle Buttons */}
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

          {/* 🔹 Content */}
          <div className="bg-gray-50 rounded-b-xl shadow-lg p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#1E3B90] animate-spin mb-4" />
                <p className="text-gray-600 text-lg">Loading 24/7 services...</p>
              </div>
            )}

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

            {!loading && !error && viewMode === "grouped" && groupedServices.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Available 24/7 Service Types ({groupedServices.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedServices.map((service, index) => (
                    <Card
                      key={index}
                      className="border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                      onClick={() =>
                        router.push(`/home-healthcare/${encodeURIComponent(service.serviceName)}`)
                      }
                    >
                      {/* 🔵 Card Header with Light Gradient */}
                      <div
                        className={`bg-gradient-to-r ${unified.cardHeaderGradient} p-4 rounded-t-xl flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-white/30 rounded-xl">
                            <Stethoscope className="w-6 h-6 text-[#1E3B90]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{service.serviceName}</h3>
                            <p className={`${unified.accentText} text-sm font-semibold mt-1`}>
                              {service.totalProviders} providers
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-white/30 text-[#1E3B90] text-xs">24/7</Badge>
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
                          {service.availableIn?.length > 0 && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>
                                {service.availableIn.length} Location
                                {service.availableIn.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 mb-4">
                          {["24/7 Emergency Support", "Immediate Response"].map((f, i) => (
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
                  ))}
                </div>
              </>
            )}

            {!loading && !error && viewMode === "all" && services24x7.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  All 24/7 Healthcare Providers ({services24x7.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services24x7.map((service) => (
                    <Card
                      key={service.id}
                      className="border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/home-healthcare/${encodeURIComponent(
                            service.serviceName
                          )}/${service.hospital.id}`
                        )
                      }
                    >
                      {/* 🔵 Card Header Light Gradient */}
                      <div
                        className={`bg-gradient-to-r ${unified.cardHeaderGradient} p-4 rounded-t-xl flex items-center gap-3`}
                      >
                        <div className="p-2 bg-white/30 rounded-lg flex items-center justify-center w-12 h-12">
                          <Shield className="w-5 h-5 text-[#1E3B90]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-gray-800 line-clamp-2">
                            {service.hospital.name}
                          </h3>
                          <p className={`${unified.accentText} text-sm font-semibold`}>
                            {service.serviceName}
                          </p>
                        </div>
                        <Badge className="bg-white/30 text-[#1E3B90] text-xs">24/7</Badge>
                      </div>

                      <CardContent className="p-5 bg-white rounded-b-xl">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{service.hospital.city}, {service.hospital.state}</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {[
                            { icon: <Zap className="w-4 h-4" />, text: "Immediate Response" },
                            { icon: <Shield className="w-4 h-4" />, text: "Qualified Staff" },
                          ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className={unified.accentText}>{f.icon}</div>
                              <span className="text-sm text-gray-700">{f.text}</span>
                            </div>
                          ))}
                        </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwentyFourSevenCareList;
