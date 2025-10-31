"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Users,
  Search,
  MapPin,
  Calendar,
  X,
  Loader2,
  Stethoscope,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

const HospitalDoctorsList = ({ hospitalId, onClose }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  useEffect(() => {
    fetchHospitalDoctors();
  }, [hospitalId]);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialty, doctors]);

  const fetchHospitalDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/hospital/${hospitalId}/doctors`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data.doctors || []);
      setFilteredDoctors(data.doctors || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((doc) => {
        const fullName = `${doc.firstName} ${doc.lastName}`.toLowerCase();
        const specialties = doc.specialities?.map(s => s.speciality?.title).join(" ").toLowerCase() || "";
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          specialties.includes(searchTerm.toLowerCase()) ||
          doc.education?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((doc) =>
        doc.specialities?.some(s => s.speciality?.id === selectedSpecialty)
      );
    }

    setFilteredDoctors(filtered);
  };

  // Get unique specialties from all doctors
  const getUniqueSpecialties = () => {
    const specialties = new Map();
    doctors.forEach((doc) => {
      doc.specialities?.forEach((spec) => {
        if (spec.speciality) {
          specialties.set(spec.speciality.id, spec.speciality.title);
        }
      });
    });
    return Array.from(specialties, ([id, title]) => ({ id, title }));
  };

  const specialties = getUniqueSpecialties();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm lg:bg-white lg:backdrop-blur-0 lg:p-0 p-4 flex items-center lg:block justify-center">
      <Card className="w-full max-w-[95vw] lg:max-w-none lg:rounded-none lg:border-0 lg:shadow-none max-h-[95vh] lg:max-h-none overflow-hidden my-auto lg:my-0 shadow-2xl">
        <CardHeader className="border-b bg-blue-600 text-white sticky top-0 z-10 shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl lg:text-3xl font-bold">Our Expert Doctors</CardTitle>
                <p className="text-sm text-blue-100 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} available</span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-10 w-10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 lg:px-8 lg:py-8 overflow-y-auto lg:overflow-visible max-h-[calc(95vh-100px)] lg:max-h-none bg-gradient-to-b from-gray-50 to-white">
          {/* Desktop container width */}
          <div className="max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-5">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by doctor name, specialty, or qualification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl bg-white shadow-sm transition-all"
              />
            </div>

            {/* Specialty Filter */}
            {specialties.length > 0 && (
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl p-6 shadow-lg border-2 border-blue-100">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                        <Stethoscope className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">Filter by Medical Specialty</h3>
                        <p className="text-xs text-gray-600">Select a specialty to view doctors</p>
                      </div>
                    </div>
                    {selectedSpecialty !== "all" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedSpecialty("all")}
                        className="text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        Clear Filter
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5">
                    <Button
                      size="sm"
                      variant={selectedSpecialty === "all" ? "default" : "outline"}
                      onClick={() => setSelectedSpecialty("all")}
                      className={`rounded-full font-semibold px-5 py-2 transition-all transform hover:scale-105 ${
                        selectedSpecialty === "all" 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg border-0" 
                          : "bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 border-2"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        ✨ All Specialties
                      </span>
                    </Button>
                    {specialties.map((spec) => (
                      <Button
                        key={spec.id}
                        size="sm"
                        variant={selectedSpecialty === spec.id ? "default" : "outline"}
                        onClick={() => setSelectedSpecialty(spec.id)}
                        className={`rounded-full font-semibold px-4 py-2 transition-all transform hover:scale-105 ${
                          selectedSpecialty === spec.id 
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg border-0" 
                            : "bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 border-2"
                        }`}
                      >
                        {spec.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Doctors Grid */}
          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Doctors</h3>
              <p className="text-gray-600">Please wait...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Doctors</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <Button onClick={fetchHospitalDoctors} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Doctors Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("all");
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden transition-all duration-300 hover:scale-[1.02] border-0 rounded-2xl bg-white w-full max-w-[360px] mx-auto group" style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
                  <CardContent className="p-5">
                    {/* Header: Avatar + Name + Specialty + Rating */}
                    <div className="flex gap-3.5 mb-5">
                      {/* Avatar with online indicator */}
                      <div className="relative flex-shrink-0">
                        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl border-[3px] border-blue-100 shadow-lg group-hover:shadow-xl transition-shadow">
                          {doctor.firstName?.[0]}{doctor.lastName?.[0]}
                        </div>
                        <div className="absolute bottom-0 right-0 w-[18px] h-[18px] bg-[#10B981] rounded-full border-[3px] border-white shadow-md"></div>
                      </div>
                      
                      {/* Name, Specialty, Rating */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[19px] text-[#1F2937] mb-0.5 leading-tight truncate">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </h3>
                        {doctor.specialities && doctor.specialities.length > 0 && (
                          <p className="text-[#3B82F6] text-[13px] mb-1.5 font-semibold">
                            {doctor.specialities[0].speciality?.title}
                          </p>
                        )}
                        {/* Star Rating */}
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="flex gap-0.5">
                            <span className="text-[#FBBF24] text-[16px]">★</span>
                            <span className="text-[#FBBF24] text-[16px]">★</span>
                            <span className="text-[#FBBF24] text-[16px]">★</span>
                            <span className="text-[#FBBF24] text-[16px]">★</span>
                            <span className="text-[#E5E7EB] text-[16px]">★</span>
                          </div>
                          <span className="text-[#374151] font-semibold text-[14px]">4.0</span>
                        </div>
                        <span className="text-[#9CA3AF] text-[12px]">(129 Reviews)</span>
                      </div>
                    </div>

                    {/* Details List */}
                    <div className="space-y-2.5 mb-5">
                      {/* Experience */}
                      {doctor.doctorinfo?.experience && (
                        <div className="flex items-center gap-2.5 px-1">
                          <svg className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-[#374151] text-[13px] font-medium">{doctor.doctorinfo.experience} years exp</span>
                        </div>
                      )}
                      
                      {/* Consultation Fee */}
                      {doctor.doctorinfo?.consultationfee && (
                        <div className="flex items-center gap-2.5 px-1">
                          <svg className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-[#374151] text-[13px] font-medium">₹{doctor.doctorinfo.consultationfee}</span>
                        </div>
                      )}
                      
                      {/* Address */}
                      {doctor.doctorinfo?.address && (
                        <div className="flex items-start gap-2.5 px-1">
                          <MapPin className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0 mt-[2px]" />
                          <span className="text-[#374151] text-[13px] font-medium line-clamp-2 leading-[1.5]">{doctor.doctorinfo.address}</span>
                        </div>
                      )}
                      
                      {/* Education */}
                      {doctor.education && (
                        <div className="flex items-center gap-2.5 px-1">
                          <GraduationCap className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0" />
                          <span className="text-[#374151] text-[13px] font-medium">{doctor.education}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2.5">
                      <Button className="flex-1 h-10 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all px-3">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        Book Now
                      </Button>
                      <Button className="flex-1 h-10 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all px-3">
                        <Stethoscope className="w-4 h-4 mr-1.5" />
                        Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalDoctorsList;

