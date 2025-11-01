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
  GraduationCap,
  Briefcase,
  UserCheck,
  FileText,
  BadgeCheck,
  TrendingUp,
  Home,
  Sparkles,
  AlertCircle,
} from "lucide-react";

const ProfessionalsServicesList = ({ onClose, homeHealthcareService, serviceName }) => {
  const router = useRouter();
  const [professionalServices, setProfessionalServices] = useState([]);
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
        const response = await fetch("/api/home-healthcare/professional-services");
        const result = await response.json();

        if (result.success) {
          setProfessionalServices(result.data || []);
          setGroupedServices(result.grouped || []);
          setStatistics(result.statistics);
        } else {
          setError("Failed to load professional services");
        }
      } catch (err) {
        console.error("Error fetching professional services:", err);
        setError("Failed to load professional services");
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
                    <Stethoscope className="w-8 h-8" />
                    Qualified Healthcare Professionals
                  </h2>
                  <p className="text-white/90 mt-1">
                    Expert doctors, nurses, and healthcare staff ready to serve you
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

          {/* Content */}
          <div className="bg-gray-50 rounded-b-xl shadow-lg p-6">
            {/* Statistics Banner */}
            {statistics && !loading && (
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">
                      {statistics.totalProfessionals}
                    </h4>
                    <p className="text-xs text-gray-600">Total Professionals</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Stethoscope className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">
                      {statistics.totalDoctors}
                    </h4>
                    <p className="text-xs text-gray-600">Qualified Doctors</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Briefcase className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">
                      {statistics.totalStaff}
                    </h4>
                    <p className="text-xs text-gray-600">Healthcare Staff</p>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#EEF3FF] rounded-full flex items-center justify-center mx-auto mb-2">
                      <GraduationCap className="w-6 h-6 text-[#1E3B90]" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl mb-1">
                      {statistics.averageProfessionalsPerService}
                    </h4>
                    <p className="text-xs text-gray-600">Avg per Service</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Professional Benefits Banner */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: <GraduationCap className="w-6 h-6" />, title: "Qualified Experts", desc: "Certified professionals" },
                { icon: <BadgeCheck className="w-6 h-6" />, title: "Verified Credentials", desc: "Licensed & registered" },
                { icon: <Award className="w-6 h-6" />, title: "Experienced Team", desc: "Years of expertise" },
                { icon: <UserCheck className="w-6 h-6" />, title: "Patient-Focused", desc: "Compassionate care" },
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
                <p className="text-gray-600 text-lg">Loading professional services...</p>
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
            {!loading && !error && professionalServices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <Stethoscope className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No professional services available at the moment</p>
              </div>
            )}

            {/* Grouped Services View */}
            {!loading && !error && viewMode === "grouped" && groupedServices.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Services with Qualified Professionals ({groupedServices.length})
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
                      {/* Card Header with Light Gradient */}
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
                              {service.totalProfessionals} professionals
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Qualified
                        </Badge>
                      </div>

                      <CardContent className="p-5 bg-white rounded-b-xl">
                        <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>
                              {service.totalProfessionals} Professional
                              {service.totalProfessionals > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5" />
                            <span>
                              {service.totalDoctors} Doctor
                              {service.totalDoctors > 1 ? "s" : ""}
                            </span>
                          </div>
                          {service.totalStaff > 0 && (
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" />
                              <span>{service.totalStaff} Staff</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mb-4 text-xs text-gray-600">
                          <Shield className="w-3.5 h-3.5" />
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
                          {["Verified Professionals", "Qualified Doctors"].map((f, i) => (
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

            {/* All Providers View */}
            {!loading && !error && viewMode === "all" && professionalServices.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  All Providers with Qualified Professionals ({professionalServices.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {professionalServices.map((service) => (
                    <Card
                      key={service.id}
                      className="border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/home-healthcare/${encodeURIComponent(service.serviceName)}/${service.hospital.id}`
                        )
                      }
                    >
                      {/* Card Header Light Gradient */}
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
                        <div className="flex flex-col gap-1">
                          <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Qualified
                          </Badge>
                          {service.professionals.totalCount > 0 && (
                            <Badge className="bg-white/30 text-[#1E3B90] text-xs">
                              {service.professionals.totalCount} Pros
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardContent className="p-5 bg-white rounded-b-xl">
                        <div className="flex flex-wrap gap-2 mb-3 text-xs">
                          {service.professionals.doctorCount > 0 && (
                            <div className="flex items-center gap-1 bg-[#EEF3FF] text-[#1E3B90] px-2 py-1 rounded">
                              <Stethoscope className="w-3 h-3" />
                              <span>
                                {service.professionals.doctorCount} Doctor
                                {service.professionals.doctorCount > 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                          {service.professionals.staffCount > 0 && (
                            <div className="flex items-center gap-1 bg-[#EEF3FF] text-[#1E3B90] px-2 py-1 rounded">
                              <Briefcase className="w-3 h-3" />
                              <span>{service.professionals.staffCount} Staff</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{service.hospital.city}, {service.hospital.state}</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {[
                            { icon: <GraduationCap className="w-4 h-4" />, text: "Qualified Professionals" },
                            { icon: <BadgeCheck className="w-4 h-4" />, text: "Verified Credentials" },
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

            {/* Why Choose Professional Services */}
            {!loading && !error && (
              <div className="mt-8">
                <Card className="border border-gray-200 bg-gradient-to-r from-[#EEF3FF] to-[#E1E8FF]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-[#1E3B90]" />
                      Why Choose Our Qualified Professionals?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { icon: <GraduationCap className="w-5 h-5" />, title: "Highly Qualified", desc: "Certified and registered professionals" },
                        { icon: <Award className="w-5 h-5" />, title: "Experienced Team", desc: "Years of medical expertise" },
                        { icon: <UserCheck className="w-5 h-5" />, title: "Patient-Focused", desc: "Compassionate care approach" },
                        { icon: <BadgeCheck className="w-5 h-5" />, title: "Verified Credentials", desc: "All licenses and certifications verified" },
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

export default ProfessionalsServicesList;