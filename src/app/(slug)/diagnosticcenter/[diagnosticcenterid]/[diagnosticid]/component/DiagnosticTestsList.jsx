"use client";
import React, { useState } from "react";
import {
  TestTube,
  Search,
  IndianRupee,
  Award,
  Tag,
  X,
  Microscope,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const DiagnosticTestsList = ({ open, onOpenChange, diagnosticServices = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(diagnosticServices.map((s) => s.category).filter(Boolean))];

  const filteredTests = diagnosticServices.filter((service) => {
    const searchMatch =
      service.facility?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch = selectedCategory === "All" || service.category === selectedCategory;
    return searchMatch && catMatch;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-[#1E3B90] to-[#3D85EF] text-white shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <TestTube className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">Diagnostic Tests</DialogTitle>
                <DialogDescription className="text-blue-100">
                  Browse a wide range of diagnostic tests & medical investigations
                </DialogDescription>
              </div>
            </div>
            {/* <button
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button> */}
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="px-6 py-4 bg-white border-b">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search test by name, category, or subcategory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-3 w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-2xl"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#1E3B90] to-[#3D85EF] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
          {filteredTests.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Showing{" "}
                <span className="font-semibold text-blue-600">
                  {filteredTests.length}
                </span>{" "}
                {filteredTests.length === 1 ? "test" : "tests"} found
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTests.map((service, idx) => (
                  <Card
                    key={idx}
                    className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1 bg-white"
                  >
                    <CardHeader className="bg-gradient-to-r from-[#1E3B90]/10 to-[#3D85EF]/10 px-5 py-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3B90]/20 to-[#3D85EF]/30 flex items-center justify-center">
                          <Microscope className="w-6 h-6 text-[#1E3B90]" />
                        </div>
                        <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                          {service.facility}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="p-5">
                      {/* Category Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.category && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-xs px-3 py-1 rounded-full">
                            {service.category}
                          </Badge>
                        )}
                        {service.subCategory && (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-xs px-3 py-1 rounded-full">
                            {service.subCategory}
                          </Badge>
                        )}
                        <Badge
                          className={`${
                            service.available
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-red-100 text-red-800 border-red-300"
                          } text-xs px-3 py-1 rounded-full`}
                        >
                          {service.available ? "Available" : "Unavailable"}
                        </Badge>
                      </div>

                      {/* Pricing */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                          <div className="flex items-center gap-1 text-blue-600 mb-1">
                            <IndianRupee className="w-3 h-3" />
                            <p className="text-xs font-medium">Min Price</p>
                          </div>
                          <p className="text-lg font-bold text-blue-900">
                            ₹{service.minPrice}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 border border-purple-200">
                          <div className="flex items-center gap-1 text-purple-600 mb-1">
                            <IndianRupee className="w-3 h-3" />
                            <p className="text-xs font-medium">Max Price</p>
                          </div>
                          <p className="text-lg font-bold text-purple-900">
                            ₹{service.maxPrice}
                          </p>
                        </div>
                      </div>

                      {/* Final Price + Discount */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
                          <div className="flex items-center gap-1 text-green-600 mb-1">
                            <Award className="w-3 h-3" />
                            <p className="text-xs font-medium">Final Price</p>
                          </div>
                          <p className="text-lg font-bold text-green-900">
                            {service.finalPrice ? `₹${service.finalPrice}` : "Call for Price"}
                          </p>
                        </div>
                        {service.discount > 0 && (
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 border border-orange-200">
                            <div className="flex items-center gap-1 text-orange-600 mb-1">
                              <Tag className="w-3 h-3" />
                              <p className="text-xs font-medium">Discount</p>
                            </div>
                            <p className="text-lg font-bold text-orange-900">
                              {service.discount}%
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Machine Info */}
                      {service.machinemodel && (
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Layers className="w-4 h-4 text-[#1E3B90]" />
                            <p className="text-sm font-medium">
                              {service.machinemodel}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No tests found
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "No diagnostic tests are currently available"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-white text-center text-sm text-gray-600">
          For booking or inquiries, please contact the diagnostic center directly.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagnosticTestsList;
