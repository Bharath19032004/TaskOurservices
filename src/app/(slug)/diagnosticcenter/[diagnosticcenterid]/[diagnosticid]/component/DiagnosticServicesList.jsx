"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Shield,
  Search,
  IndianRupee,
  CheckCircle,
  XCircle,
  X,
  Stethoscope,
  Award,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const DiagnosticServicesList = ({ open, onOpenChange, diagnosticServices = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(diagnosticServices.map(s => s.category).filter(Boolean))];

  const filteredServices = diagnosticServices.filter(service => {
    const matchesSearch =
      service.facility?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white shadow-2xl rounded-2xl border border-gray-200"
        hideCloseButton
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-5 border-b bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white shadow-lg">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3 drop-shadow-sm">
            <Shield className="w-7 h-7 text-white drop-shadow-md" />
            Diagnostic Services
          </DialogTitle>
          <DialogDescription className="text-blue-100 text-sm font-medium">
            Explore our advanced facilities, equipment, and transparent pricing
          </DialogDescription>
        </DialogHeader>

        {/* Search & Filter */}
        <div className="px-6 py-4 border-b bg-white">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cards Section */}
        <div className="flex-1 overflow-y-auto px-6 py-5 bg-white">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {filteredServices.map((service, idx) => (
                <Card
                  key={idx}
                  className="group transition-all duration-300 shadow-md hover:shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Stethoscope className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{service.facility}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {service.category && (
                            <Badge className="bg-white/20 text-white border-white/30 text-xs">
                              {service.category}
                            </Badge>
                          )}
                          {service.subCategory && (
                            <Badge className="bg-white/20 text-white border-white/30 text-xs">
                              {service.subCategory}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        service.available
                          ? "bg-green-100 text-green-800 border-green-300"
                          : "bg-red-100 text-red-800 border-red-300"
                      } text-xs flex items-center gap-1 px-3 py-1 rounded-full shadow-sm`}
                    >
                      {service.available ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> Available
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> Unavailable
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Card Body */}
                  <CardContent className="p-5 bg-white">
                    <div className="flex flex-col lg:flex-row gap-5 items-stretch">
                      {/* Left Info */}
                      <div className="flex-1 space-y-4">
                        {service.machinemodel && (
                          <div className="border border-indigo-100 bg-indigo-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-2 mb-1">
                              <Award className="w-4 h-4 text-indigo-700" />
                              <p className="text-xs font-medium text-indigo-800">
                                Equipment / Machine Model
                              </p>
                            </div>
                            <p className="text-gray-900 font-semibold">{service.machinemodel}</p>
                          </div>
                        )}
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Our facility provides high-quality diagnostic solutions using
                          state-of-the-art equipment and expert professionals.
                        </p>
                      </div>

                      {/* Right Pricing */}
                      <div className="lg:w-80 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 shadow-inner hover:shadow-md transition">
                        <h5 className="text-center font-bold text-blue-900 mb-3 tracking-wide">
                          Pricing Details
                        </h5>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-white rounded-xl p-3 border border-blue-100 text-center shadow-sm">
                            <p className="text-xs text-blue-600 font-medium flex items-center justify-center gap-1 mb-1">
                              <IndianRupee className="w-3 h-3" /> Min
                            </p>
                            <p className="text-lg font-bold text-blue-900">
                              ₹{service.minPrice || "--"}
                            </p>
                          </div>
                          <div className="bg-white rounded-xl p-3 border border-cyan-100 text-center shadow-sm">
                            <p className="text-xs text-cyan-600 font-medium flex items-center justify-center gap-1 mb-1">
                              <IndianRupee className="w-3 h-3" /> Max
                            </p>
                            <p className="text-lg font-bold text-cyan-900">
                              ₹{service.maxPrice || "--"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 text-white text-center shadow-md">
                          <p className="text-xs font-medium text-green-100 mb-1">Final Price</p>
                          <p className="text-xl font-bold">
                            {service.finalPrice ? `₹${service.finalPrice}` : "Contact"}
                          </p>
                        </div>

                        {service.discount > 0 && (
                          <div className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 text-white text-center shadow-md">
                            <p className="text-xs font-medium mb-1">Special Offer</p>
                            <p className="text-xl font-bold">{service.discount}% OFF</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-600">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Services Found</h3>
              <p className="text-sm text-gray-500">
                Try adjusting filters or search keywords.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-white text-center text-sm text-gray-600">
          <Shield className="inline-block w-4 h-4 text-blue-600 mr-2" />
          For booking or inquiries, please contact the diagnostic center directly.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosticServicesList;
