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
  X,
  ArrowLeft,
  Loader2,
  TrendingDown,
  DollarSign,
  Tag,
  Percent,
  Wallet,
  Home,
  Sparkles,
  ArrowUpDown,
  AlertCircle,
} from "lucide-react";

const PricingServicesList = ({ onClose, homeHealthcareService, serviceName }) => {
  const router = useRouter();
  const [pricingServices, setPricingServices] = useState([]);
  const [groupedServices, setGroupedServices] = useState([]);
  const [servicesByPriceRange, setServicesByPriceRange] = useState({});
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

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
        const response = await fetch("/api/home-healthcare/pricing-services");
        const result = await response.json();

        if (result.success) {
          setPricingServices(result.data || []);
          setGroupedServices(result.grouped || []);
          setServicesByPriceRange(result.byPriceRange || {});
          setStatistics(result.statistics);
        } else {
          setError("Failed to load pricing services");
        }
      } catch (err) {
        console.error("Error fetching pricing services:", err);
        setError("Failed to load pricing services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getCurrentViewServices = () => {
    if (viewMode === "grouped") return groupedServices;
    if (viewMode === "budget") return servicesByPriceRange.budget || [];
    if (viewMode === "moderate") return servicesByPriceRange.moderate || [];
    if (viewMode === "premium") return servicesByPriceRange.premium || [];
    
    const services = [...pricingServices];
    return sortOrder === "asc" 
      ? services.sort((a, b) => a.priceValue - b.priceValue)
      : services.sort((a, b) => b.priceValue - a.priceValue);
  };

  const getAffordabilityLabel = (mode) => {
    if (mode === "budget") return "Budget (Under ₹1000)";
    if (mode === "moderate") return "Moderate (₹1000-2000)";
    if (mode === "premium") return "Premium (Above ₹2000)";
    return "All Services";
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
                    <IndianRupee className="w-8 h-8" />
                    Affordable Healthcare Services
                  </h2>
                  <p className="text-white/90 mt-1">
                    Quality healthcare at competitive prices - sorted by affordability
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
            <div className="mt-4 flex flex-wrap gap-2">
              {["all", "budget", "moderate", "premium", "grouped"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    viewMode === mode
                      ? "bg-white text-[#1E3B90]"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {mode === "all" ? "All Services" :
                   mode === "grouped" ? "By Service Type" :
                   getAffordabilityLabel(mode)}
                </button>
              ))}
              {viewMode === "all" && (
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-4 py-2 rounded-lg font-semibold text-sm bg-white/20 text-white hover:bg-white/30 transition-all flex items-center gap-2"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {sortOrder === "asc" ? "Low to High" : "High to Low"}
                </button>
              )}
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
                      <IndianRupee className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">₹{statistics.lowestPrice}</h4>
                    <p className="text-xs text-gray-600">Lowest Starting Price</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">₹{statistics.averagePrice}</h4>
                    <p className="text-xs text-gray-600">Average Price</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Tag className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">{statistics.servicesWithDiscount}</h4>
                    <p className="text-xs text-gray-600">Discounted Services</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Stethoscope className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">{statistics.totalServices}</h4>
                    <p className="text-xs text-gray-600">Total Services</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Price Range Info */}
            {statistics && !loading && viewMode === "all" && (
              <div className="mb-6 bg-gradient-to-r from-[#EEF3FF] to-[#E1E8FF] border border-gray-200 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-[#1E3B90]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Budget Services</p>
                      <p className="font-bold text-gray-900">{statistics.budgetServices} (Under ₹1000)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-[#1E3B90]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Moderate Services</p>
                      <p className="font-bold text-gray-900">{statistics.moderateServices} (₹1000-2000)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#EEF3FF] rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#1E3B90]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Premium Services</p>
                      <p className="font-bold text-gray-900">{statistics.premiumServices} (Above ₹2000)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#1E3B90] animate-spin mb-4" />
                <p className="text-gray-600 text-lg">Loading pricing information...</p>
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
            {!loading && !error && getCurrentViewServices().length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <IndianRupee className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No services available in this price range</p>
              </div>
            )}

            {/* Grouped Services View */}
            {!loading && !error && viewMode === "grouped" && groupedServices.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Services Grouped by Type - Sorted by Price ({groupedServices.length})
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
                      {/* Card Header */}
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
                        <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          ₹{service.minPrice}
                        </Badge>
                      </div>

                      <CardContent className="p-5 bg-white rounded-b-xl">
                        <div className="flex items-center gap-3 mb-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span>Min: ₹{service.minPrice}</span>
                          </div>
                          {service.averagePrice && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>Avg: ₹{service.averagePrice}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mb-4 text-xs text-gray-600">
                          <Users className="w-3.5 h-3.5" />
                          <span>
                            {service.totalProviders} Provider
                            {service.totalProviders > 1 ? "s" : ""} Available
                          </span>
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
                          {["Affordable Pricing", "Quality Service"].map((f, i) => (
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

            {/* All / Filtered by Price Range */}
            {!loading && !error && viewMode !== "grouped" && getCurrentViewServices().length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {viewMode === "all" && `All Services Sorted by Price (${getCurrentViewServices().length})`}
                  {viewMode === "budget" && `Budget-Friendly Services (${getCurrentViewServices().length})`}
                  {viewMode === "moderate" && `Moderately Priced Services (${getCurrentViewServices().length})`}
                  {viewMode === "premium" && `Premium Services (${getCurrentViewServices().length})`}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentViewServices().map((service) => (
                    <Card
                      key={service.id}
                      className="border border-gray-200 hover:shadow-xl transition-all cursor-pointer relative"
                      onClick={() =>
                        router.push(
                          `/home-healthcare/${encodeURIComponent(service.serviceName)}/${service.hospital.id}`
                        )
                      }
                    >
                      {/* Discount Badge */}
                      {service.hasDiscount && service.discountPercentage > 0 && (
                        <div className="absolute top-3 right-3 z-10">
                          {/* <Badge className="bg-red-500 text-white text-xs">
                    
                            {service.discountPercentage}
                             <Percent className="w-3 h-3 mr-1" />
                          </Badge> */}
                        </div>
                      )}

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
                            <Shield className="w-5 h-5 text-[#1E3B90]" />
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
                        <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                          {service.priceRange}
                        </Badge>
                      </div>

                      <CardContent className="p-5 bg-white rounded-b-xl">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{service.hospital.city}, {service.hospital.state}</span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-600">Starting Price:</span>
                            <span className="font-bold text-gray-900">₹{service.minPrice}</span>
                          </div>
                          {service.maxPrice && (
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-600">Max Price:</span>
                              <span className="font-bold text-gray-900">₹{service.maxPrice}</span>
                            </div>
                          )}
                          {service.finalprice && (
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">Final Price:</span>
                              <span className="font-bold text-green-600">₹{service.finalprice}</span>
                            </div>
                          )}
                        </div>

                        {service.hospital.experience && (
                          <div className="flex items-center gap-2 mb-4 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <Award className="w-4 h-4 text-[#1E3B90]" />
                            <span>{service.hospital.experience}+ years experience</span>
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
                              Book Now
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* Why Choose Affordable Services */}
            {!loading && !error && (
              <div className="mt-8">
                <Card className="border border-gray-200 bg-gradient-to-r from-[#EEF3FF] to-[#E1E8FF]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Wallet className="w-6 h-6 text-[#1E3B90]" />
                      Benefits of Our Affordable Healthcare Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { icon: <TrendingDown className="w-5 h-5" />, title: "Competitive Pricing", desc: "Best rates in the market" },
                        { icon: <Tag className="w-5 h-5" />, title: "Discounts Available", desc: "Special offers and packages" },
                        { icon: <Shield className="w-5 h-5" />, title: "Quality Assured", desc: "No compromise on service quality" },
                        { icon: <CheckCircle className="w-5 h-5" />, title: "Transparent Pricing", desc: "No hidden charges" },
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
                          <IndianRupee className="w-5 h-5 text-[#1E3B90]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Starting Price</p>
                          <p className="font-semibold text-gray-900">
                            ₹{homeHealthcareService?.minPrice || homeHealthcareService?.startingPrice || "N/A"}
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

export default PricingServicesList;