"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Search,
  X,
  Loader2,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Navigation,
  Clock,
} from "lucide-react";

const HospitalBranchesList = ({ hospitalId, onClose }) => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHospitalBranches();
  }, [hospitalId]);

  useEffect(() => {
    filterBranches();
  }, [searchTerm, branches]);

  const fetchHospitalBranches = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/hospital/${hospitalId}/branches`);
      if (!response.ok) {
        throw new Error("Failed to fetch branches");
      }
      const data = await response.json();
      setBranches(data.branches || []);
      setFilteredBranches(data.branches || []);
    } catch (err) {
      console.error("Error fetching branches:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterBranches = () => {
    let filtered = branches;

    if (searchTerm) {
      filtered = filtered.filter((branch) => {
        const branchname = branch.branchname?.toLowerCase() || "";
        const city = branch.city?.toLowerCase() || "";
        const state = branch.state?.toLowerCase() || "";
        const address = branch.address?.toLowerCase() || "";
        return (
          branchname.includes(searchTerm.toLowerCase()) ||
          city.includes(searchTerm.toLowerCase()) ||
          state.includes(searchTerm.toLowerCase()) ||
          address.includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredBranches(filtered);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm lg:bg-white lg:backdrop-blur-0 lg:p-0 p-4 flex items-center lg:block justify-center">
      <Card className="w-full max-w-[95vw] lg:max-w-none lg:rounded-none lg:border-0 lg:shadow-none max-h-[95vh] lg:max-h-none overflow-hidden my-auto lg:my-0 shadow-2xl">
        <CardHeader className="border-b bg-blue-600 text-white sticky top-0 z-10 shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl lg:text-3xl font-bold">Our Hospital Branches</CardTitle>
                <p className="text-sm text-blue-100 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{filteredBranches.length} branch{filteredBranches.length !== 1 ? "es" : ""} available</span>
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
          <div className="max-w-7xl mx-auto">
            {/* Search Section */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by branch name, city, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl bg-white shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Branches Grid */}
            {loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Branches</h3>
                <p className="text-gray-600">Please wait...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Branches</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <Button onClick={fetchHospitalBranches} className="bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
              </div>
            ) : filteredBranches.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No Branches Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
                <Button 
                  onClick={() => setSearchTerm("")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBranches.map((branch) => (
                  <Card key={branch.id} className="overflow-hidden transition-all duration-300 hover:scale-[1.02] border-0 rounded-2xl bg-white w-full max-w-[360px] mx-auto group" style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
                    <CardContent className="p-5">
                      {/* Header: Icon + Name */}
                      <div className="flex gap-3.5 mb-5">
                        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 border-[3px] border-blue-100 shadow-lg group-hover:shadow-xl transition-shadow">
                          <Building2 className="w-9 h-9 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[19px] text-[#1F2937] mb-1.5 leading-tight truncate">
                            {branch.branchname || "Hospital Branch"}
                          </h3>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                            <span className="text-[13px] font-semibold text-[#059669]">Active</span>
                          </div>
                        </div>
                      </div>

                      {/* Details List */}
                      <div className="space-y-2.5 mb-5">
                        {/* Address */}
                        {branch.address && (
                          <div className="flex items-start gap-2.5 px-1">
                            <MapPin className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0 mt-[2px]" />
                            <span className="text-[#374151] text-[13px] font-medium line-clamp-2 leading-[1.5]">
                              {branch.address}
                              {branch.city && `, ${branch.city}`}
                              {branch.state && `, ${branch.state}`}
                            </span>
                          </div>
                        )}

                        {/* Contact */}
                        {branch.contact && (
                          <div className="flex items-center gap-2.5 px-1">
                            <Phone className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0" />
                            <span className="text-[#374151] text-[13px] font-medium">{branch.contact}</span>
                          </div>
                        )}

                        {/* Email */}
                        {branch.email && (
                          <div className="flex items-center gap-2.5 px-1">
                            <Mail className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0" />
                            <span className="text-[#374151] text-[13px] font-medium truncate">{branch.email}</span>
                          </div>
                        )}

                        {/* Timings */}
                        {branch.timings && (
                          <div className="flex items-center gap-2.5 px-1">
                            <Clock className="w-[17px] h-[17px] text-[#6B7280] flex-shrink-0" />
                            <span className="text-[#374151] text-[13px] font-medium">{branch.timings}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2.5">
                        <Button 
                          className="flex-1 h-10 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all px-3"
                          onClick={() => {
                            if (branch.contact) {
                              window.open(`tel:${branch.contact}`, '_self');
                            }
                          }}
                        >
                          <Phone className="w-4 h-4 mr-1.5" />
                          Call Now
                        </Button>
                        <Button 
                          className="flex-1 h-10 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all px-3"
                          onClick={() => {
                            const address = `${branch.address}, ${branch.city}, ${branch.state}`;
                            window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-1.5" />
                          Directions
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

export default HospitalBranchesList;

